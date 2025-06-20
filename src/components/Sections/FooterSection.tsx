import { Link } from "react-router-dom";

const FooterSection = () => (
  <footer id="contact" className=" opacity-90 w-full bg-black py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
    <hr className="border-white/10 my-6 sm:my-8 w-full max-w-2xl" />
    
    <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mx-auto">

      <div className="order-1"> {/* Changed from order-2 lg:order-1 */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 md:mb-10">
          <span className="bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            Let's talk!
          </span>
        </h2>
        
        <div className="mb-8 sm:mb-10">
          <div className="text-white/80 mb-2 text-sm sm:text-base">
            <span className="text-blue-400">Office:</span>
          </div>
          <div className="mb-4">
            <span className="font-bold text-white text-sm sm:text-base">Los Angeles Office:</span>
            <div className="text-white/90 text-sm sm:text-base">
              Los Poelos Hermanos, Los Angeles, USA
            </div>
          </div>
          <div className="mb-6 sm:mb-8">
            <span className="font-bold text-white text-sm sm:text-base">Silicon Valley Office:</span>
            <div className="text-white/90 text-sm sm:text-base">
              901 W 3rd St, Los Angeles, CA 90013
            </div>
          </div>
        </div>
        
        <hr className="border-white/10 my-6 sm:my-8" />
        
        <div className="mb-2 text-blue-400 text-sm sm:text-base">Email:</div>
        <div className="cursor-pointer hover:text-blue-400 transition-colors duration-300">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
            admin@younes.ai
          </h2>
        </div>
        
        <hr className="border-white/10 my-6 sm:my-8" />
      </div>

      {/* Form Section - Now comes second on mobile */}
      <form className="order-2 lg:order-2 flex flex-col gap-4 sm:gap-6"> {/* Changed from order-1 lg:order-2 */}
        <div>
          <label className="block text-white mb-2 text-sm sm:text-base">Name</label>
          <input
            type="text"
            placeholder="Younes M"
            className="w-full rounded-md bg-[#111114] text-white px-4 py-2 sm:py-3 outline-none border border-white/10 focus:border-blue-400 hover:border-blue-400 transition-colors text-sm sm:text-base"
          />
        </div>
        
        <div>
          <label className="block text-white mb-2 text-sm sm:text-base">Email</label>
          <input
            type="email"
            placeholder="younes@example.com"
            className="w-full rounded-md bg-[#111114] text-white px-4 py-2 sm:py-3 outline-none border border-white/10 focus:border-blue-400 hover:border-blue-400 transition-colors text-sm sm:text-base"
          />
        </div>
        
        <div>
          <label className="block text-white mb-2 text-sm sm:text-base">Phone</label>
          <input
            type="text"
            placeholder="+33 (3) 333 3333"
            className="w-full rounded-md bg-[#111114] text-white px-4 py-2 sm:py-3 outline-none border border-white/10 focus:border-blue-400 hover:border-blue-400 transition-colors text-sm sm:text-base"
          />
        </div>
        
        <div>
          <label className="block text-white mb-2 text-sm sm:text-base">Message</label>
          <textarea
            placeholder="Hi younes.ai! I'm reaching out for ..."
            className="w-full rounded-md bg-[#111114] text-white px-4 py-2 sm:py-3 outline-none border border-white/10 focus:border-blue-400 hover:border-blue-400 transition-colors min-h-[100px] text-sm sm:text-base"
          />
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-32 py-2 sm:py-2.5 rounded-xl bg-white border border-white/10 text-black font-medium transition-all hover:border-blue-400 hover:bg-black hover:text-white duration-300 text-sm sm:text-base"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    
    <hr className="border-white/10 my-8 w-full" />
    
    <div className="flex justify-center items-center w-full">
      <h2 className="text-white/80 text-xs sm:text-sm text-center">
        © 2025, Younes Corp. - All rights reserved.
        <Link
          to="/"
          className="text-blue-400 pl-1 sm:pl-2 hover:underline"
        >
          www.younes.ai
        </Link>
      </h2>
    </div>
  </footer>
);

export default FooterSection;