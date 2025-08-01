import React from "react";

const TsunamiInfo = () => {
  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src="https://media.istockphoto.com/id/182006434/photo/tsunami-waves.jpg?s=612x612&w=0&k=20&c=odmIVgu3rJfEgMg1f_-V1Q4FXv2RPxQYFqrzR-PxoyM="
        alt="Tsunami Background"
        className="absolute w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 text-white max-w-5xl text-left p-10 bg-black bg-opacity-70 rounded-lg">
        <h1 className="text-6xl font-extrabold mb-6 text-blue-400">🌊 Tsunamis</h1>

        <p className="text-2xl mb-6">
          <strong>Tsunamis</strong> are giant sea waves caused by underwater earthquakes, volcanic eruptions, or landslides. They can travel across oceans at jetliner speeds and cause catastrophic flooding and destruction when they hit coastal areas.
        </p>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-orange-300">📊 Global Statistics</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Most tsunamis are triggered by <strong>underwater earthquakes</strong>.</li>
          <li>The 2004 Indian Ocean tsunami killed over <strong>230,000 people</strong> in 14 countries.</li>
          <li>Tsunamis can reach speeds of <strong>500–800 km/h</strong> in open ocean.</li>
          <li>Wave heights at coastlines can exceed <strong>30 meters</strong>.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-red-300">🚨 Warning Signs</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Strong or long-lasting ground shaking near the coast.</li>
          <li>Sudden, unusual ocean behavior — like receding water.</li>
          <li>Loud ocean roar or thunder-like noise.</li>
          <li>Official tsunami alerts via sirens, radio, or mobile apps.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-green-300">🛡️ Safety Measures</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Immediately move inland to higher ground — don’t wait.</li>
          <li>Stay away from beaches and low-lying coastal areas.</li>
          <li>Follow evacuation signs and listen to emergency broadcasts.</li>
          <li>Don’t go back until officials say it’s safe — multiple waves can occur.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-blue-300">✅ After the Tsunami</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Check for injuries and help others if safe to do so.</li>
          <li>Watch out for debris, unstable structures, and contamination.</li>
          <li>Stay tuned to updates from authorities.</li>
          <li>Document damage for relief claims but avoid unsafe buildings.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-yellow-300">🌍 High-Risk Tsunami Zones</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Pacific Ring of Fire (Japan, Indonesia, Chile, Alaska)</li>
          <li>Indian Ocean (India, Sri Lanka, Thailand, Maldives)</li>
          <li>Western U.S. coast (California, Oregon, Washington)</li>
          <li>Mediterranean & Caribbean regions</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-pink-400">📚 Did You Know?</h2>
        <p className="text-2xl mb-4">
          The word <strong>"tsunami"</strong> comes from Japanese: "tsu" (harbor) and "nami" (wave). Tsunamis can travel entire ocean basins in a matter of hours.
        </p>
        <p className="text-2xl">
          Unlike regular waves, tsunami energy stretches from the surface to the ocean floor, giving them immense force.
        </p>
      </div>
    </div>
  );
};

export default TsunamiInfo;
