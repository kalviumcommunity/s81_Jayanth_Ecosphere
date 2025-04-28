import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
  const navigate = useNavigate();
  const [hide, setHide] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState({ email: "", password: "" });
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleHide = () => setHide(!hide);

  const handleForm = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { email, password } = data;
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4567/user/login",
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("token", response.data.token);

      if (response.status === 200) {
        setIsLogin(true);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4 transition-colors">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl p-8 transition-colors"
      >
        <div className="flex justify-between items-center mb-6">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center w-full"
          >
            Login to Your Account
          </motion.h1>
        </div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 text-sm text-center rounded-md py-2 px-4 mb-4"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            onChange={handleForm}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Password</label>
          <div className="relative">
            <input
              type={hide ? "password" : "text"}
              name="password"
              onChange={handleForm}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.span
              whileTap={{ scale: 1.3 }}
              whileHover={{ scale: 1.2 }}
              className="absolute top-2.5 right-3 text-gray-500 dark:text-gray-300 cursor-pointer"
              onClick={handleHide}
            >
              {hide ? <FaRegEye /> : <FaRegEyeSlash />}
            </motion.span>
          </div>
        </div>

        <div className="flex justify-between items-center text-sm mb-4">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="form-checkbox rounded" />
            <span>Remember me</span>
          </label>
          <button className="text-blue-600 dark:text-blue-400 hover:underline">
            Forgot password?
          </button>
        </div>

        <motion.button
          whileHover={!loading && { scale: 1.05 }}
          whileTap={!loading && { scale: 0.95 }}
          disabled={loading}
          className={`w-full ${
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          } text-white font-medium py-2 rounded-md transition duration-300`}
          onClick={handleSubmit}
        >
          {loading ? "Logging in..." : "Login"}
        </motion.button>

        <div className="text-center text-sm mt-6 space-y-4">
          <div className="flex justify-center items-center space-x-2">
            <span className="text-gray-700 dark:text-gray-300">
              Don't have an account?
            </span>
            <button
              onClick={() => navigate("/Signup")}
              className="text-red-500 font-medium hover:underline focus:outline-none hover:text-red-600 transition duration-300"
            >
              Sign Up
            </button>
          </div>

          <hr className="my-4 border-t-2 border-gray-300 dark:border-gray-600" />
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
