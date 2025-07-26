import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const YOUTUBE_API_KEY = "AIzaSyCtmied18zI3AdTNyWKPvr9k-YQ-sG9KgM";
const CHANNEL_ID = "UC6HsO31MwK-0BKQarlcTw_Q";
const MAX_RESULTS = 12;

export default function VideoPage() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`
      );
      setVideos(res.data.items);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching videos", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-8 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-blue-600 text-center mb-10"
      >
        🎥 HackToon Videos
      </motion.h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading videos...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
          {videos.map((video) => {
            const videoId = video.id.videoId;
            const title = video.snippet.title;
            const thumbnail = video.snippet.thumbnails.medium.url;
            const url = `https://www.youtube.com/watch?v=${videoId}`;

            return (
              <motion.a
                key={videoId}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className="block bg-white rounded-xl shadow-md overflow-hidden transition"
              >
                <img
                  src={thumbnail}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-sm font-semibold text-gray-800 line-clamp-2">
                    {title}
                  </h2>
                </div>
              </motion.a>
            );
          })}
        </div>
      )}
    </div>
  );
}
