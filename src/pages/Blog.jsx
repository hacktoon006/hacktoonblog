import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import axios from "./../utils/axios.js";
import { Link } from "react-router-dom"; 
export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`/blogs`);
        setBlogs(res.data.blogs); // Adjust depending on your backend response
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-bold text-blue-600 text-center mb-12"
        >
          HackToon Blog
        </motion.h1>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              <img
                src={blog.image || "https://source.unsplash.com/random/800x600?blog"}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-blue-600">{blog.title}</h2>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3">
                  {blog.content.replace(/<[^>]+>/g, "").slice(0, 100)}...
                </p>
                <a
                  href="#"
                  className="text-blue-600 hover:underline mt-4 inline-block font-medium"
                >
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="text-blue-600 hover:underline mt-4 inline-block font-medium"
                  >Read More </Link>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
