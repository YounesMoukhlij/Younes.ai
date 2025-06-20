import { motion } from 'framer-motion';

const features = [
  {
    title: 'Data Engineering',
    desc: 'We learn from daily operations and historical data to improve recommendations, making it more valuable over time. Our AI systems continuously adapt and evolve, learning from user interactions, feedback loops, and real-world outcomes to deliver increasingly accurate and personalized solutions that grow smarter with every interaction.',

    img: '/team/22.jpg',
  },
  {
    title: 'Continuous Learning',
    desc: 'We learn from daily operations and historical data to improve recommendations, making it more valuable over time. Our AI systems continuously adapt and evolve, learning from user interactions, feedback loops, and real-world outcomes to deliver increasingly accurate and personalized solutions that grow smarter with every interaction.',
    img: '/team/21.jpg',
  },
  {
    title: 'Automated Insights',
    desc: 'We learn from daily operations and historical data to improve recommendations, making it more valuable over time. Our AI systems continuously adapt and evolve, learning from user interactions, feedback loops, and real-world outcomes to deliver increasingly accurate and personalized solutions that grow smarter with every interaction.',
    img: '/team/20.jpg',
  },
];

const CoreFeatures = () => (
  <section className="opacity-75 w-full bg-black flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">

    <motion.h2 
      className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-center w-full max-w-6xl mb-8 sm:mb-12 md:mb-16 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
        Core features
      </span>
    </motion.h2>


    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl">
      {features.map((feature, idx) => (
        <motion.div
          key={feature.title + idx}
          className="relative bg-gradient-to-b from-white/5 to-white/0 rounded-xl border-2 border-white/10 hover:border-blue-400 transition-all duration-300 p-6 sm:p-8 shadow-lg hover:shadow-[0_0_16px_4px_rgba(59,130,246,0.3)] min-h-[320px] sm:min-h-[380px] flex flex-col justify-end group overflow-hidden cursor-pointer"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          whileHover={{ y: -5 }}
        >

          <div className="w-full flex items-center justify-center mb-4 sm:mb-6 min-h-[80px] sm:min-h-[120px] relative overflow-hidden rounded-lg">
            <img 
              src={feature.img} 
              alt={feature.title} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
          </div>
          

          <div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-white">
              {feature.title}
            </h3>
            <p className="text-gray-300 text-sm sm:text-base">
              {feature.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default CoreFeatures;