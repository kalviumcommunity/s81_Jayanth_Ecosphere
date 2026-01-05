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

const FloodInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen page-wrap py-10 sm:py-14 px-4">
      <div className="relative z-10 max-w-5xl mx-auto glass-card p-6 sm:p-10">
        <div className="border-l-4 border-sky-500 pl-4">
          <div className="text-xs sm:text-sm font-semibold text-indigo-700 tracking-wide">
            Safety guide
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Floods
          </h1>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600">
            What to do before, during, and after flooding.
          </p>
          <div className="mt-5 inline-flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-2xl bg-white/70 border border-white/40 h-11 w-11 text-sky-600">
              <IconWave className="h-6 w-6" />
            </span>
            <div className="text-xs sm:text-sm text-gray-600">
              Keep routes to higher ground in mind.
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700">
            <strong>Floods</strong> are among the most devastating and frequent
            natural disasters. They occur when water overflows onto land that is
            usually dry — often due to heavy rainfall, melting snow, or dam
            failure.
          </p>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Global impact
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Over <strong>1.5 billion people</strong> have been affected by
                floods in the last 20 years.
              </li>
              <li>
                <strong>90% of natural disasters</strong> involve flooding.
              </li>
              <li>Asia is the most flood-prone continent.</li>
              <li>
                Urban flooding is increasing due to poor drainage and rapid
                urbanization.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Causes of flooding
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Heavy or prolonged rainfall</li>
              <li>River overflow</li>
              <li>Dam or levee break</li>
              <li>Storm surge during cyclones or hurricanes</li>
              <li>Rapid snowmelt</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              What to do during a flood
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Move to higher ground immediately.</li>
              <li>
                Do not attempt to walk or drive through floodwaters —{" "}
                <strong>just 6 inches</strong> of moving water can knock you off
                your feet.
              </li>
              <li>Stay updated with official alerts and warnings.</li>
              <li>Turn off electricity and gas if instructed.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              After the flood
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Avoid entering buildings until they're declared safe.</li>
              <li>Watch for electrical hazards and gas leaks.</li>
              <li>
                Disinfect everything that got wet — floodwater may carry
                disease.
              </li>
              <li>Take photos for insurance and relief claims.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Flood‑prone regions
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>India (Bihar, Assam, Kerala, West Bengal)</li>
              <li>Bangladesh</li>
              <li>China (Yangtze River Basin)</li>
              <li>United States (Mississippi River, Texas, Florida)</li>
              <li>Indonesia, Philippines</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Did you know?
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              The <strong>1931 China floods</strong> are considered the
              deadliest natural disaster in recorded history, killing an
              estimated <strong>1 to 4 million people</strong>.
            </p>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              Flooding is projected to worsen due to{" "}
              <strong>climate change</strong> and sea-level rise, especially in
              coastal and low-lying cities.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Preparedness checklist
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Know your local risk: river flooding, flash floods, or coastal
                storm surge.
              </li>
              <li>
                Keep important documents and medications in a waterproof bag.
              </li>
              <li>
                Store drinking water and non‑perishable food for at least 72
                hours.
              </li>
              <li>Charge power banks and keep a torch/flashlight available.</li>
              <li>
                If you are in a low‑lying area, pre‑plan an evacuation route to
                higher ground.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Health and safety after flooding
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Assume floodwater is contaminated; wash hands and disinfect
                surfaces.
              </li>
              <li>
                Avoid wading where you cannot see the ground (debris, open
                drains, wires).
              </li>
              <li>
                Dry out homes quickly to reduce mold; ventilate if it’s safe.
              </li>
              <li>
                Do not use electrical equipment that was wet until inspected.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Common mistakes to avoid
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Driving through flooded roads, even if water looks shallow.
              </li>
              <li>
                Touching downed power lines or entering unstable buildings.
              </li>
              <li>Returning too early before official “all‑clear”.</li>
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
                  href="https://www.ready.gov/floods"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ready.gov: Floods
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.cdc.gov/disasters/floods/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CDC: Floods (safety and cleanup)
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.fema.gov/flood-insurance"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  FEMA: Flood insurance and preparedness
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.noaa.gov/education/resource-collections/weather-atmosphere/floods"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NOAA: Flood education resources
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

export default FloodInfo;
