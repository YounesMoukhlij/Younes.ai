import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus,  } from 'react-icons/fi';

const faqData = [
  {
    question: 'Is my company a good fit for Younes.ai?',
    answer: 'Yes - if you\'re an energy company looking to modernize operations and boost efficiency, Younes.ai is for you.',
  },
  {
    question: 'Are your solutions secure?',
    answer: 'Absolutely, our solutions adhere to the highest security standards, incorporating advanced encryption methods and rigorous compliance protocols to ensure your company data remains safe and confidential.',
  },
  {
    question: 'Do you offer continuous support?',
    answer: 'Yes, we provide 24/7 continuous support to all our enterprise clients, ensuring that any issues are resolved promptly and your operations run smoothly without interruption.',
  },
  {
    question: 'How long does it take to implement my requests?',
    answer: 'Implementation time varies based on complexity, but simple requests can be handled within a few business days. We prioritize efficient and timely delivery without compromising quality.',
  },
  {
    question: 'Can I get more developers than 3?',
    answer: 'Of course. Our enterprise plan is fully customizable, allowing you to scale your dedicated development team to any size that fits your project\'s needs.',
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer: 'Yes, you can cancel your subscription at any time. For monthly plans, the cancellation takes effect at the end of the current billing cycle. Annual plans may have different terms.',
  },
];

const AnswersSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const firstColumn = faqData.slice(0, 3);
  const secondColumn = faqData.slice(3, 6);

  return (
    <section id="answers" className="opacity-75 w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <motion.h2 
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
          Answers
        </span>
      </motion.h2>

      <motion.p 
        className="text-base md:text-lg text-gray-400 text-center max-w-2xl mb-10 sm:mb-12 md:mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        We've gone ahead and answered some of the questions you might have.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 w-full max-w-7xl">
        {[firstColumn, secondColumn].map((column, colIndex) => (
          <div key={colIndex} className="space-y-4 md:space-y-6 lg:space-y-8">
            {column.map((faq, index) => {
              const globalIndex = colIndex * 3 + index;
              const isOpen = openIndex === globalIndex;
              
              return (
                <motion.div
                  key={globalIndex}
                  className={`bg-[#0D1117] rounded-xl border transition-all duration-300 ${isOpen ? 'border-blue-500' : 'border-white/10'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: 0.2 + globalIndex * 0.05 }}
                >
                  <button
                    onClick={() => handleClick(globalIndex)}
                    className="w-full flex justify-between items-center p-4 sm:p-5 md:p-6 text-left"
                  >
                    <span className="text-white font-medium text-base md:text-lg flex-1 pr-4">{faq.question}</span>
                    <div className={`text-white text-xl transition-transform duration-300 ${isOpen ? 'transform rotate-45' : ''}`}>
                      <FiPlus />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 sm:p-5 md:p-6 pt-0">
                          <p className="text-gray-400 text-sm md:text-base">{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AnswersSection; 