import { useState, useEffect, useRef } from "react";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion } from 'framer-motion';



interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

interface GeminiServiceType {
  sendMessages: (message: string, prevChat: ChatMessage[]) => Promise<AsyncGenerator<any, void, unknown>>;
}


const GeminiService: GeminiServiceType = (function () {
    const MODEL_NAME = "gemini-1.5-flash";
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(API_KEY);
    const service: GeminiServiceType = {} as GeminiServiceType;

    service.sendMessages = async function (message: string, prevChat: ChatMessage[]) {
        try {
            const model = genAI.getGenerativeModel({
                model: MODEL_NAME,
                generationConfig: {
                    maxOutputTokens: 8192,
                }
            });
            const chat = model.startChat({
                history: prevChat,
            });
            const result = await chat.sendMessageStream(message);
            return result.stream;
        } catch (error) {
            console.error("Error in sendMessages:", error);
            if (error instanceof Error && error.message.includes("not found")) {
                console.log("Model not found, trying alternative models...");
                throw new Error(`Model ${MODEL_NAME} not available. Please check your API key and model access.`);
            }
            throw error;
        }
    }

    return service;
}());


const callOpenAIAPI = async (message: string, chatHistory: ChatMessage[]) => {
    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
    if (!API_KEY) throw new Error("OpenAI API key not configured");

    const url = import.meta.env.VITE_OPENAI_API_URL;


    const messages = chatHistory.map(msg => ({
        role: msg.role === "user" ? "user" : "assistant",
        content: msg.parts[0].text
    }));


    messages.push({ role: "user", content: message });

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: messages,
            temperature: 0.7,
            stream: true
        }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "OpenAI API request failed");
    }

    return response.body;
};


const isClient = typeof window !== "undefined";


const AiIntegrationHub = () => {

    if (!isClient) {
        return null;
    }

    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [currentProvider, setCurrentProvider] = useState<"gemini" | "openai">("gemini");
    const [micPermission, setMicPermission] = useState<"granted" | "denied" | "prompt" | "unknown">("unknown");


    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    console.log("browserSupportsSpeechRecognition:", browserSupportsSpeechRecognition);

    const silenceTimeoutRef = useRef<number | null>(null);
    const lastTranscriptRef = useRef<string>("");
    const lastSentTranscriptRef = useRef<string>("");

    useEffect(() => {
        const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

        if (!geminiKey && !openaiKey) {
            setError("Warning: No API keys configured. Please set VITE_GEMINI_API_KEY or VITE_OPENAI_API_KEY");
        } else if (!geminiKey && openaiKey) {
            setCurrentProvider("openai");
        } else if (geminiKey && !openaiKey) {
            setCurrentProvider("gemini");
        }
    }, []);


    useEffect(() => {
        console.log("[Effect] transcript:", transcript, "listening:", listening, "lastSent:", lastSentTranscriptRef.current);
        setInput(transcript);
        if (listening && transcript !== lastTranscriptRef.current) {
            if (silenceTimeoutRef.current) {
                clearTimeout(silenceTimeoutRef.current);
            }
            silenceTimeoutRef.current = setTimeout(() => {
                if (listening && transcript.trim()) {
                    SpeechRecognition.stopListening();
                    console.log("Auto-stopping listening due to silence");
                    // Directly send the message after stopping listening
                    if (transcript.trim() && transcript !== lastSentTranscriptRef.current) {
                        lastSentTranscriptRef.current = transcript;
                        console.log("[Timeout] Auto-sending message:", transcript);
                        handleSend(transcript);
                    }
                }
            }, 2000);
            lastTranscriptRef.current = transcript;
        }
    }, [transcript, listening]);


    useEffect(() => {
        return () => {
            if (silenceTimeoutRef.current) {
                clearTimeout(silenceTimeoutRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // @ts-ignore
        const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognitionAPI) {
            const recognition = new SpeechRecognitionAPI();
            recognition.onerror = (event) => {
                console.log("SpeechRecognition error:", event.error, event);
            };
        }
    }, []);

    useEffect(() => {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'microphone' as PermissionName }).then((result) => {
                setMicPermission(result.state as any);
                result.onchange = () => setMicPermission(result.state as any);
            });
        }
    }, []);

    const handleSend = async (messageOverride?: string) => {
        const messageToSend = (typeof messageOverride === 'string' ? messageOverride : input).trim();
        console.log('[handleSend] Called with:', { messageOverride, input, messageToSend });
        if (!messageToSend) {
            console.log('[handleSend] No message to send, returning.');
            return;
        }

        setLoading(true);
        setError("");
        setResponse("");

        try {
            const userMessage: ChatMessage = { role: "user", parts: [{ text: messageToSend }] };
            const updatedChatHistory = [...chatHistory, userMessage];
            setChatHistory(updatedChatHistory);

            let fullResponse = "";
            console.log('[handleSend] Sending to API:', { provider: currentProvider, messageToSend, updatedChatHistory });

            if (currentProvider === "gemini") {
                const stream = await GeminiService.sendMessages(messageToSend, updatedChatHistory);
                for await (const chunk of stream) {
                    const chunkText = chunk.text();
                    fullResponse += chunkText;
                    setResponse(prev => prev + chunkText);
                }
            } else {
                const stream = await callOpenAIAPI(messageToSend, updatedChatHistory);
                const reader = stream?.getReader();
                const decoder = new TextDecoder();
                if (reader) {
                    try {
                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            const chunk = decoder.decode(value);
                            const lines = chunk.split('\n');
                            for (const line of lines) {
                                if (line.startsWith('data: ')) {
                                    const data = line.slice(6);
                                    if (data === '[DONE]') break;
                                    try {
                                        const parsed = JSON.parse(data);
                                        const content = parsed.choices?.[0]?.delta?.content;
                                        if (content) {
                                            fullResponse += content;
                                            setResponse(prev => prev + content);
                                        }
                                    } catch (e) {}
                                }
                            }
                        }
                    } finally {
                        reader.releaseLock();
                    }
                }
            }
            setChatHistory(prev => [...prev, {
                role: "model",
                parts: [{ text: fullResponse }]
            }]);
        } catch (err) {
            setError(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`);
            setChatHistory(prev => prev.slice(0, -1));
        } finally {
            setLoading(false);
            setInput("");
            resetTranscript();
        }
    };

    const toggleProvider = () => {
        const geminiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const openaiKey = import.meta.env.VITE_OPENAI_API_KEY;

        if (currentProvider === "gemini" && openaiKey) {
            setCurrentProvider("openai");
        } else if (currentProvider === "openai" && geminiKey) {
            setCurrentProvider("gemini");
        }
    };

    const handleVoice = async () => {
        console.log("handleVoice called. listening:", listening);
        if (listening) {
            SpeechRecognition.stopListening();
            console.log("Stopped listening");
        } else {
            try {
                // Request microphone permission and immediately stop the stream to release the mic
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                stream.getTracks().forEach(track => track.stop());
                resetTranscript();
                lastTranscriptRef.current = "";
                // Always use non-continuous mode for all environments
                SpeechRecognition.startListening();
                console.log("Started listening (non-continuous mode for all envs)");
            } catch (err) {
                setError("Microphone access denied. Please allow microphone access in your browser settings.");
                console.log("Microphone access denied:", err);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!browserSupportsSpeechRecognition) {
        console.log("Speech recognition is not supported in this browser/environment.");
        return <div className="text-red-500 p-4">Your browser doesn't support speech recognition.</div>;
    }

    return (
        <motion.section
            id="ai-integration-hub"
            className="w-full bg-black bg-opacity-90 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 flex flex-col items-center min-h-screen"
            style={{ backgroundColor: "rgba(0,0,0,0.9)" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.9 }}
        >
            <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 lg:mb-12 xl:mb-16 w-full max-w-7xl text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                    AI Integration Hub
                </span>
            </motion.h2>

            <motion.div
                className="w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl mx-auto rounded-xl border bg-gradient-to-b from-white/5 to-white/0 p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10 shadow-lg flex flex-col items-center transition-all duration-300 animate-border-glow"
                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 100 }}
            >
                {/* Provider Toggle */}
                <motion.div
                    className="mb-4 sm:mb-6 flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                >
                    <span className="text-white text-xs sm:text-sm md:text-base">AI Provider:</span>
                    <motion.button
                        onClick={toggleProvider}
                        className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors text-xs sm:text-sm md:text-base font-medium"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Switch to {currentProvider === "gemini" ? "OpenAI" : "Gemini"}
                    </motion.button>
                    <span className="text-blue-400 text-xs sm:text-sm md:text-base font-bold">
                        {currentProvider === "gemini" ? "Google Gemini" : "OpenAI GPT"}
                    </span>
                </motion.div>

                {/* Response area */}
                <motion.div
                    className="w-full min-h-32 sm:min-h-40 md:min-h-48 lg:min-h-56 xl:min-h-64 rounded-md bg-[#111114] text-white p-2 sm:p-3 md:p-4 lg:p-5 border border-white/10 mb-3 sm:mb-4 md:mb-6 overflow-y-auto"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="animate-pulse flex space-x-1 sm:space-x-2">
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-blue-400 rounded-full"></div>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-blue-400 rounded-full"></div>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-3 md:h-3 bg-blue-400 rounded-full"></div>
                            </div>
                        </div>
                    ) : error ? (
                        <div className="text-red-500 text-xs sm:text-sm md:text-base p-1 sm:p-2">{error}</div>
                    ) : (
                        <div className="whitespace-pre-wrap text-xs sm:text-sm md:text-base lg:text-lg p-1 sm:p-2 leading-relaxed">{response}</div>
                    )}
                </motion.div>

                {/* Input area */}
                <motion.div
                    className="w-full flex flex-row flex-wrap gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.8, delay: 1.0 }}
                >
                    <motion.input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message or use the mic..."
                        className="flex-1 min-w-0 flex-shrink bg-[#111114] text-white px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4 rounded-md outline-none border border-white/10 focus:border-blue-400 transition-colors text-xs sm:text-sm md:text-base lg:text-lg"
                        disabled={loading}
                        whileFocus={{ scale: 1.02 }}
                    />

                    <motion.button
                        onClick={handleVoice}
                        disabled={loading}
                        className={`w-10 sm:w-auto flex items-center justify-center hover:border-blue-300 hover:border-2 hover:bg-black hover:text-white rounded-md px-0 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 border-2 border-white/10 transition-colors font-bold ${
                            listening ? "bg-blue-400 text-white" : "bg-white text-black"
                        }`}
                        aria-label={listening ? "Stop listening" : "Start voice input"}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                        {listening && <span className="hidden sm:inline ml-1 sm:ml-2 text-xs sm:text-sm">Listening...</span>}
                    </motion.button>

                    <motion.button
                        onClick={() => handleSend()}
                        disabled={loading || !input.trim()}
                        className="hover:border-blue-300 hover:border-2 hover:bg-black hover:text-white text-black border-2 border-white/10 rounded-md px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 bg-white font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base lg:text-lg whitespace-nowrap"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {loading ? "Sending..." : "Send"}
                    </motion.button>
                </motion.div>

                <motion.div
                    className="mt-4 sm:mt-6 text-gray-400 text-xs sm:text-sm md:text-base text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                >
                    <span className="font-bold">Current Provider:</span> {currentProvider === "gemini" ? "Google Gemini" : "OpenAI GPT"}
                </motion.div>

                {micPermission === "denied" && (
                    <div className="text-red-500 p-2">
                        Microphone access is denied. Please click the lock icon in your browser's address bar, go to "Site settings", and set Microphone to "Allow", then refresh the page.
                    </div>
                )}
            </motion.div>
        </motion.section>
    );
};

export default AiIntegrationHub;














