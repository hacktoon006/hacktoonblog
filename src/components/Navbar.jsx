import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "./ui/sheet";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Chat", href: "/chat" },
  { name: "Videos", href: "/videos" },
  { name: "Blogs", href: "/blogs" },
  { name: "Download", href: "/downloads" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = () => {
    navigate("/login");
    setOpen(false);
  };

  const handleProfile = () => {
    navigate("/profile");
    setOpen(false);
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-white border-b shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight">
            HackToon
          </Link>
        </motion.div>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
          {!user ? (
            <Button variant="default" onClick={handleLogin}>
              Login
            </Button>
          ) : (
            <Button variant="outline" onClick={handleProfile}>
              👤 {user.name || "Profile"}
            </Button>
          )}
        </div>

        {/* Mobile nav */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 bg-white p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-blue-600">Menu</h2>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon" aria-label="Close">
                    <X className="h-5 w-5" />
                  </Button>
                </SheetClose>
              </div>

              <div className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-700 hover:text-blue-600 text-base font-medium transition-colors"
                    >
                      {link.name}
                    </Link>
                  </SheetClose>
                ))}

                <SheetClose asChild>
                  {!user ? (
                    <Button className="w-full mt-4" onClick={handleLogin}>
                      Login
                    </Button>
                  ) : (
                    <Button className="w-full mt-4" onClick={handleProfile}>
                      👤 {user.name || "Profile"}
                    </Button>
                  )}
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
