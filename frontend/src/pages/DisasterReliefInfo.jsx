import React from "react";

const DisasterReliefInfo = () => {
  return (
    <div className="relative bg-red-900 min-h-screen flex items-center justify-center text-white">
      <img
        src="https://radiant.in/wp-content/uploads/2024/09/Deployment-of-IT-Infrastructure-for-Disaster-Relief-Camps.png"
        alt="Disaster Relief Background"
        className="absolute w-full h-full object-cover opacity-50"
      />
      <div className="relative z-10 max-w-5xl p-10 bg-black bg-opacity-70 rounded-xl">
        <h1 className="text-5xl font-extrabold mb-6">🚨 Disaster Relief & Recovery</h1>

        <p className="text-xl mb-4">
          Disaster relief involves immediate response to save lives and reduce suffering after a crisis, while recovery focuses on rebuilding communities and infrastructure.
        </p>

        <h2 className="text-3xl font-bold mt-6 mb-2">🎯 Relief Objectives</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Provide food, water, and shelter to affected populations.</li>
          <li>Offer emergency healthcare and sanitation services.</li>
          <li>Ensure communication and coordination among aid agencies.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">📊 Facts and Figures</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>In 2023, natural disasters caused <strong>$360 billion</strong> in global damages.</li>
          <li>Over <strong>300 million people</strong> required humanitarian assistance worldwide.</li>
          <li>Top donors include the USA, EU, Germany, and Japan.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">🤝 Who Provides Relief?</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>International NGOs (e.g., Red Cross, CARE, World Vision).</li>
          <li>UN agencies like UNHCR, WHO, WFP.</li>
          <li>National disaster response forces (e.g., NDRF in India, FEMA in the US).</li>
          <li>Local volunteers and community-based organizations.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">💪 Long-Term Recovery Includes</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Rebuilding schools, hospitals, and roads.</li>
          <li>Providing mental health support.</li>
          <li>Restoring livelihoods through financial aid and job programs.</li>
          <li>Training communities for future preparedness.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">📦 Emergency Kit Essentials</h2>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Water (1 gallon/person/day)</li>
          <li>Non-perishable food (3-day supply)</li>
          <li>Flashlight and extra batteries</li>
          <li>First aid kit and medication</li>
          <li>Important documents in waterproof container</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-2">📚 Did You Know?</h2>
        <p className="text-lg mb-1">
          Mobile cash transfer systems like M-Pesa are increasingly used in disaster-hit areas to deliver aid quickly and securely.
        </p>
      </div>
    </div>
  );
};

export default DisasterReliefInfo;
