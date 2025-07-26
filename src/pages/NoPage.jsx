import { Link } from "react-router-dom"
import { Button } from "./../components//ui/button"
import Navbar from "./../components/Navbar"
import { motion } from "framer-motion"

export default function NoPage() {
  return (
    <>
      <Navbar />
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-7xl font-bold text-blue-600 mb-4">404</h1>
          <p className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</p>
          <p className="text-gray-600 max-w-md mx-auto mb-6">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>

          <img
            src="https://illustrations.popsy.co/gray/error.svg"
            alt="Not Found"
            className="w-full max-w-md mt-10 mx-auto"
          />
        </motion.div>
      </section>
    </>
  )
}
