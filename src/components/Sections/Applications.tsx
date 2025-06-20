import { motion } from 'framer-motion';

const cards = [
  {
    title: '01 AI HR',
    desc: 'Handles repetitive HR workflows, enhances productivity, and reduces manual errors — while keeping sensitive employee data private and secure. Allow simultaneously screening hundreds of applicants without human intervention.',
    img: '/path/to/hr-image.png', 
  },
  {
    title: '02 AI Data Scientist',
    desc: 'Accelerates data workflows at scale across Excel, SQL clients, browser dashboards, and notebooks — all on one shared desktop.\n\nNo code. No maintenance. Data cleaned.',
    img: '/path/to/data-image.png',
  },
  {
    title: '03 AI O&G Specialist',
    desc: 'Enhances field-to-office workflows, automates data entry from sensor reports, and supports engineering tasks across legacy software.\n\nNo integration. No blackbox.',
    img: '/path/to/oandg-image.png',
  },
];

const Applications = () => (
  <section 
    id="applications" 
    className="opacity-75 w-full bg-black flex flex-col items-center justify-center py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8"
  >
    {/* Responsive heading */}
    <motion.h2 
      className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-center w-full max-w-6xl mb-8 sm:mb-12 md:mb-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
        Applications
      </span>
    </motion.h2>

    {/* Responsive card container */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl">
      {cards.map((card) => (
        <motion.div
          key={card.title}
          className="flex-1 bg-gradient-to-b from-white/5 to-white/0 rounded-xl border border-white/10 hover:border-blue-400 transition-all duration-300 shadow-lg hover:shadow-[0_0_16px_4px_rgba(59,130,246,0.3)] p-6 sm:p-8 flex flex-col justify-between min-h-[320px] sm:min-h-[380px] cursor-pointer"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', bounce: 0.2, duration: 0.8 }}
          viewport={{ once: true, amount: 0.1 }}
          whileHover={{ y: -5 }}
        >
          {/* Card content */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-3">
              <span className="text-blue-300">{card.title.split(' ')[0]}</span>
              <span className="text-white"> {card.title.split(' ').slice(1).join(' ')}</span>
            </h3>
            <p className="text-gray-300 text-sm sm:text-base whitespace-pre-line">
              {card.desc}
            </p>
          </div>
          
          {/* Optional image placeholder */}
          {/* {card.img && (
            <div className="mt-4 w-full h-32 bg-gray-800 rounded-lg overflow-hidden">
              <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
            </div>
          )} */}
        </motion.div>
      ))}
    </div>
  </section>
);

export default Applications;