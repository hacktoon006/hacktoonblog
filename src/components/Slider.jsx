import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "",
    title: "Modern UI",
    subtitle: "Clean and Responsive Design",
  },
  {
    id: 2,
    image: "",
    title: "Fast Load",
    subtitle: "Optimized for performance",
  },
  {
    id: 3,
    image: "", // fixed path
    title: "Professional Look",
    subtitle: "Make your brand stand out",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-5xl h-64 sm:h-80 md:h-96 mx-auto overflow-hidden rounded-2xl shadow-lg">
      <AnimatePresence>
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute w-full h-full"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white">
            <h2 className="text-xl sm:text-2xl font-semibold">{slides[current].title}</h2>
            <p className="text-sm sm:text-base">{slides[current].subtitle}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
