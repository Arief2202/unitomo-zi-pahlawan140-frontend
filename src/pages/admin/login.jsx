import { ArrowBack, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import bg from "../../components/assets/base.png";
import logo from "../../components/assets/Logo/logo.png";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!username || !password) {
      Swal.fire({
        title: "Error",
        text: "Username dan password tidak boleh kosong!",
        icon: "error",
      });
      return;
    }
  
    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);
  
    try {
      const response = await axios.post(BASE_URL + "/login", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      const { code, token } = response.data;
  
      if (code === 200 && token) {
        localStorage.setItem("tokenUser", token);
        localStorage.setItem("loginSuccess", "true");
        window.location.href = "/dashboard";
      } else {
        Swal.fire({
          title: "Login Gagal",
          text: response.data.message,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat login.",
        icon: "error",
      });
    }
  };
  
  

  return (
    <div
      className="flex h-screen px-0"
      style={{
        background: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-xs m-auto bg-base rounded p-5">
        <header>
          <img className="w-20 mx-auto mb-5" src={logo} alt="Logo" />
        </header>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-pdarkblue" htmlFor="username">
              Username
            </label>
            <input
              className="w-full p-2 mb-6 text-pdarkblue border-b-2 border-pdarkblue outline-none focus:bg-base bg-base"
              name="username"
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-pdarkblue" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                className="w-full p-2 mb-6 text-pdarkblue border-b-2 border-pdarkblue outline-none focus:bg-base bg-base"
                name="password"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-2 top-3 cursor-pointer text-pdarkblue"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <input
              className="w-full bg-pdarkblue hover:bg-pblue text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <p style={{ textAlign: "center" }} className="text-sm text-gray-500 font-assistant">
          <Link to="/" className="text-[#0B588F]">
            Kembali Ke Beranda
          </Link>
        </p>
      </div>
    </div>
  );
}
