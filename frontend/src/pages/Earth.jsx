import React from "react";

const Earthquake = () => {
  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src="https://static.scientificamerican.com/sciam/cache/file/7F5C87CE-C719-4650-B4E8AEF44415E806_source.jpg?w=1200"
        alt="Earthquake Background"
        className="absolute w-full h-full object-cover opacity-60"
      />
      <div className="relative z-10 text-white max-w-4xl text-left p-10 bg-black bg-opacity-60 rounded-lg">
        <h1 className="text-5xl font-extrabold mb-6">🌍 Earthquakes</h1>
        
        <p className="text-xl mb-4">
          Earthquakes are powerful natural disasters caused by sudden shifts in the Earth's crust. They can strike without warning, causing massive damage to buildings, roads, and lives.
        </p>

        <h2 className="text-3xl font-bold mt-6 mb-2">📊 Global Impact</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Each year, around <strong>500,000 earthquakes</strong> are detected worldwide.</li>
          <li>About <strong>100,000</strong> of these are felt by people.</li>
          <li>Approximately <strong>20 major earthquakes</strong> (magnitude 7.0 or higher) occur annually.</li>
          <li>The 2011 Japan earthquake (Magnitude 9.0) caused over <strong>$235 billion</strong> in damages.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">🛑 What To Do During an Earthquake</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li><strong>Drop</strong> to the ground.</li>
          <li><strong>Cover</strong> yourself under sturdy furniture.</li>
          <li><strong>Hold On</strong> until the shaking stops.</li>
          <li>Stay indoors until it is safe to exit.</li>
          <li>If driving, pull over and stop safely — stay inside the vehicle.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">✅ After the Earthquake</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Check for injuries and administer first aid.</li>
          <li>Inspect for gas leaks, fires, and structural damage.</li>
          <li>Listen to emergency services on radio or mobile alerts.</li>
          <li>Expect <strong>aftershocks</strong> and stay alert.</li>
          <li>Be ready to evacuate if instructed by authorities.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">📍 Earthquake-Prone Zones</h2>
        <p className="text-lg mb-4">
          Countries located on tectonic plate boundaries are at higher risk, including:
        </p>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Japan 🇯🇵</li>
          <li>Indonesia 🇮🇩</li>
          <li>Turkey 🇹🇷</li>
          <li>Mexico 🇲🇽</li>
          <li>India 🇮🇳</li>
          <li>United States (California, Alaska) 🇺🇸</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">📚 Did You Know?</h2>
        <p className="text-lg mb-1">
          The most powerful earthquake ever recorded was the <strong>1960 Valdivia earthquake in Chile</strong> — measuring 9.5 on the Richter scale!
        </p>
      </div>
    </div>
  );
};

export default Earthquake;
