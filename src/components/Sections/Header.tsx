import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

const Header = () => {
  const items = ['Home', 'AI', 'Applications', 'Statistics', 'Pricing', 'Answers', 'Contact'];
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const handleNavigation = (item: string) => {
    const sectionMap: { [key: string]: string } = {
      'Home': 'home',
      'AI': 'ai-integration-hub',
      'Applications': 'applications',
      'Statistics': 'statistics',
      'Pricing': 'pricing',
      'Answers': 'answers',
      'Contact': 'contact'
    };

    const sectionId = sectionMap[item];
    if (sectionId) {
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
    
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  return (
    <header className="opacity-90 fixed top-0 pt-2 left-0 w-full z-50 bg-black/10 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link
            to="/Home"
            onClick={() => handleNavigation('Home')}
            className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap"
          >
            Younes<span className="text-blue-400">.ai</span>
          </Link>

          {!isMobile && (
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-1">
                {items.map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="hover:shadow-[0_0_10px_2px_rgba(59,130,246,0.3)] rounded-lg cursor-pointer hover:bg-blue-400/10"
                  >
                    <button
                      onClick={() => handleNavigation(item)}
                      className="text-white text-sm px-3 py-2 block whitespace-nowrap bg-transparent border-none w-full text-left"
                    >
                      {item}
                    </button>
                  </motion.div>
                ))}
              </nav>

              <div className="cursor-pointer flex items-center bg-[#181818] border border-white/20 rounded-md px-2 py-1 ml-2">
                <span className="mr-1 text-base">🌐</span>
                <select className="bg-transparent border-none focus:ring-0 text-sm text-white">
                  <option>English</option>
                  <option>French</option>
                  <option>Arabic</option>
                </select>
              </div>
            </div>
          )}

          {isMobile && (
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-1 focus:outline-none"
              aria-label="Toggle menu"
            >
              {menuOpen ? <FiX size={26} /> : <FiMenu size={26} />}
            </button>
          )}
        </div>

        <AnimatePresence>
          {isMobile && menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden lg:hidden"
            >
              <nav className="flex flex-col space-y-2 mt-3 pb-2">
                {items.map((item) => (
                  <motion.div
                    key={item}
                    whileTap={{ scale: 0.95 }}
                    className="hover:shadow-[0_0_10px_2px_rgba(59,130,246,0.3)] rounded-lg cursor-pointer hover:bg-blue-400/10"
                  >
                    <button
                      onClick={() => handleNavigation(item)}
                      className="text-white block w-full text-left px-3 py-2 text-base"
                    >
                      {item}
                    </button>
                  </motion.div>
                ))}
                
                <div className="cursor-pointer flex items-center bg-[#181818] border border-white/20 rounded-md px-3 py-2 mt-2 w-full">
                  <span className="mr-2 text-base">🌐</span>
                  <select className="bg-transparent border-none focus:ring-0 text-base text-white w-full">
                    <option>English</option>
                    <option>French</option>
                    <option>Arabic</option>
                  </select>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;