import { useEffect, useRef, useState } from "react";
 
const sections = ["Início", "Sobre Mim", "Projetos", "Contato"];

function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      const newIndex = sections.findIndex((_, i) => {
        const section = document.getElementById(`section-${i}`);
        if (!section) return false;
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        return scrollPosition >= top && scrollPosition < bottom;
      });

      if (newIndex !== -1 && newIndex !== activeIndex) {
        setActiveIndex(newIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIndex]);

  useEffect(() => {
    const targetIndex = hoveredIndex ?? activeIndex;
    const target = itemRefs.current[targetIndex];

    if (target && indicatorRef.current) {
      indicatorRef.current.style.left = `${target.offsetLeft}px`;
      indicatorRef.current.style.width = `${target.offsetWidth}px`;
    }
  }, [activeIndex, hoveredIndex]);

  return (
    <nav className="bg-[#4F4F4F] fixed w-full z-20 top-0 start-0 border-b border-gray-800">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://www.linkedin.com/in/lucastoterol/"
          target="_blank"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Lucas
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <a href="https://linktr.ee/zluuuck" target="_blank">
            <button
              type="button"
              className="text-white bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-400"
            >
              Me Contrate
            </button>
          </a>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 relative"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-800 rounded-lg bg-[#1c1f26] md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent">
            {sections.map((title, i) => (
              <li
                key={i}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <a
                  href={`#section-${i}`}
                  className="block py-2 px-3 text-white hover:text-blue-400 transition-colors"
                >
                  {title}
                </a>
              </li>
            ))}
            <div
              ref={indicatorRef}
              className="absolute bottom-0 h-[3px] bg-white transition-all duration-300"
            />
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
