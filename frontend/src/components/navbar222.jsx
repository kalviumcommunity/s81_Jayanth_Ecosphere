// import React, { useState, useEffect, useRef } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { CgProfile } from "react-icons/cg";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";

// const Navbarpage = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();
//   const sidebarRef = useRef(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const response = await axios.get("http://localhost:4567/user/checklogin", {
//           withCredentials: true,
//         });
//         if (response.status === 200) {
//           setIsLoggedIn(true);
//         }
//       } catch (error) {
//         console.log("Error fetching user:", error);
//       }
//     };

//     fetchUser();
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
//         setIsSidebarOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   const handleLogout = async () => {
//     try {
//       const response = await axios.get("http://localhost:4567/user/logout", {
//         withCredentials: true,
//       });
//       if (response.status === 200) {
//         setIsLoggedIn(false);
//         setIsSidebarOpen(false);
//         navigate("/login");
//       }
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <motion.h1
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.4 }}
//           className="text-2xl font-bold text-blue-600"
//         >
//           Eco Sphere
//         </motion.h1>

//         <div className="space-x-6 flex items-center">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-blue-600 font-semibold"
//                 : "text-gray-700 dark:text-gray-200 hover:text-blue-500 transition duration-300"
//             }
//           >
//             Home
//           </NavLink>

//           {isLoggedIn ? (
//             <div className="relative" ref={sidebarRef}>
//               <motion.div
//                 whileTap={{ scale: 0.9 }}
//                 whileHover={{ scale: 1.1 }}
//                 className="inline-block"
//               >
//                 <CgProfile
//                   size={24}
//                   className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer"
//                   onClick={toggleSidebar}
//                 />
//               </motion.div>

//               <AnimatePresence>
//                 {isSidebarOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className="absolute right-0 mt-4.5 bg-white dark:bg-gray-700 rounded-xl shadow-xl p-5 w-52 z-10"
//                   >
//                     <ul className="space-y-2">
//                       <motion.li
//                         whileHover={{ x: 5 }}
//                         className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer transition"
//                         onClick={() => navigate("/profile")}
//                       >
//                         Profile
//                       </motion.li>
//                       <motion.li
//                         whileHover={{ x: 5 }}
//                         className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer transition"
//                         onClick={() => navigate("/chat")}
//                       >
//                         Chat
//                       </motion.li>
//                       <motion.li
//                         whileHover={{ x: 5 }}
//                         className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer transition"
//                         onClick={() => navigate("/volenteer")}
//                       >
//                         Volunteer
//                       </motion.li>
//                       <motion.li
//                         whileHover={{ x: 5 }}
//                         className="text-gray-700 dark:text-gray-200 hover:text-blue-500 cursor-pointer transition"
//                         onClick={() => navigate("/settings")}
//                       >
//                         Settings
//                       </motion.li>
//                       <motion.li
//                         onClick={handleLogout}
//                         whileHover={{ scale: 1.05 }}
//                         className="text-red-600 hover:text-red-700 cursor-pointer pt-2 border-t border-gray-200 dark:border-gray-600"
//                       >
//                         Logout
//                       </motion.li>
//                     </ul>
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ) : (
//             <NavLink
//               to="/login"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-blue-600 font-semibold"
//                   : "text-gray-700 dark:text-gray-200 hover:text-blue-500 transition duration-300"
//               }
//             >
//               Login
//             </NavLink>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbarpage;
