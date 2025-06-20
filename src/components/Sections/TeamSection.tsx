
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";


const team = [
  {
    name: "Younes Moukhlij",
    title: "Frontend Engineer",
    img: "/team/21.jpg",
    orgs: [
      { name: "1337 school", logo: "/team/42.png" },
      { name: "frontend", logo: "/team/web.png" },
    ],
  },
  {
    name: "Younes Moukhlij",
    title: "Frontend Engineer",
    img: "/team/21.jpg",
    orgs: [
      { name: "1337 school", logo: "/team/42.png" },
      { name: "frontend", logo: "/team/web.png" },
    ],
  },
  {
    name: "Younes Moukhlij",
    title: "Frontend Engineer",
    img: "/team/21.jpg",
    orgs: [
      { name: "1337 school", logo: "/team/42.png" },
      { name: "frontend", logo: "/team/web.png" },
    ],
  },
  {
    name: "Younes Moukhlij",
    title: "Frontend Engineer",
    img: "/team/21.jpg",
    orgs: [
      { name: "1337 school", logo: "/team/42.png" },
      { name: "frontend", logo: "/team/web.png" },
    ],
  },
  {
    name: "Younes Moukhlij",
    title: "Frontend Engineer",
    img: "/team/21.jpg",
    orgs: [
      { name: "1337 school", logo: "/team/42.png" },
      { name: "frontend", logo: "/team/web.png" },
    ],
  },
  {
    name: "Younes Moukhlij",
    title: "Frontend Engineer",
    img: "/team/21.jpg",
    orgs: [
      { name: "1337 school", logo: "/team/42.png" },
      { name: "frontend", logo: "/team/web.png" },
    ],
  },
  {
    name: "Younes Moukhlij",
    title: "Frontend Engineer",
    img: "/team/21.jpg",
    orgs: [
      { name: "1337 school", logo: "/team/42.png" },
      { name: "frontend", logo: "/team/web.png" },
    ],
  },
  {
    name: "Younes Moukhlij",
    title: "Frontend Engineer",
    img: "/team/21.jpg",
    orgs: [
      { name: "1337 school", logo: "/team/42.png" },
      { name: "frontend", logo: "/team/web.png" },
    ],
  },
  {
    name: "Younes Moukhlij",
    title: "Frontend Engineer",
    img: "/team/21.jpg",
    orgs: [
      { name: "1337 school", logo: "/team/42.png" },
      { name: "frontend", logo: "/team/web.png" },
    ],
  },

];



const TeamSection = () => (
  <section className="opacity-75 w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
    {/* Responsive heading */}
    <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-center w-full max-w-6xl mb-8 sm:mb-12 md:mb-16">
      <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
        Meet our team
      </span>
    </h2>

    {/* Responsive Swiper */}
    <div className="w-full max-w-6xl">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1.2}
        centeredSlides={false}
        breakpoints={{
          480: {
            spaceBetween: 16,
            slidesPerView: 1.5
          },
          640: {
            spaceBetween: 20,
            slidesPerView: 2
          },
          768: {
            spaceBetween: 24,
            slidesPerView: 2.5
          },
          1024: {
            spaceBetween: 28,
            slidesPerView: 3
          },
          1280: {
            spaceBetween: 32,
            slidesPerView: 4
          }
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop
        speed={9000}
        className="w-full"
      >
        {team.map((member, index) => (
          <SwiperSlide key={`${member.name}-${index}`}>
            <div className="opacity-90 hover:shadow-[0_0_16px_4px_rgba(59,130,246,0.3)] cursor-pointer hover:border-blue-400 transition-all duration-300 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 flex flex-col items-center min-h-[320px] sm:min-h-[380px] shadow-lg h-full">
              <div className="w-full flex items-center justify-center mb-4 sm:mb-6 min-h-[120px] sm:min-h-[180px]">
                <img
                  src={member.img}
                  alt={member.name}
                  className="object-cover rounded-lg w-full h-40 sm:h-48 md:h-56"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/team/21.jpg";
                  }}
                />
              </div>
              <div className="flex flex-row gap-4 sm:gap-6 mb-3 sm:mb-4">
                {member.orgs.map((org) => (
                  <img
                    key={org.name}
                    src={org.logo}
                    alt={org.name}
                    className="h-6 sm:h-8 object-contain bg-white rounded-full"
                  />
                ))}
              </div>
              <div className="text-white text-xl sm:text-2xl font-bold mb-1 text-center">
                {member.name}
              </div>
              <div className="text-gray-300 text-sm sm:text-base text-center">
                {member.title}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default TeamSection;
