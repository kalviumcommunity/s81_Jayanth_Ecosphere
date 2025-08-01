import React from "react";

const FloodInfo = () => {
  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src="https://icdo.org/files/floods.jpg"
        alt="Flood Background"
        className="absolute w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 text-white max-w-5xl text-left p-10 bg-black bg-opacity-70 rounded-lg">
        <h1 className="text-6xl font-extrabold mb-6 text-blue-400">🌊 Floods</h1>

        <p className="text-2xl mb-6">
          <strong>Floods</strong> are among the most devastating and frequent natural disasters. They occur when water overflows onto land that is usually dry — often due to heavy rainfall, melting snow, or dam failure.
        </p>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-yellow-300">📊 Global Impact</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Over <strong>1.5 billion people</strong> have been affected by floods in the last 20 years.</li>
          <li><strong>90% of natural disasters</strong> involve flooding.</li>
          <li>Asia is the most flood-prone continent.</li>
          <li>Urban flooding is increasing due to poor drainage and rapid urbanization.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-green-400">🧭 Causes of Flooding</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Heavy or prolonged rainfall</li>
          <li>River overflow</li>
          <li>Dam or levee break</li>
          <li>Storm surge during cyclones or hurricanes</li>
          <li>Rapid snowmelt</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-red-400">🛑 What To Do During a Flood</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Move to higher ground immediately.</li>
          <li>Do not attempt to walk or drive through floodwaters — <strong>just 6 inches</strong> of moving water can knock you off your feet.</li>
          <li>Stay updated with official alerts and warnings.</li>
          <li>Turn off electricity and gas if instructed.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-purple-300">✅ After the Flood</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Avoid entering buildings until they're declared safe.</li>
          <li>Watch for electrical hazards and gas leaks.</li>
          <li>Disinfect everything that got wet — floodwater may carry disease.</li>
          <li>Take photos for insurance and relief claims.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-pink-300">📍 Flood-Prone Regions</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>India (Bihar, Assam, Kerala, West Bengal) 🇮🇳</li>
          <li>Bangladesh 🇧🇩</li>
          <li>China (Yangtze River Basin) 🇨🇳</li>
          <li>United States (Mississippi River, Texas, Florida) 🇺🇸</li>
          <li>Indonesia, Philippines 🇮🇩 🇵🇭</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-orange-300">📚 Did You Know?</h2>
        <p className="text-2xl mb-4">
          The <strong>1931 China floods</strong> are considered the deadliest natural disaster in recorded history, killing an estimated <strong>1 to 4 million people</strong>.
        </p>
        <p className="text-2xl">
          Flooding is projected to worsen due to <strong>climate change</strong> and sea-level rise, especially in coastal and low-lying cities.
        </p>
      </div>
    </div>
  );
};

export default FloodInfo;
