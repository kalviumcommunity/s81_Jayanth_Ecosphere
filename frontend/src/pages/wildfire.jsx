import React from "react";

const WildfireInfo = () => {
  return (
    <div className="relative bg-black min-h-screen flex items-center justify-center">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Burnout_ops_on_Mangum_Fire_McCall_Smokejumpers.jpg"
        alt="Wildfire Background"
        className="absolute w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 text-white max-w-5xl text-left p-10 bg-black bg-opacity-70 rounded-lg">
        <h1 className="text-6xl font-extrabold mb-6 text-red-500">🔥 Wildfires</h1>

        <p className="text-2xl mb-6">
          <strong>Wildfires</strong> are uncontrolled fires that burn in forests, grasslands, or brush. Often fueled by dry conditions, wind, and heat, they can spread rapidly and cause immense damage to both nature and human settlements.
        </p>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-yellow-300">📊 Global Impact</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Each year, wildfires burn over <strong>7 million acres</strong> in the U.S. alone.</li>
          <li>In 2023, Canada experienced its worst wildfire season in history, with <strong>over 18 million hectares</strong> burned.</li>
          <li>Wildfires contribute to <strong>30% of global carbon emissions</strong> in some years.</li>
          <li>Australia’s 2019–2020 bushfires killed or displaced over <strong>3 billion animals</strong>.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-orange-400">🔥 Common Causes</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Lightning strikes</li>
          <li>Campfires left unattended</li>
          <li>Burning debris and cigarette butts</li>
          <li>Downed power lines</li>
          <li>Arson or careless human activity</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-red-400">🛑 What To Do During a Wildfire</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Evacuate immediately if told to do so.</li>
          <li>Wear an N95 mask to avoid inhaling smoke.</li>
          <li>Shut all windows and vents and turn off gas.</li>
          <li>Keep emergency kits and documents ready.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-green-400">✅ After the Fire</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>Wait for official “all-clear” before returning home.</li>
          <li>Check for structural damage or hotspots.</li>
          <li>Document all damage for insurance purposes.</li>
          <li>Watch for soil erosion and water contamination.</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-purple-300">🌍 Most Affected Regions</h2>
        <ul className="list-disc list-inside text-2xl mb-6">
          <li>California, Oregon, Arizona (USA) 🇺🇸</li>
          <li>British Columbia, Alberta (Canada) 🇨🇦</li>
          <li>Amazon Rainforest (Brazil) 🇧🇷</li>
          <li>Australia (New South Wales, Victoria) 🇦🇺</li>
          <li>Mediterranean countries (Greece, Spain, Turkey)</li>
        </ul>

        <h2 className="text-4xl font-bold mt-8 mb-4 text-pink-300">📚 Did You Know?</h2>
        <p className="text-2xl mb-4">
          The <strong>2019–20 Australian bushfires</strong> (Black Summer) burned over <strong>46 million acres</strong> and emitted <strong>400 million tons</strong> of CO₂ — more than the country's entire annual output.
        </p>
        <p className="text-2xl">
          Wildfires are becoming more intense and frequent due to <strong>climate change, drought, and land mismanagement</strong>.
        </p>
      </div>
    </div>
  );
};

export default WildfireInfo;
