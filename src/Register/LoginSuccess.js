import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const user = params.get("user");
    console.log("Received token:", token ,"Received user:", user);

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", user);
      navigate("/");
    }
  }, []);

  return <div>Logging in...</div>;
};

export default LoginSuccess;