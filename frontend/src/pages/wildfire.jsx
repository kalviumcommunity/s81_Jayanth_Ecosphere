import React from "react";
import { useNavigate } from "react-router-dom";

const IconFlame = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M12 2c.3 2.2-.7 3.7-2.3 5.6C8.3 9.3 7 10.9 7 13a5 5 0 0 0 10 0c0-2.4-1.5-3.9-3-5.4-1.4-1.4-2.7-2.8-2-5.6Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M10.2 12.2c-.5 1 .1 1.7.8 2.5.6.7 1 1.2 1 2.3a2 2 0 1 1-4 0c0-1.2.8-2 2.2-4.8Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
      opacity="0.8"
    />
  </svg>
);

const WildfireInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen page-wrap py-10 sm:py-14 px-4">
      <div className="relative z-10 max-w-5xl mx-auto glass-card p-6 sm:p-10">
        <div className="border-l-4 border-red-500 pl-4">
          <div className="text-xs sm:text-sm font-semibold text-indigo-700 tracking-wide">
            Safety guide
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Wildfires
          </h1>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600">
            Practical steps to stay safe before, during, and after a wildfire.
          </p>
          <div className="mt-5 inline-flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-2xl bg-white/70 border border-white/40 h-11 w-11 text-red-600">
              <IconFlame className="h-6 w-6" />
            </span>
            <div className="text-xs sm:text-sm text-gray-600">
              Smoke can harm health even far away.
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8 text-gray-900">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700">
            <strong>Wildfires</strong> are uncontrolled fires that burn in
            forests, grasslands, or brush. Often fueled by dry conditions, wind,
            and heat, they can spread rapidly and cause immense damage to both
            nature and human settlements.
          </p>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Global impact
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Each year, wildfires burn over <strong>7 million acres</strong>{" "}
                in the U.S. alone.
              </li>
              <li>
                In 2023, Canada experienced its worst wildfire season in
                history, with <strong>over 18 million hectares</strong> burned.
              </li>
              <li>
                Wildfires contribute to{" "}
                <strong>30% of global carbon emissions</strong> in some years.
              </li>
              <li>
                Australia’s 2019–2020 bushfires killed or displaced over{" "}
                <strong>3 billion animals</strong>.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Common causes
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Lightning strikes</li>
              <li>Campfires left unattended</li>
              <li>Burning debris and cigarette butts</li>
              <li>Downed power lines</li>
              <li>Arson or careless human activity</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              What to do during a wildfire
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Evacuate immediately if told to do so.</li>
              <li>Wear an N95 mask to avoid inhaling smoke.</li>
              <li>Shut all windows and vents and turn off gas.</li>
              <li>Keep emergency kits and documents ready.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              After the fire
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Wait for official “all-clear” before returning home.</li>
              <li>Check for structural damage or hotspots.</li>
              <li>Document all damage for insurance purposes.</li>
              <li>Watch for soil erosion and water contamination.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Most affected regions
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>California, Oregon, Arizona (USA)</li>
              <li>British Columbia, Alberta (Canada)</li>
              <li>Amazon Rainforest (Brazil)</li>
              <li>Australia (New South Wales, Victoria)</li>
              <li>Mediterranean countries (Greece, Spain, Turkey)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Did you know?
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              The <strong>2019–20 Australian bushfires</strong> (Black Summer)
              burned over <strong>46 million acres</strong> and emitted{" "}
              <strong>400 million tons</strong> of CO₂ — more than the country's
              entire annual output.
            </p>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              Wildfires are becoming more intense and frequent due to{" "}
              <strong>climate change, drought, and land mismanagement</strong>.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Before a wildfire: preparedness
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Prepare a go‑bag (water, meds, ID, charger, torch, first aid).
              </li>
              <li>
                Keep vehicles fueled and park facing outward if evacuation is
                likely.
              </li>
              <li>
                Reduce fuels around the home (clear dry leaves, trim vegetation,
                keep gutters clean).
              </li>
              <li>Plan two evacuation routes and a family meeting point.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Smoke safety (air quality)
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Stay indoors with windows/doors closed when smoke is heavy.
              </li>
              <li>
                Use a well‑fitting N95/FFP2 mask outdoors (cloth masks don’t
                filter fine particles well).
              </li>
              <li>
                People with asthma, heart disease, and older adults should limit
                exposure and follow medical advice.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              After the wildfire: recovery steps
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Watch for downed power lines, gas smells, and unstable
                structures.
              </li>
              <li>
                Clean ash with damp methods (avoid dry sweeping that re‑suspends
                particles).
              </li>
              <li>
                Be alert for post‑fire hazards like debris flows and flash
                floods.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              References and resources
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                <a
                  className="underline"
                  href="https://www.ready.gov/wildfires"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ready.gov: Wildfires
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.epa.gov/wildfire-smoke-course"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  EPA: Wildfire smoke and health
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.who.int/health-topics/air-pollution"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WHO: Air pollution and health
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.nifc.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  National Interagency Fire Center (incident info)
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

export default WildfireInfo;
