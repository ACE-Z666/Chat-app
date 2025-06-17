import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { io } from "socket.io-client";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const socket = io(import.meta.env.VITE_API_URL, {
    transports: ["websocket"],
    withCredentials: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        formData,
        config
      );

      // Save user data to localStorage or state
      localStorage.setItem("userData", JSON.stringify(response.data));
      setLoading(false);

      // Redirect to the welcome page
      navigate("/app/welcome");
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <div className="white-cont h-[90vh] px-10 py-7 w-[90vw] rounded-2xl shade-g flex">
        <div className="h-full w-[27vw] bg-transparent rounded-tl-2xl rounded-l-2xl flex flex-col items-center justify-center px-4 py-5">
          <img src="./logo1.png" alt="logo" />
        </div>
        <div className="h-full w-[60vw] px-6 bg-transparent rounded-tr-2xl rounded-br-2xl py-5 flex flex-col gap-y-2 items-center justify-center">
          <div className="h-[75vh] w-full flex justify-center items-center bg-[#E0DFD5] shadow-lg rounded-xl px-9 pb-4">
            <div className="flex flex-col gap-y-12 justify-center items-center bg-[#e8e9eb] shade-g px-12 py-12 rounded-xl">
              <p className="font-medium text-3xl text-stone-500">
                Sign Up Here!!
              </p>
              <div className="flex flex-col gap-y-4 items-center justify-center">
                <input
                  onChange={handleChange}
                  name="name"
                  type="text"
                  placeholder="Enter Username"
                  className="w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12"
                />
                <input
                  onChange={handleChange}
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  className="w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12"
                />
                <input
                  onChange={handleChange}
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  className="w-[20vw] bg-[#e0dfd5] rounded-2xl px-4 border-none outline-none h-12"
                />
                <p className="text-center mt-4 text-gray-600">
                  Already have an account?{" "}
                  <a href="/" className="text-blue-500 hover:underline">
                    Login
                  </a>
                </p>
              </div>
              <button
                onClick={handleSubmit}
                className="w-[10vw] h-10 bg-[#f1ce00] rounded-xl text-[#6e6e6e] font-semibold hover:text-[#e0dfd5] hover:bg-[#6e6e6e] transition-all"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
              {error && <p className="text-red-500">{error}</p>}
              {loading && <div className="spinner">Loading...</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;