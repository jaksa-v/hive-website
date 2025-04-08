import { useState } from "react";
import hiveLogo from "../assets/hive-logo-alternative.png";
import menuIcon from "../assets/menu-icon.png";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  return (
    <>
      <div className="flex md:hidden justify-between items-center fixed top-0 left-0 right-0 z-50 text-white py-2 px-4 bg-[#2B2B2B]/80 backdrop-blur-sm">
        <a href="/">
          <img className="h-20 w-20 -my-3" src={hiveLogo.src} alt="Hive logo" />
        </a>
        <button
          onClick={toggleMenu}
          className="h-8 w-8 flex items-center justify-center focus:outline-none"
          aria-label="Toggle menu"
        >
          <img
            className="h-8 w-8 cursor-pointer"
            src={menuIcon.src}
            alt="Menu icon"
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#2B2B2B] z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-gray-300 focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav className="flex flex-col px-4 py-6 space-y-3">
            <a
              href="/"
              className="text-white hover:bg-white/10 py-3 px-4 text-lg font-medium rounded-[20px] transition-colors duration-200 bg-white/5 backdrop-blur-sm"
            >
              Naslovna
            </a>
            <a
              href="/categories"
              className="text-white hover:bg-white/10 py-3 px-4 text-lg font-medium rounded-[20px] transition-colors duration-200 bg-white/5 backdrop-blur-sm"
            >
              Kategorije
            </a>
            <a
              href="/about"
              className="text-white hover:bg-white/10 py-3 px-4 text-lg font-medium rounded-[20px] transition-colors duration-200 bg-white/5 backdrop-blur-sm"
            >
              O nama
            </a>
            <a
              href="/contact"
              className="text-white hover:bg-white/10 py-3 px-4 text-lg font-medium rounded-[20px] transition-colors duration-200 bg-white/5 backdrop-blur-sm"
            >
              Kontakt
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
