import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiX } from "react-icons/fi";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

// Simplified, modern site title with gradient accent (no background images)
const SiteTitle = () => (
  <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
    Eco Sphere
  </span>
);

const Navbarpage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4567/user/checklogin",
          {
            withCredentials: true,
          }
        );

        const fetchedUser = response.data?.message || null;
        setUser(fetchedUser);
        setIsLoggedIn(Boolean(fetchedUser));
      } catch (error) {
        setUser(null);
        setIsLoggedIn(false);
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

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") setIsSidebarOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get("http://localhost:4567/user/logout", {
        withCredentials: true,
      });
      if (response.status === 200) {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
        setIsSidebarOpen(false);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userRole = user?.role || "";

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-semibold block hover:text-blue-500 transition duration-300"
      : "text-gray-700 dark:text-gray-700 hover:text-blue-500 block transition duration-300";

  const go = (path) => {
    navigate(path);
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="glass-card px-4 sm:px-6 py-3 sticky top-4 z-50 mx-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.36 }}
            className="cursor-pointer"
            onClick={() => navigate("/")}
          >
            <SiteTitle />
          </motion.div>

          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={toggleSidebar}
            aria-label="Open menu"
            className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-700 hover:text-blue-500 transition duration-300"
          >
            <FiMenu size={22} />
            <span className="hidden sm:inline">Menu</span>
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 bg-black/30 z-[60]"
              onClick={() => setIsSidebarOpen(false)}
            />

            <motion.aside
              ref={sidebarRef}
              initial={{ x: 320, opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 320, opacity: 0.9 }}
              transition={{ type: "tween", duration: 0.22 }}
              className="fixed right-0 top-0 h-full w-[82vw] sm:w-80 glass-card z-[70] p-5 overflow-y-auto"
              role="dialog"
              aria-modal="true"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CgProfile
                    size={26}
                    className="text-gray-700 dark:text-gray-700"
                  />
                  <div className="leading-tight">
                    <div className="text-gray-800 font-semibold">
                      {isLoggedIn ? user?.name || "Account" : "Welcome"}
                    </div>
                    <div className="text-sm text-gray-600">
                      {isLoggedIn ? userRole || "" : "Guest"}
                    </div>
                  </div>
                </div>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close menu"
                  className="text-gray-700 hover:text-blue-500 transition duration-300"
                >
                  <FiX size={22} />
                </motion.button>
              </div>

              <div className="mt-5">
                <ul className="space-y-2">
                  <NavLink
                    to="/"
                    className={linkClass}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    Home
                  </NavLink>

                  {isLoggedIn ? (
                    <>
                      <motion.li
                        whileHover={{ x: 5 }}
                        className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                        onClick={() => go("/dashboard")}
                      >
                        Dashboard
                      </motion.li>

                      {(userRole === "user" || userRole === "victim") && (
                        <>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/assistance/new")}
                          >
                            Request Assistance
                          </motion.li>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/assistance/my")}
                          >
                            My Assistance
                          </motion.li>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/incidents")}
                          >
                            Incident Feed
                          </motion.li>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/incidents/submit")}
                          >
                            Report Incident
                          </motion.li>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/donate")}
                          >
                            Donate
                          </motion.li>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/donations")}
                          >
                            My Donations
                          </motion.li>
                        </>
                      )}

                      {userRole === "volunteer" && (
                        <>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/profile")}
                          >
                            Profile
                          </motion.li>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/volunteer")}
                          >
                            Volunteer
                          </motion.li>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/assistance/pending")}
                          >
                            Pending Assistance
                          </motion.li>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/incidents")}
                          >
                            Incident Feed
                          </motion.li>
                        </>
                      )}

                      {userRole === "ngo" && (
                        <>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/assistance/pending")}
                          >
                            Assistance Requests
                          </motion.li>

                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/incidents")}
                          >
                            Incident Feed
                          </motion.li>

                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/ngo/volunteers")}
                          >
                            Volunteers
                          </motion.li>
                        </>
                      )}

                      {userRole === "admin" && (
                        <>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/incidents/admin")}
                          >
                            Review Incidents
                          </motion.li>
                          <motion.li
                            whileHover={{ x: 5 }}
                            className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                            onClick={() => go("/admin/ngos")}
                          >
                            Verify NGOs
                          </motion.li>
                        </>
                      )}

                      <motion.li
                        whileHover={{ x: 5 }}
                        className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                        onClick={() => go("/data")}
                      >
                        Data
                      </motion.li>
                      <motion.li
                        whileHover={{ x: 5 }}
                        className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                        onClick={() => go("/chat")}
                      >
                        Contact Volunteer
                      </motion.li>
                      <motion.li
                        whileHover={{ x: 5 }}
                        className="text-gray-700 hover:text-blue-500 cursor-pointer transition block"
                        onClick={() => go("/settings")}
                      >
                        Settings
                      </motion.li>

                      <motion.li
                        onClick={handleLogout}
                        whileHover={{ scale: 1.02 }}
                        className="text-red-600 hover:text-red-700 cursor-pointer pt-3 mt-3 border-t border-gray-200 dark:border-gray-600 block"
                      >
                        Logout
                      </motion.li>
                    </>
                  ) : (
                    <>
                      <NavLink
                        to="/chat"
                        className={linkClass}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        Contact Volunteer
                      </NavLink>
                      <NavLink
                        to="/login"
                        className={linkClass}
                        onClick={() => setIsSidebarOpen(false)}
                      >
                        Login
                      </NavLink>
                    </>
                  )}
                </ul>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbarpage;
