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
import useAuth from "../hooks/useAuth";

const Data = () => {
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
  const { user } = useAuth();

  const tips = [
    "Tip: Turn off the tap while brushing your teeth. Saves 6L/min!",
    "Tip: Switch to LED lights to save energy.",
    "Tip: Use public transport to reduce emissions.",
  ];

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
          name: time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
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

  const aqiColorClass = (aqi) =>
    aqi < 50
      ? "text-green-500"
      : aqi < 100
        ? "text-yellow-400"
        : "text-red-500";

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
    <div className="min-h-screen page-wrap py-10 sm:py-14 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <section className="glass-card p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-xs sm:text-sm font-semibold text-indigo-700 tracking-wide">
                Environment overview
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                {greeting()}
                {user?.name ? `, ${user.name}` : ""} 🌿
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-xl">
                A quick snapshot of air, water, waste and energy indicators to
                help you understand local environmental conditions.
              </p>
              <p className="mt-3 text-xs sm:text-sm text-emerald-600 italic">
                {tips[tipIndex]}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="mt-8 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              <p className="text-gray-600 text-sm">Loading metrics...</p>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-5 rounded-2xl"
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Air Quality
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Real-time AQI status
                </p>
                <div
                  className={`mt-4 text-3xl font-extrabold text-center ${aqiColorClass(
                    metrics.airQuality,
                  )}`}
                >
                  {metrics.airQuality} AQI
                </div>
                <p className="mt-2 text-xs text-center text-gray-600">
                  Status:{" "}
                  <span className="font-semibold">
                    {statusLabel(metrics.airQuality)}
                  </span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
                className="glass-card p-5 rounded-2xl"
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Water Quality
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Drinking & usage safety
                </p>
                <div className="mt-4 text-3xl font-extrabold text-center text-sky-500">
                  {metrics.waterQuality}%
                </div>
                <p className="mt-2 text-xs text-center text-gray-600">
                  Higher is better
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-5 rounded-2xl"
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Waste Levels
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Local waste pressure
                </p>
                <div className="mt-4 text-2xl font-extrabold text-center text-amber-500">
                  {metrics.wasteLevels}
                </div>
                <p className="mt-2 text-xs text-center text-gray-600">
                  Try to keep this low
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="glass-card p-5 rounded-2xl"
              >
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                  Energy Usage
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Approximate daily use
                </p>
                <div className="mt-4 text-3xl font-extrabold text-center text-emerald-500">
                  {metrics.energyUsage}
                </div>
                <p className="mt-2 text-xs text-center text-gray-600">
                  Small savings here have big impact
                </p>
              </motion.div>
            </div>
          )}
        </section>

        <section className="glass-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                Air quality trend
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Visualize how AQI changes over your selected time range.
              </p>
            </div>
            <select
              onChange={handleTimeRangeChange}
              value={timeRange}
              className="glass-card px-3 py-1.5 text-xs sm:text-sm rounded-xl border border-gray-200 bg-white/70"
            >
              <option value="day">Last 24 hours</option>
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="year">Last 12 months</option>
            </select>
          </div>

          <div className="h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="AQI"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="glass-card p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
              Action center
            </h2>
            <p className="hidden sm:block text-xs text-gray-500">
              Simple everyday actions that support a healthier planet.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {["🌱", "⚠", "💧", "♻"].map((icon, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.96, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25 }}
                className="glass-card p-5 rounded-2xl"
              >
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="text-lg font-semibold mb-2">
                  {
                    [
                      "Plant a tree",
                      "Disaster tips",
                      "Water saving",
                      "Eco lifestyle",
                    ][index]
                  }
                </h3>
                <p className="text-sm text-gray-600">
                  {
                    [
                      "Understand the benefits of planting trees and learn the best practices for growing one.",
                      "Be ready for emergencies with simple steps that protect you and your community.",
                      "Explore practical and sustainable ways to conserve water every day.",
                      "Learn how small changes in daily habits can reduce your footprint.",
                    ][index]
                  }
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Data;
