import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { motion, AnimatePresence } from "framer-motion";

// Function to render each letter with image
const letterStyles = {
  E: "https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg",
  c: "https://upload.wikimedia.org/wikipedia/commons/3/36/Large_bonfire.jpg",
  o: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi5FQPxO36goMLOSzhRB2C3xPXHY9sy5Ab7w&s",
  S: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQi5FQPxO36goMLOSzhRB2C3xPXHY9sy5Ab7w&s",
  p: "https://energyeducation.ca/wiki/images/d/d3/Air-2716_640.jpg",
  h: "https://energyeducation.ca/wiki/images/d/d3/Air-2716_640.jpg",
  e: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJVVmeV-x1KWbrgXh34WTHCzqxrHrhwZUdUw&s",
  r: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJVVmeV-x1KWbrgXh34WTHCzqxrHrhwZUdUw&s",
};

const StyledLetter = ({ letter }) => {
  if (letter === " ") {
    return <span className="inline-block w-2" />;
  }

  const bgImage = letterStyles[letter] || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJVVmeV-x1KWbrgXh34WTHCzqxrHrhwZUdUw&s";

  return (
    <span
      className="inline-block bg-cover bg-center text-transparent bg-clip-text"
      style={{
        backgroundImage: `url("${bgImage}")`,
      }}
    >
      {letter}
    </span>
  );
};

const Navbarpage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4567/user/checklogin", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4567/user/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoggedIn(false);
        setIsSidebarOpen(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  let userRole = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userRole = decoded.role;
    } catch (error) {
      console.log("invalid token", error);
    }
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-extrabold"
        >
          {"Eco Sphere".split("").map((char, index) => (
            <StyledLetter key={index} letter={char} />
          ))}
        </motion.h1>

        <div className="space-x-6 flex items-center">
          {isLoggedIn ? (
            <div className="relative" ref={sidebarRef}>
              <motion.div whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} className="inline-block">
                <CgProfile
                  size={24}
                  className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer"
                  onClick={toggleSidebar}
                />
              </motion.div>

              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-4.5 bg-white dark:bg-gray-700 rounded-xl shadow-xl p-5 w-52 z-10"
                  >
                    <ul className="space-y-2">
                      <NavLink
                        to="/"
                        className={({ isActive }) =>
                          isActive
                            ? "text-blue-600 font-semibold block hover:text-blue-500 transition duration-300"
                            : "text-gray-700 dark:text-gray-200 hover:text-blue-500 block transition duration-300"
                        }
                      >
                        Home
                      </NavLink>

                      {userRole === "volunteer" && (
                        <>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => navigate("/profile")}
                          >
                            Profile
                          </motion.li>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => navigate("/volunteer")}
                          >
                            Volunteer
                          </motion.li>
                        </>
                      )}

                      <motion.li
                        whileHover={{ x: 5 }}
                        className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer transition block"
                        onClick={() => navigate("/data")}
                      >
                        Data
                      </motion.li>

                      <motion.li
                        whileHover={{ x: 5 }}
                        className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer transition block"
                        onClick={() => navigate("/chat")}
                      >
                        Chat
                      </motion.li>

                      <motion.li
                        whileHover={{ x: 5 }}
                        className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer transition block"
                        onClick={() => navigate("/settings")}
                      >
                        Settings
                      </motion.li>

                      <motion.li
                        onClick={handleLogout}
                        whileHover={{ scale: 1.05 }}
                        className="text-red-600 hover:text-red-700 cursor-pointer pt-2 border-t border-gray-200 dark:border-gray-600 block"
                      >
                        Logout
                      </motion.li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-500 transition duration-300"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "text-gray-700 dark:text-gray-200 hover:text-blue-500 transition duration-300"
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbarpage;
