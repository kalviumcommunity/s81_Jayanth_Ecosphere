import React from "react";

const LandslideInfo = () => {
  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src="https://images.unsplash.com/photo-1521632163474-4c1b124b2c67"
        alt="Landslide Background"
        className="absolute w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 text-white max-w-5xl text-left p-10 bg-black bg-opacity-70 rounded-lg">
        <h1 className="text-6xl font-extrabold mb-6 text-yellow-400">🏔️ Landslides</h1>

        <p className="text-2xl mb-6">
          <strong>Landslides</strong> are the movement of rock, earth, or debris down a slope due to gravity. Triggered by natural factors like heavy rainfall, earthquakes, or human activity, landslides can devastate communities in seconds.
        </p>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-orange-300">📊 Global Statistics</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Every year, landslides cause over <strong>4,000 deaths</strong> worldwide.</li>
          <li>In India, the 2023 monsoon triggered <strong>200+ landslides</strong> in Himachal Pradesh alone.</li>
          <li>Costs associated with landslides in the U.S. exceed <strong>$3.5 billion annually</strong>.</li>
          <li>Over <strong>75% of landslide fatalities</strong> occur in Asia.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-red-300">⚠️ Causes of Landslides</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Heavy and prolonged rainfall</li>
          <li>Earthquakes and volcanic activity</li>
          <li>Deforestation and poor land use</li>
          <li>Unstable construction on slopes</li>
          <li>Glacial melting in mountainous regions</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-green-300">🚨 What To Do Before and During</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Watch for signs like cracks in soil, leaning trees, or bulging ground.</li>
          <li>Stay informed with weather alerts during rainy seasons.</li>
          <li>Move to higher ground immediately if landslide is imminent.</li>
          <li>Avoid river valleys and steep slopes during storms.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-blue-300">✅ After a Landslide</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Stay away from the slide area; secondary slides may occur.</li>
          <li>Check for injured or trapped people near the slide.</li>
          <li>Report broken utility lines and damage.</li>
          <li>Listen to emergency broadcasts and follow official guidance.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-purple-300">🌍 High-Risk Areas</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Himalayan states (India, Nepal, Bhutan)</li>
          <li>Pacific Rim (Japan, Philippines, Indonesia)</li>
          <li>Western U.S. (California, Washington)</li>
          <li>Andean regions of South America</li>
          <li>Italy (Alps and Apennines)</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-pink-400">📚 Did You Know?</h2>
        <p className="text-2xl mb-4">
          In 2014, a massive landslide in Oso, Washington (USA), killed <strong>43 people</strong> and buried dozens of homes.
        </p>
        <p className="text-2xl">
          Landslides often follow wildfires, as vegetation loss reduces soil stability — a deadly chain reaction.
        </p>
      </div>
    </div>
  );
};

export default LandslideInfo;
