import { FaInstagram, FaYoutube, FaEnvelope, FaLinkedin } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo and Tagline */}
        <div>
          <h2 className="text-2xl font-bold text-white">HackToon</h2>
          <p className="mt-2 text-sm text-gray-400">
            Teaching Ethical Hacking & Tech through Blogs, YouTube & Tutorials.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-500 transition">Home</a></li>
            <li><a href="/about" className="hover:text-blue-500 transition">About</a></li>
            <li><a href="/blogs" className="hover:text-blue-500 transition">Blogs</a></li>
            <li><a href="/contact" className="hover:text-blue-500 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a
              href="https://www.instagram.com/___hacktoon/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.youtube.com/@hacktoonworld"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              <FaYoutube />
            </a>
            <a
              href="mailto:g8474096@gmail.com"
              className="hover:text-blue-400 transition"
            >
              <FaEnvelope />
            </a>  
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-white">Contact</h3>
          <p className="text-sm">Email: g8474096@gmail.com</p>
          <p className="text-sm mt-1">Location: Tamil Nadu, India</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} HackToon. All rights reserved.
      </div>
    </footer>
  )
}
