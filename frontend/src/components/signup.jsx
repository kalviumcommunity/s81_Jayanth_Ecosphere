import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { buildBackendUrl } from "../utils/apiConfig";

function Signup() {
  const [hide, setHide] = useState(true);
  const [hided, setHided] = useState(true);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpass: "",
    role: "user",
    address: {
      country: "",
      city: "",
      address: "",
      pincode: "",
      area: "",
      addressType: "",
    },
  });

  const navigate = useNavigate();

  const toggleHide = () => setHide(!hide);
  const toggleHided = () => setHided(!hided);
  const handleInputChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleAddressChange = (e) => {
    setData({
      ...data,
      address: { ...data.address, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async () => {
    setErr("");
    setLoading(true);
    const { name, email, password, confirmpass, role, address } = data;

    if (!name.trim() || !email.trim() || !password || !confirmpass || !role) {
      setErr("Please fill all fields");
      setLoading(false);
      return;
    }

    if (
      role === "volunteer" &&
      (!address.country ||
        !address.city ||
        !address.address ||
        !address.pincode)
    ) {
      setErr("Please fill all address fields for volunteer role");
      setLoading(false);
      return;
    }

    if (password !== confirmpass) {
      setErr("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        ...(role === "volunteer" && { address }),
      };

      await axios.post(buildBackendUrl("/user/signup"), payload);

      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    } catch (error) {
      console.error(error);
      setErr(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center page-wrap bg-transparent px-4"
    >
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md glass-card text-gray-900 dark:text-gray-700 rounded-2xl p-8"
      >
        <motion.h1
          variants={fadeIn}
          className="text-3xl font-bold text-center mb-6"
        >
          Create an Account
        </motion.h1>

        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Email Address", name: "email", type: "email" },
        ].map((field, i) => (
          <motion.div key={field.name} custom={i} variants={fadeIn}>
            <label className="block text-sm font-medium">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={data[field.name]}
              onChange={handleInputChange}
              className="glass-input w-full mb-4"
            />
          </motion.div>
        ))}

        <motion.div variants={fadeIn}>
          <label className="block text-sm font-medium">Role</label>
          <select
            name="role"
            value={data.role}
            onChange={handleInputChange}
            className="glass-input w-full mb-4"
          >
            <option value="user">Victim (User)</option>
            <option value="victim">Victim</option>
            <option value="volunteer">Volunteer</option>
            <option value="ngo">NGO</option>
          </select>
        </motion.div>

        {data.role === "volunteer" &&
          ["country", "city", "address", "pincode", "area", "addressType"].map(
            (field, i) => (
              <motion.div key={field} custom={i + 2} variants={fadeIn}>
                <label className="block text-sm font-medium capitalize">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  name={field}
                  value={data.address[field]}
                  onChange={handleAddressChange}
                  className="glass-input w-full mb-4"
                />
              </motion.div>
            )
          )}

        <motion.div variants={fadeIn}>
          <label className="block text-sm font-medium">Password</label>
          <div className="relative mb-4">
            <input
              type={hide ? "password" : "text"}
              name="password"
              value={data.password}
              onChange={handleInputChange}
              className="glass-input w-full pr-10 mb-4"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center text-gray-900 dark:text-gray-700 cursor-pointer"
              onClick={toggleHide}
            >
              {hide ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
        </motion.div>

        <motion.div variants={fadeIn}>
          <label className="block text-sm font-medium">Confirm Password</label>
          <div className="relative mb-4">
            <input
              type={hided ? "password" : "text"}
              name="confirmpass"
              value={data.confirmpass}
              onChange={handleInputChange}
              className="glass-input w-full pr-10 mb-4"
            />
            <span
              className="absolute inset-y-0 right-3 flex items-center text-gray-900 dark:text-gray-700 cursor-pointer"
              onClick={toggleHided}
            >
              {hided ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>
        </motion.div>

        {err && (
          <motion.p
            className="text-red-500 text-sm text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {err}
          </motion.p>
        )}

        <motion.button
          whileHover={!loading && { scale: 1.05 }}
          whileTap={!loading && { scale: 0.95 }}
          disabled={loading}
          className={`w-full glass-btn ${
            loading ? "opacity-60 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
        >
          {loading ? "Signing up..." : "Signup"}
        </motion.button>

        <motion.p variants={fadeIn} className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={() => navigate("/Login")}
          >
            Login
          </span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default Signup;
