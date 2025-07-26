import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import axios from "./../utils/axios.js";

export default function Download() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all downloads from backend
  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const res = await axios.get("/downloads");
        setDownloads(res.data);
      } catch (err) {
        console.error("Failed to fetch downloads", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 dark:bg-gray-900 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-blue-600 mb-10"
        >
          Download Tools
        </motion.h1>

        {loading ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            Loading downloads...
          </p>
        ) : downloads.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300">
            No downloads available.
          </p>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {downloads.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.image} // ✅ Fixed: item.image instead of item.iconUrl
                    alt={item.title}
                    className="w-12 h-12 rounded object-cover border"
                  />
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                  {item.description}
                </p>
                <a
                  href={item.url} // ✅ Fixed: item.url instead of item.downloadUrl
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <FaDownload /> Download
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
