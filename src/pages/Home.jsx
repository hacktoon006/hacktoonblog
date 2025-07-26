import Slider from "./../components/Slider";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-white min-h-screen text-gray-800 px-4 sm:px-8 py-10">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-blue-600 mb-4">
          Welcome to HackToon Blog
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Learn Ethical Hacking, Tech Tips, and Modern Coding Skills — All in One Place.
        </p>
      </motion.div>

      {/* Feature Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid gap-8 md:grid-cols-3 max-w-6xl mx-auto"
      >
        {[
          {
            title: "💻 Ethical Hacking",
            desc: "Step-by-step ethical hacking tutorials, tools, and techniques.",
          },
          {
            title: "📚 Study Tools",
            desc: "AI-powered notes, flashcards, and group chats to make learning fun.",
          },
          {
            title: "🧠 Learn with Projects",
            desc: "Build real-world projects using the MERN stack and secure them too!",
          },
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-50 p-6 rounded-xl shadow-md transition-all"
          >
            <h3 className="text-xl font-semibold text-blue-600 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Call To Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-20"
      >
        <h2 className="text-3xl font-bold mb-4 text-blue-600">
          Ready to Explore the Blog?
        </h2>
        <p className="text-gray-600 mb-6">
          Start reading and leveling up your tech journey now.
        </p>
        <Link to="/blogs">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition">
            Visit Blogs
          </button>
        </Link>
      </motion.div>

      {/* Hero Slider at Bottom with Spacing */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-24 mb-16 max-w-6xl mx-auto"
      >
        <Slider />
      </motion.div>
    </div>
  );
}
