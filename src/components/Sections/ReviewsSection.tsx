import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// @ts-ignore
import "swiper/css";
import { Link } from "react-router-dom";



const reviews = [
  {
    text: `As an AI educator, I seek SOTA solutions for my ML practitioner students. AnyParser enhances retrieval accuracy in document parsing while balancing security, cost, and efficiency—an innovative tool for any pipeline!`,
    user: {
      name: "Cass",
      title: "Senior Scientist - AWS",
      link: "#",
    }
  },
  {
    text: `I am impressed by AnyParser's innovation in the space of AI and LLM, including the novel methodologies of synthetic data generation, retriever model fine-tuning in RAG, and their open-source products out of those innovations.`,
    user: {
      name: "Felix Bai",
      title: "Sr. Solution Architect - AWS",
      link: "#",
    }
  },
  {
    text: `I have validated the quality of AnyParser goes far beyond traditional OCR tools like Langchain / Unstructured. Looking forward to using this in our future projects.`,
    user: {
      name: "Steve Cooper",
      title: "Cofounder - ai ticker chat",
      link: "#",
    }
  },
  {
    text: `It's far better than other tools! Our data analysts are able to triple their outputs.`,
    user: {
      name: "Jamal",
      title: "CEO - xtrategise",
      link: "#",
    }
  },
  {
    text: `It's far better than other tools! Our data analysts are able to triple their outputs.`,
    user: {
      name: "Jamal",
      title: "CEO - xtrategise",
      link: "#",
    }
  },
  {
    text: `It's far better than other tools! Our data analysts are able to triple their outputs.`,
    user: {
      name: "Jamal",
      title: "CEO - xtrategise",
      link: "#",
    }
  }
];


const ReviewsSection = () => (
  <section className="opacity-75 w-full bg-black py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
    {/* Responsive heading */}
    <h2 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-bold text-center w-full max-w-6xl mb-8 sm:mb-12 md:mb-16">
      <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
        Reviews
      </span>
    </h2>


    <div className="w-full max-w-6xl">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={1.1}
        centeredSlides={true}
        breakpoints={{
          480: {
            spaceBetween: 20,
            slidesPerView: 1.3,
            centeredSlides: false
          },
          640: {
            spaceBetween: 24,
            slidesPerView: 1.5
          },
          768: {
            spaceBetween: 28,
            slidesPerView: 2
          },
          1024: {
            spaceBetween: 32,
            slidesPerView: 2.5
          },
          1280: {
            spaceBetween: 32,
            slidesPerView: 3
          },
          1536: {
            spaceBetween: 32,
            slidesPerView: 4
          }
        }}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        loop={true}
        speed={9000}
        className="w-full"
      >
        {reviews.map((review, idx) => (
          <SwiperSlide key={idx} className="h-auto">
            <div className="hover:shadow-[0_0_16px_4px_rgba(59,130,246,0.3)] hover:border-blue-400 transition-all duration-300 rounded-xl border border-white/10 bg-gradient-to-b from-white/5 to-white/0 p-6 sm:p-8 flex flex-col min-h-[280px] sm:min-h-[320px] shadow-lg h-full cursor-pointer">
              <div className="flex-1 flex flex-col justify-between">
                <div className="rounded-lg border border-white/10 bg-black/40 p-4 mb-4 sm:mb-6 text-white text-sm sm:text-base">
                  "{review.text}"
                </div>
                <div className="flex items-center gap-3 sm:gap-4 rounded-lg border border-white/10 bg-black/40 p-3 sm:p-4">
                  <img 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover" 
                    src={"/team/user.jpg"} 
                    alt={review.user.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/team/user.jpg";
                    }}
                  />
                  <div>
                    <Link
                      to={review.user.link}
                      className="text-blue-400 font-medium hover:underline text-sm sm:text-base"
                    >
                      {review.user.name}
                    </Link>
                    <div className="text-gray-300 text-xs sm:text-sm">{review.user.title}</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </section>
);

export default ReviewsSection;