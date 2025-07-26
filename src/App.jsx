import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import RedirectIfLoggedIn from "./components/RedirectIfLoggedIn"; // ✅ Add this

// Pages
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPage from "./pages/BlogPage";
import Downloads from "./pages/Downloads";
import VideoPage from "./pages/Video";
import Chat from "./pages/Chat";
import LoginPage from "./pages/Auth/Login";
import RegisterPage from "./pages/Auth/Register";
import VerifyEmail from "./pages/Auth/Verify";
import NoPage from "./pages/NoPage";
import ProfilePage from "./pages/Profile";
import HackBot from './pages/Hackbot'
function AppLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <>
      <Navbar />
      <main className="pt-20 px-4">
        <Routes>
          {/* Auth Routes with RedirectIfLoggedIn wrapper */}
          <Route
            path="/login"
            element={
              <RedirectIfLoggedIn>
                <LoginPage />
              </RedirectIfLoggedIn>
            }
          />
          <Route
            path="/register"
            element={
              <RedirectIfLoggedIn>
                <RegisterPage />
              </RedirectIfLoggedIn>
            }
          />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/profile" element={<ProfilePage />} />

          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/videos" element={<VideoPage />} />
          <Route path="/chat" element={<Chat />} /> 
          {/* Blog Pages */}
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:id" element={<BlogPage />} />

          {/* 404 Page */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
