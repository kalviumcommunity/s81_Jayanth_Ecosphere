import React from "react";
import { useNavigate } from "react-router-dom";

const IconWave = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M3 15c2.2 0 2.2-2 4.4-2s2.2 2 4.4 2 2.2-2 4.4-2 2.2 2 4.4 2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M3 19c2.2 0 2.2-2 4.4-2s2.2 2 4.4 2 2.2-2 4.4-2 2.2 2 4.4 2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.8"
    />
  </svg>
);

const CycloneInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen page-wrap py-10 sm:py-14 px-4">
      <div className="relative z-10 max-w-5xl mx-auto glass-card p-6 sm:p-10 text-gray-900">
        <div className="border-l-4 border-indigo-500 pl-4">
          <div className="text-xs sm:text-sm font-semibold text-indigo-700 tracking-wide">
            Safety guide
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Cyclones (Hurricanes / Typhoons)
          </h1>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600">
            Preparedness checklist and safety measures for severe storms.
          </p>
          <div className="mt-5 inline-flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-2xl bg-white/70 border border-white/40 h-11 w-11 text-sky-600">
              <IconWave className="h-6 w-6" />
            </span>
            <div className="text-xs sm:text-sm text-gray-600">
              Biggest risks: wind, storm surge, and flooding.
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700">
            <strong>Cyclones</strong>, also known as hurricanes or typhoons
            depending on the region, are massive rotating storm systems
            characterized by high-speed winds, torrential rains, and low
            atmospheric pressure. These storms can cause widespread destruction,
            flooding, and loss of life.
          </p>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Global statistics
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                About <strong>80–100 tropical cyclones</strong> form globally
                each year.
              </li>
              <li>
                In 2020, Cyclone Amphan caused over <strong>$13 billion</strong>{" "}
                in damages in India and Bangladesh.
              </li>
              <li>
                Category 5 hurricanes can generate wind speeds of over{" "}
                <strong>250 km/h</strong>.
              </li>
              <li>
                Storm surges can raise sea levels by up to{" "}
                <strong>6 meters</strong>, causing deadly coastal flooding.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Cyclone categories (Saffir–Simpson scale)
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                <strong>Category 1:</strong> 119–153 km/h – Minimal damage
              </li>
              <li>
                <strong>Category 2:</strong> 154–177 km/h – Moderate damage
              </li>
              <li>
                <strong>Category 3:</strong> 178–208 km/h – Extensive damage
              </li>
              <li>
                <strong>Category 4:</strong> 209–251 km/h – Extreme damage
              </li>
              <li>
                <strong>Category 5:</strong> 252+ km/h – Catastrophic damage
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Safety measures
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Follow weather alerts and evacuate when instructed.</li>
              <li>
                Secure windows and doors; use storm shutters if available.
              </li>
              <li>
                Prepare an emergency kit with essentials (food, water, torch,
                medicines).
              </li>
              <li>Avoid coastal areas and low-lying flood zones.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Preparedness checklist
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Set a plan for evacuation and identify the safest room at home
                (interior, away from windows).
              </li>
              <li>
                Store water, food, a first aid kit, and batteries for 3–5 days.
              </li>
              <li>
                Keep documents protected in a waterproof folder and back up key
                files digitally.
              </li>
              <li>
                Bring loose outdoor items inside; secure roofs, signage, and
                water tanks if possible.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              When evacuation is advised
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Leave early to avoid traffic and flooded roads.</li>
              <li>Move to higher ground and away from coastal zones.</li>
              <li>
                If you cannot evacuate, stay indoors and away from windows until
                the storm passes.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              After the cyclone
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Beware of damaged power lines and unstable structures.</li>
              <li>Avoid driving through flooded roads.</li>
              <li>Help others in need and report missing people.</li>
              <li>
                Wait for official all-clear before returning to affected zones.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Cyclone‑prone regions
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Bay of Bengal & Arabian Sea (India, Bangladesh, Sri Lanka)
              </li>
              <li>Gulf of Mexico and the Caribbean (U.S., Mexico)</li>
              <li>Western Pacific (Philippines, China, Japan)</li>
              <li>Australia (Northern and Eastern Coasts)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Did you know?
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              Cyclone Bhola (1970) remains the deadliest tropical cyclone in
              recorded history, claiming over <strong>300,000 lives</strong> in
              East Pakistan (now Bangladesh).
            </p>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              Cyclones are known by different names: <strong>Hurricanes</strong>{" "}
              (Atlantic), <strong>Typhoons</strong> (Pacific), and{" "}
              <strong>Tropical Cyclones</strong> (Indian Ocean).
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              References and resources
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                <a
                  className="underline"
                  href="https://www.ready.gov/hurricanes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ready.gov: Hurricanes
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.noaa.gov/hurricane-prep"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NOAA: Hurricane preparedness
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://public.wmo.int/en/our-mandate/focus-areas/tropical-cyclones"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WMO: Tropical cyclones
                </a>
              </li>
            </ul>
          </div>

          <div className="glass-card p-5 sm:p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  Need help now?
                </div>
                <div className="text-xs sm:text-sm text-gray-600 mt-1">
                  Use EcoSphere to report incidents, request assistance, or
                  contact a volunteer.
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  className="glass-btn"
                  onClick={() => navigate("/incidents/submit")}
                >
                  Report Incident
                </button>
                <button
                  className="glass-btn"
                  onClick={() => navigate("/assistance/new")}
                >
                  Request Assistance
                </button>
                <button className="glass-btn" onClick={() => navigate("/chat")}>
                  Contact Volunteer
                </button>
                <button
                  className="glass-btn"
                  onClick={() => navigate("/donate")}
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CycloneInfo;
