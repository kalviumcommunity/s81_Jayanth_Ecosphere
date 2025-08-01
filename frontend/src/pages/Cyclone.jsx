import React from "react";

const CycloneInfo = () => {
  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src="https://img.theweek.in/content/dam/week/news/2020/images/2022/2/10/Super-Cyclone-Tornado-forming-destruction-Severe-hurricane-storm-weather-clouds-shut.jpg"
        alt="Cyclone Background"
        className="absolute w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 text-white max-w-5xl text-left p-10 bg-black bg-opacity-70 rounded-lg">
        <h1 className="text-6xl font-extrabold mb-6 text-cyan-400">🌀 Cyclones (Hurricanes/Typhoons)</h1>

        <p className="text-2xl mb-6">
          <strong>Cyclones</strong>, also known as hurricanes or typhoons depending on the region, are massive rotating storm systems characterized by high-speed winds, torrential rains, and low atmospheric pressure. These storms can cause widespread destruction, flooding, and loss of life.
        </p>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-orange-300">📊 Global Statistics</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>About <strong>80–100 tropical cyclones</strong> form globally each year.</li>
          <li>In 2020, Cyclone Amphan caused over <strong>$13 billion</strong> in damages in India and Bangladesh.</li>
          <li>Category 5 hurricanes can generate wind speeds of over <strong>250 km/h</strong>.</li>
          <li>Storm surges can raise sea levels by up to <strong>6 meters</strong>, causing deadly coastal flooding.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-red-300">🌪️ Cyclone Categories (Saffir-Simpson Scale)</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li><strong>Category 1:</strong> 119–153 km/h – Minimal damage</li>
          <li><strong>Category 2:</strong> 154–177 km/h – Moderate damage</li>
          <li><strong>Category 3:</strong> 178–208 km/h – Extensive damage</li>
          <li><strong>Category 4:</strong> 209–251 km/h – Extreme damage</li>
          <li><strong>Category 5:</strong> 252+ km/h – Catastrophic damage</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-green-300">🛡️ Safety Measures</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Follow weather alerts and evacuate when instructed.</li>
          <li>Secure windows and doors; use storm shutters if available.</li>
          <li>Prepare an emergency kit with essentials (food, water, torch, medicines).</li>
          <li>Avoid coastal areas and low-lying flood zones.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-blue-300">✅ After the Cyclone</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Beware of damaged power lines and unstable structures.</li>
          <li>Avoid driving through flooded roads.</li>
          <li>Help others in need and report missing people.</li>
          <li>Wait for official all-clear before returning to affected zones.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-yellow-300">🌍 Cyclone-Prone Regions</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Bay of Bengal & Arabian Sea (India, Bangladesh, Sri Lanka)</li>
          <li>Gulf of Mexico and the Caribbean (U.S., Mexico)</li>
          <li>Western Pacific (Philippines, China, Japan)</li>
          <li>Australia (Northern and Eastern Coasts)</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-pink-400">📚 Did You Know?</h2>
        <p className="text-2xl mb-4">
          Cyclone Bhola (1970) remains the deadliest tropical cyclone in recorded history, claiming over <strong>300,000 lives</strong> in East Pakistan (now Bangladesh).
        </p>
        <p className="text-2xl">
          Cyclones are known by different names: <strong>Hurricanes</strong> (Atlantic), <strong>Typhoons</strong> (Pacific), and <strong>Tropical Cyclones</strong> (Indian Ocean).
        </p>
      </div>
    </div>
  );
};

export default CycloneInfo;
