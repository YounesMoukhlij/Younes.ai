# Younes MOUKHLIJ

---

## 👨‍💻 Reviewers  

A special thanks to the reviewers for their time and feedback:  

- [@remi-guan](https://github.com/remi-guan)  
- [@lingjiekong](https://github.com/lingjiekong)  
- [@goldmermaid](https://github.com/goldmermaid)  
- [@EnergentAI](https://github.com/EnergentAI)  

🎉 **Thank you!** 🎉  

---

## 🌟 **Core Features**

#### **Dual AI Engine**
- **Functionality**: Seamless switching between Google Gemini and OpenAI GPT
- **Technology**: Gemini SDK + OpenAI API 
- **Features**:
  - Instant model switching
  - Consistent chat history preservation
  - Adaptive response formatting

#### **Voice Interface** 🎤
- **Core Feature**: Speech-to-text with auto-send capability
- **Technology**: Web Speech API
- **Performance Notes**:
  - Real-time transcription
  - Silence detection for automatic sending
  - Audio waveform visualization
- **⚠️ Browser Compatibility**:
  - **Optimal**: Chrome (latest version)
  - **Partial**: Firefox, Edge
  - **Unsupported**: Safari, most mobile browsers
  - *Enable microphone permissions for full functionality*
- ** ⚠️ OpenAI is not free so implement it, but the only answer is check pricing ...

#### **Real-time Streaming** ⚡
- **Technology**: Server-Sent Events (SSE)
- **Benefits**:
  - Character-by-character response display
  - Low-latency interaction
  - Network resilience

#### **Smart Interaction** 🧠
- **Features**:
  - Context-aware conversations
  - Session persistence
  - Error recovery
- **Technology**: React State Management

---

### 🎨 **Immersive Visual Experience**
```diff
+ Particle Galaxy Background (@tsparticles/react)
+ Glass Morphism UI Elements
+ Micro-interactions on all components
+ Dark/Light Mode Ready
+ 60fps Animation Performance
```

### 📱 **Adaptive Design**
- **Mobile-First** approach (optimized down to 320px)
- **Fluid Layouts** for all screen sizes
- **Touch-Optimized** interactive elements
- **Reduced Motion** accessibility option

---

## 🏗️ **Technical Architecture**

```mermaid
graph LR
    A[React 18] --> B[State Management]
    A --> C[TypeScript]
    A --> D[Animation System]
    B --> E[AI State]
    B --> F[UI State]
    D --> G[Framer Motion]
    D --> H[Particle Engine]
    C --> I[Type Safety]
    E --> J[Gemini Integration]
    E --> K[OpenAI Integration]
    F --> L[Responsive Controller]
```

---

## 🧭 **User Journey**

1. **Hero Landing** - Interactive particle introduction
2. **AI Playground** - Core chat interface
3. **Feature Showcase** - Animated component demos
4. **Team Gallery** - 3D card carousel
5. **Plans & Pricing** - Comparative tables
6. **Knowledge Base** - Smart FAQ system

---

## 🚀 **Getting Started**

```bash
# Clone repository
git clone https://github.com/your-repo.git && cd project-folder

# Install dependencies
npm install

# Start development server
npm run dev
```

### 🔐 **Environment Configuration**
Create `.env` file with:
```ini
VITE_GEMINI_API_KEY=your_key_here
VITE_OPENAI_API_KEY=your_key_here
```

---

## 🎥 **Video Demonstration**

- Uploading soon ... 

---

## ✨ **Why This Project Stands Out**

- **Cinematic UX** - Every interaction feels alive and responsive
- **Production-Grade AI** - Enterprise-ready integration patterns
- **Pixel-Perfect Execution** - Meticulous attention to detail
- **Future-Proof Foundation** - Modern tech stack architecture
- **Comprehensive Documentation** - Clear implementation details

---

## 🧩 **Component Ecosystem**

| Component | Purpose | Technology |
|-----------|---------|------------|
| `AiIntegrationHub` | Core chat interface | React Hooks |
| `ParticlesBackground` | Dynamic visual backdrop | tsparticles |
| `AnimatedHeader` | Responsive navigation | Framer Motion |
| `FeatureCarousel` | Interactive demos | Swiper.js |
| `PricingMatrix` | Plan comparisons | CSS Grid |

---

### **Live Demo**  
👉 **[younes-ai.vercel.app](https://younes-ai.vercel.app)**  











