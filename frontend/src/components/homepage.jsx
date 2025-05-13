import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [metrics, setMetrics] = useState({
    airQuality: 0,
    waterQuality: 0,
    wasteLevels: "",
    energyUsage: "",
  });
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [timeRange, setTimeRange] = useState("day");
  const [tipIndex, setTipIndex] = useState(Math.floor(Math.random() * 3));

  const tips = [
    "Tip: Turn off the tap while brushing your teeth. Saves 6L/min!",
    "Tip: Switch to LED lights to save energy.",
    "Tip: Use public transport to reduce emissions.",
  ];

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const generateMetricsData = (range) => {
    setLoading(true);
    const staticMetrics = {
      airQuality: 34,
      waterQuality: 73,
      wasteLevels: "High",
      energyUsage: "204 kWh",
    };
    setMetrics(staticMetrics);

    let historyData = [];
    if (range === "day") {
      historyData = Array.from({ length: 24 }, (_, hour) => {
        const time = new Date();
        time.setHours(hour, 0, 0, 0);
        return {
          name: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          AQI: 30 + Math.floor(Math.random() * 10),
        };
      });
    } else if (range === "week") {
      historyData = Array.from({ length: 7 }, (_, day) => {
        const time = new Date();
        time.setDate(time.getDate() - time.getDay() + day);
        return {
          name: time.toLocaleDateString(),
          AQI: 30 + Math.floor(Math.random() * 10),
        };
      });
    } else if (range === "month") {
      historyData = Array.from({ length: 30 }, (_, day) => {
        const time = new Date();
        time.setDate(day + 1);
        return {
          name: time.toLocaleDateString(),
          AQI: 30 + Math.floor(Math.random() * 10),
        };
      });
    } else if (range === "year") {
      historyData = Array.from({ length: 12 }, (_, month) => {
        const time = new Date();
        time.setMonth(month);
        return {
          name: time.toLocaleString("default", { month: "short" }),
          AQI: 30 + Math.floor(Math.random() * 10),
        };
      });
    }

    setHistory(historyData);
    setLoading(false);
  };

  useEffect(() => {
    generateMetricsData(timeRange);
  }, [timeRange]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex(Math.floor(Math.random() * tips.length));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };

  const cardBase = darkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900";

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const statusLabel = (aqi) => {
    if (aqi < 50) return "Good";
    if (aqi < 100) return "Moderate";
    return "Unhealthy";
  };

  return (
    <div className={darkMode ? "min-h-screen bg-gray-900 text-white" : "min-h-screen bg-gray-50 text-gray-900"}>
      <header className="flex justify-between items-center p-6">
        <h1 className="text-2xl font-extrabold">Welcome to EcoSphere</h1>
        <motion.button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full"
          whileTap={{ rotate: 360 }}
        >
          {darkMode ? "🌙" : "☀"}
        </motion.button>
      </header>

      <section className="p-6">
        <h2 className="text-xl font-medium mb-2">{greeting()}, Jayanth! 🌿</h2>
        <p className="mb-4 italic text-sm text-green-600">{tips[tipIndex]}</p>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin"></div>
            <p>Loading metrics...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${cardBase} p-6 rounded-lg shadow-lg`}>
              <h3 className="text-xl font-semibold">Air Quality</h3>
              <p className="text-sm mt-1">Status: <span className="font-semibold">{statusLabel(metrics.airQuality)}</span></p>
              <div className="mt-2 text-center text-4xl font-bold" style={{
                color: metrics.airQuality < 50 ? '#22c55e' : metrics.airQuality < 100 ? '#facc15' : '#ef4444'
              }}>
                {metrics.airQuality} AQI
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${cardBase} p-6 rounded-lg shadow-lg`}>
              <h3 className="text-xl font-semibold">Water Quality</h3>
              <div className="mt-2 text-center text-4xl font-bold text-blue-400">
                {metrics.waterQuality}%
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${cardBase} p-6 rounded-lg shadow-lg`}>
              <h3 className="text-xl font-semibold">Waste Levels</h3>
              <div className="mt-2 text-center text-4xl font-bold">{metrics.wasteLevels}</div>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${cardBase} p-6 rounded-lg shadow-lg`}>
              <h3 className="text-xl font-semibold">Energy Usage</h3>
              <div className="mt-2 text-center text-4xl font-bold text-green-400">
                {metrics.energyUsage}
              </div>
            </motion.div>
          </div>
        )}
      </section>

      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">Air Quality Trend</h2>
        <select
          onChange={handleTimeRangeChange}
          value={timeRange}
          className={`${cardBase} mb-4 p-2 bg-gray-200 rounded`}
        >
          <option value="day">Day</option>
          <option value="week">Week</option>
          <option value="month">Month</option>
          <option value="year">Year</option>
        </select>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip  />
            <Line type="monotone" dataKey="AQI" stroke="#8884d8"  activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <section className="p-6">
        <h2 className="text-xl font-semibold mb-4">Action Center</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {["🌱", "⚠", "💧", "♻"].map((icon, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`${cardBase} p-8 rounded-lg shadow-lg`}
            >
              <div className="text-3xl mb-4">{icon}</div>
              <h3 className="text-2xl font-semibold mb-4">{[
                "Plant a Tree",
                "Disaster Tips",
                "Water Saving Tips",
                "Eco-Friendly Lifestyle",
              ][index]}</h3>
              <p>{[
                "Understand the benefits of planting a tree and learn the best practices for growing one.",
                "Get prepared for emergencies with expert advice on how to protect yourself and your loved ones.",
                "Explore practical and sustainable ways to conserve water in your daily life.",
                "Learn how to reduce your carbon footprint and live more sustainably through easy lifestyle changes.",
              ][index]}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="bg-gray-800 text-white p-6 mt-8">
        <div className="text-center">
          <p>&copy; 2025 EcoSphere. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-400 hover:underline mr-4">About Us</a>
            <a href="#" className="text-blue-400 hover:underline mr-4">Contact</a>
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
