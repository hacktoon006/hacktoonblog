import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function VerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState("verifying"); // "verifying", "success", "error"
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await axios.get(`https://server-gqgt.onrender.com/api/verify/${token}`);
        setMessage(res.data.message);
        setStatus("success");
      } catch (err) {
        setMessage(err.response?.data?.message || "Verification failed.");
        setStatus("error");
      }
    };
    verify();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center"
      >
        {status === "verifying" ? (
          <div className="flex flex-col items-center">
            <div className="loader mb-4" />
            <h1 className="text-xl font-semibold text-gray-700">{message}</h1>
          </div>
        ) : status === "success" ? (
          <div className="flex flex-col items-center text-green-600">
            <FaCheckCircle className="text-5xl mb-3" />
            <h1 className="text-xl font-semibold">{message}</h1>
          </div>
        ) : (
          <div className="flex flex-col items-center text-red-600">
            <FaTimesCircle className="text-5xl mb-3" />
            <h1 className="text-xl font-semibold">{message}</h1>
          </div>
        )}
      </motion.div>

      {/* Spinner CSS */}
      <style>{`
        .loader {
          border: 4px solid #e0e0e0;
          border-top: 4px solid #3b82f6;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default VerifyEmail;
