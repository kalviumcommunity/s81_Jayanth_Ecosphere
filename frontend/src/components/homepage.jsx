import React from "react";
import { useNavigate } from "react-router-dom";

const disasterCards = {
  leftTall: {
    title: "Wildfire",
    desc: "Rapidly spreading fire causing destruction to forests and wildlife.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Burnout_ops_on_Mangum_Fire_McCall_Smokejumpers.jpg",
  },
  col1Top: {
    title: "Flood",
    desc: "Overflow of water submerging land and properties.",
    img: "https://icdo.org/files/floods.jpg",
  },
  col1Bottom: {
    title: "Landslide",
    desc: "Sudden movement of rock and soil down a slope.",
    img: "https://www.abhibus.com/blog/wp-content/uploads/2023/06/Safety-Tips-and-Precautions-During-landslide-1-696x464.jpg",
  },
  centerTall: {
    title: "Earthquake",
    desc: "Violent shaking of the ground caused by tectonic movements.",
    img: "https://static.scientificamerican.com/sciam/cache/file/7F5C87CE-C719-4650-B4E8AEF44415E806_source.jpg?w=1200",
  },
  col2Top: {
    title: "Cyclone",
    desc: "Powerful storm system with strong winds and rain.",
    img: "https://img.theweek.in/content/dam/week/news/2020/images/2022/2/10/Super-Cyclone-Tornado-forming-destruction-Severe-hurricane-storm-weather-clouds-shut.jpg",
  },
  col2Bottom: {
    title: "Tsunami",
    desc: "Huge ocean wave caused by underwater earthquakes.",
    img: "https://media.istockphoto.com/id/182006434/photo/tsunami-waves.jpg?s=612x612&w=0&k=20&c=odmIVgu3rJfEgMg1f_-V1Q4FXv2RPxQYFqrzR-PxoyM=",
  },
  bottom1: {
    title: "Climate Resilience",
    desc: "Learn how communities adapt to climate change impacts.",
    img: "https://www.indiafilings.com/learn/wp-content/uploads/2019/03/Climate-Resilience-Building-Among-Farmers.jpg",
  },
  bottom2: {
    title: "Disaster Relief Info",
    desc: "Access emergency resources and government aid.",
    img: "https://radiant.in/wp-content/uploads/2024/09/Deployment-of-IT-Infrastructure-for-Disaster-Relief-Camps.png",
  },
};

const DisasterCard = ({ title, desc, img, tall = false }) => (
  <div
    className={`relative bg-white rounded-3xl overflow-hidden border border-gray-300 ${
      tall ? "min-h-[600px] p-16" : "min-h-[280px] p-12"
    } flex items-center justify-center`}
  >
    <img
      src={img}
      alt={title}
      className="absolute w-full h-full object-cover opacity-80"
    />
    <div className="relative z-10 text-white text-center px-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm mt-2">{desc}</p>
    </div>
  </div>
);

function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen py-20 px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 max-w-screen-3xl mx-auto">
          <div className="cursor-pointer flex flex-col gap-12" onClick={() => navigate("/wildfire")}>
            <DisasterCard {...disasterCards.leftTall} tall />
          </div>

          <div className="flex flex-col gap-12">
            <div className="cursor-pointer" onClick={() => navigate("/flood")}>
              <DisasterCard {...disasterCards.col1Top} />
            </div>
            <div className="cursor-pointer" onClick={() => navigate("/landslide")}>
              <DisasterCard {...disasterCards.col1Bottom} />
            </div>
          </div>

          <div className="cursor-pointer" onClick={() => navigate("/earthquake")}>
            <DisasterCard {...disasterCards.centerTall} tall />
          </div>

          <div className="flex flex-col gap-12">
            <div className="cursor-pointer" onClick={() => navigate("/cyclone")}>
              <DisasterCard {...disasterCards.col2Top} />
            </div>
            <div className="cursor-pointer" onClick={() => navigate("/tsunami")}>
              <DisasterCard {...disasterCards.col2Bottom} />
            </div>
          </div>

          <div
            className="col-span-1 md:col-span-2 cursor-pointer"
            onClick={() => navigate("/climate-resilience")}
          >
            <DisasterCard {...disasterCards.bottom1} tall />
          </div>
          <div
            className="col-span-1 md:col-span-2 cursor-pointer"
            onClick={() => navigate("/disaster-relief")}
          >
            <DisasterCard {...disasterCards.bottom2} tall />
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white p-6">
        <div className="text-center">
          <p>&copy; 2025 EcoSphere. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-400 hover:underline mr-4">About Us</a>
            <a href="#" className="text-blue-400 hover:underline mr-4">Contact</a>
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Homepage;
