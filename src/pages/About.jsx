import { motion } from "framer-motion"
import Navbar from "../components/Navbar" // Adjust the path as needed

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-20">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-blue-600 text-center mb-12"
        >
          About Me
        </motion.h1>

        {/* About Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg leading-relaxed text-justify mb-16"
        >
          <p className="mb-4">
            Hi 👋 I'm <strong>Gowtham</strong> — a passionate tech innovator, ethical hacker, and creative storyteller. I'm currently developing multiple full-stack applications using the <strong>MERN stack</strong>, including a feature-rich <strong>blog platform</strong>, a secure <strong>real-time chat app</strong>, and an <strong>AI-powered study assistant</strong> designed to transform student learning.
          </p>

          <p className="mb-4">
            I also run a growing <strong>YouTube channel</strong> where I teach <strong>ethical hacking</strong>, create <strong>technical tutorials</strong>, and share <strong>educational cartoon content</strong> — making learning both fun and engaging. Beyond tech, I'm a short film director and digital creator, blending <strong>Gen Z narratives</strong> with impactful storytelling. You’ll also find my creative edits on <strong>Instagram</strong>, where I showcase my work as a Photoshop editor.
          </p>

          <p className="mb-4">
            My mission is to build digital tools and content that empower the next generation to learn smarter and stay secure online. Whether it's through code, content, or cinema — I'm always driven to create, inspire, and make a difference.
          </p>

        </motion.div>

        {/* YouTube Embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">📺 My YouTube Channel</h2>
          <div className="aspect-w-16 aspect-h-9 w-full">
            <iframe
              className="w-full h-72 sm:h-96 rounded-xl shadow-lg"
              src="https://www.youtube.com/embed/videoseries?list=UU6HsO31MwK-0BKQarlcTw_Q"
              title="YouTube Channel"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>
        </motion.div>

        {/* Instagram Embed */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">📸 My Instagram</h2>
          <div className="w-full flex justify-center">
            <iframe
              src="https://www.instagram.com/___hacktoon/embed"
              className="w-full h-96 rounded-xl shadow-lg"
              allowTransparency={true}
              frameBorder="0"
              scrolling="no"
              allow="encrypted-media"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
