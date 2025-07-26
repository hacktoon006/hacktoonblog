// src/pages/FullBlogPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./../utils/axios.js";
import Navbar from "../components/Navbar";

export default function FullBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data.blog);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div className="text-center mt-20 text-lg">Loading blog...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">{blog.title}</h1>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full max-h-[400px] object-cover rounded-xl mb-6"
          />
        )}
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <p className="text-sm text-gray-400 mt-10">Posted on {new Date(blog.createdAt).toLocaleString()}</p>
      </div>
    </div>
  );
}
