import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { FaRegEyeSlash } from "react-icons/fa";
import logo from "../assets/keyan-white.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "https://keyantechnologies-backend.onrender.com/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      }
    );

    const data = await response.json();
    if (response.ok && data.token) {
      localStorage.setItem("authToken", data.token);
      navigate("/"); 
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <section className="h-[100vh] flex items-center">
      <div className="flex items-center w-[900px] rounded-e-3xl shadow-2xl overflow-hidden mx-auto border border-[#2986FE] h-[450px] justify-center">
        <div className="w-[450px] bg-custom-image rounded-e-3xl shadow-lg relative bg-cover bg-no-repeat h-[417px]">
          <img
            src={logo}
            alt="logo"
            className="absolute top-10 left-4 translate-x-1 w-40"
          />
        </div>
        <div className="w-[450px]">
          <form
            onSubmit={handleLogin}
            className="p-10 bg-white"
          >
            <h2 className="text-4xl text-[#2986FE] font-bold font-serif mb-10 text-center">
              Login
            </h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="block w-full mb-5 p-3 border rounded"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="block w-full mb-10 p-3 border rounded"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
              </button>
            </div>
            <button
              type="submit"
              className="border py-3 w-full text-xm font-medium uppercase tracking-tight rounded-lg hover:bg-[#2986FE] hover:text-white transition-transform duration-300 border-[#2986FE] text-[#2986FE]"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
