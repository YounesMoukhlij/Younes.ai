const stats = [
  {
    title: "Projects completed",
    value: "20+",
    desc: "We've successfully completed 20+ top-tier projects.",
  },
  {
    title: "Satisfied customers",
    value: "95%",
    desc: "We ensure a 95% satisfaction level for our clients.",
  },
  {
    title: "Hours saved per day",
    value: "3h",
    desc: "Our solutions save our clients an average of 3 hours of work per day.",
  },
  {
    title: "Cost saved per month",
    value: "80k",
    desc: "Our solutions save our clients an average of $80,000 per month.",
  },
];

const StatisticsSection = () => (
  <section id="statistics" className="opacity-75 w-full bg-black py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
    {/* Responsive heading */}
    <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-center w-full max-w-6xl mb-8 sm:mb-12 md:mb-16">
      <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
        Our statistics
      </span>
    </h2>

    {/* Responsive grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl mx-auto">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="cursor-pointer hover:border-blue-400 transition-all duration-300 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 sm:p-8 flex flex-col justify-between min-h-[260px] sm:min-h-[300px] shadow-lg hover:shadow-[0_0_16px_4px_rgba(59,130,246,0.3)]"
        >
          <div>
            <div className="text-white text-lg sm:text-xl font-medium mb-4 sm:mb-6">
              {stat.title}
            </div>
            <div className="text-4xl sm:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                {stat.value}
              </span>
            </div>
            <hr className="border-white/10 mb-4 sm:mb-6" />
          </div>
          <div className="text-gray-300 text-sm sm:text-base">
            {stat.desc}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default StatisticsSection;