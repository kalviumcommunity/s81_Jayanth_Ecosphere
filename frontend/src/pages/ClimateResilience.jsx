import React from "react";

const ClimateResilience = () => {
  return (
    <div className="relative bg-green-900 min-h-screen flex items-center justify-center text-white">
      <img
        src="https://www.indiafilings.com/learn/wp-content/uploads/2019/03/Climate-Resilience-Building-Among-Farmers.jpg"
        alt="Climate Resilience Background"
        className="absolute w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 max-w-5xl p-10 bg-black bg-opacity-70 rounded-xl">
        <h1 className="text-5xl font-extrabold mb-6">🌿 Climate Resilience</h1>

        <p className="text-xl mb-4">
          Climate resilience refers to the ability of communities, systems, and ecosystems to anticipate, prepare for, respond to, and recover from adverse climate-related impacts.
        </p>

        <h2 className="text-3xl font-bold mt-6 mb-2">🌎 Why Climate Resilience Matters</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Climate change has increased the frequency of extreme events like floods, droughts, wildfires, and storms.</li>
          <li>Vulnerable populations are disproportionately affected by climate hazards.</li>
          <li>Resilience building is essential to ensure food, water, and economic security.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">📈 Global Insights</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>UN estimates that over <strong>1.2 billion people</strong> could be displaced by climate-related disasters by 2050.</li>
          <li>Every $1 invested in resilience saves up to $6 in disaster recovery (World Bank).</li>
          <li>Only <strong>20% of climate finance</strong> globally goes to adaptation and resilience — the rest is for mitigation.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">🛠 Key Strategies</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Green infrastructure (urban forests, green roofs, wetlands).</li>
          <li>Climate-smart agriculture and drought-resistant crops.</li>
          <li>Community early-warning systems and education.</li>
          <li>Resilient housing and flood barriers.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">🔄 Community Participation</h2>
        <p className="text-lg mb-2">
          Building climate resilience is a collective effort. Local governments, NGOs, scientists, and citizens must collaborate to:
        </p>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Design disaster-proof infrastructure.</li>
          <li>Improve emergency preparedness and planning.</li>
          <li>Promote sustainable resource use.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">💡 Did You Know?</h2>
        <p className="text-lg mb-1">
          The Netherlands has one of the world's most advanced climate-resilient infrastructures — with flood management systems that protect land below sea level.
        </p>
      </div>
    </div>
  );
};

export default ClimateResilience;
