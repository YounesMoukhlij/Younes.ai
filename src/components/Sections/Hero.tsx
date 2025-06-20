import { motion } from 'framer-motion';

const Hero = () => (
  <section id="home" className="opacity-80 relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-black">
    <div className="absolute inset-0 opacity-20 md:opacity-30 flex items-center justify-center z-0 pointer-events-none">
      <span className="text-[20rem] font-extrabold select-none bg-gradient-to-r from-cyan-500 via-blue-400 to-blue-600 bg-clip-text text-transparent" 
            style={{ opacity: "48%" , fontSize: 'min(15vw, 20rem)' }}>
        Younes.ai
      </span>
    </div>

    <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 py-16 lg:py-24 max-w-7xl mx-auto">

      <motion.h1 
        className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold text-center text-white leading-tight mb-6 md:mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.7, delay: 0.5 }}
        >
          The AI Agent Helps You Think and{' '}
        </motion.span>
        <motion.span 
          className="text-blue-300"
          initial={{ opacity: 0, scale: 1.8 }}
          animate={{ opacity: 1, scale: 4 }}
          transition={{ 
            duration: 1.6, 
            delay: 1.2,
            type: "spring",
            stiffness: 200,
            damping: 10
          }}
        >
          Do.
        </motion.span>
      </motion.h1>

      <motion.div 
        className="max-w-3xl mx-auto space-y-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.7, delay: 1.2 }}
      >
        <p className="text-base md:text-lg lg:text-xl text-center text-gray-200">
          Younes.ai is the AI teammate who gets things done on a real desktop, accurately, fast without complaining.
        </p>
        <motion.p 
          className="text-sm md:text-base lg:text-lg text-center text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.8, delay: 1.7 }}
        >
          You can watch, pause, or take over any time.
        </motion.p>
      </motion.div>

      <motion.div 
        className="flex flex-col sm:flex-row gap-4 mt-10 md:mt-12 w-full max-w-md sm:max-w-none justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2 }}
      >
        <motion.button 
          className="bg-black/80 border border-blue-400 text-blue-200 font-medium px-6 py-3 rounded-lg hover:bg-blue-400 hover:text-black transition-colors duration-300 text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Try for Free
        </motion.button>
        <motion.button 
          className="bg-black/80 border border-blue-400 text-blue-200 font-medium px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-400 hover:text-black transition-colors duration-300 text-base"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Us
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </motion.button>
      </motion.div>
    </div>
  </section>
);

export default Hero;