import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectIfLoggedIn = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/"); // redirect to home if logged in
    }
  }, [navigate]);

  return children;
};

export default RedirectIfLoggedIn;
