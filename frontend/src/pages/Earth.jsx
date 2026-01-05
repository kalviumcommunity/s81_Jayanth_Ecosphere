import React from "react";
import { useNavigate } from "react-router-dom";

const IconMountain = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M3 20 10.5 8.5a1 1 0 0 1 1.7 0L21 20H3Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M9.7 12.7 12 10l2.3 2.7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.8"
    />
  </svg>
);

const Earthquake = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen page-wrap py-10 sm:py-14 px-4">
      <div className="relative z-10 max-w-5xl mx-auto glass-card p-6 sm:p-10">
        <div className="border-l-4 border-indigo-500 pl-4">
          <div className="text-xs sm:text-sm font-semibold text-indigo-700 tracking-wide">
            Safety guide
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Earthquakes
          </h1>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600">
            Quick safety steps you can remember under pressure.
          </p>
          <div className="mt-5 inline-flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-2xl bg-white/70 border border-white/40 h-11 w-11 text-indigo-600">
              <IconMountain className="h-6 w-6" />
            </span>
            <div className="text-xs sm:text-sm text-gray-600">
              Remember: Drop, Cover, Hold On.
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700">
            Earthquakes are powerful natural disasters caused by sudden shifts
            in the Earth's crust. They can strike without warning, causing
            massive damage to buildings, roads, and lives.
          </p>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Global impact
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Each year, around <strong>500,000 earthquakes</strong> are
                detected worldwide.
              </li>
              <li>
                About <strong>100,000</strong> of these are felt by people.
              </li>
              <li>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                    Preparedness checklist
                  </h2>
                  <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
                    <li>Secure heavy furniture and appliances to walls.</li>
                    <li>
                      Keep breakables on lower shelves; latch cabinets if
                      possible.
                    </li>
                    <li>
                      Prepare a 72‑hour kit (water, first aid, meds, torch,
                      batteries).
                    </li>
                    <li>
                      Identify safe spots in each room (under sturdy tables).
                    </li>
                    <li>Practice family communication and meeting points.</li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                    If you are outdoors or near the coast
                  </h2>
                  <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
                    <li>
                      Outdoors: move away from buildings, trees, and power
                      lines.
                    </li>
                    <li>
                      Near the coast: strong/long shaking can be a tsunami
                      warning; move to higher ground.
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
                    Common mistakes to avoid
                  </h2>
                  <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
                    <li>
                      Running outside during shaking (falling debris is a major
                      risk).
                    </li>
                    <li>Using elevators after an earthquake.</li>
                    <li>
                      Ignoring aftershocks and entering damaged buildings.
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
                        href="https://www.ready.gov/earthquakes"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Ready.gov: Earthquakes
                      </a>
                    </li>
                    <li>
                      <a
                        className="underline"
                        href="https://www.usgs.gov/natural-hazards/earthquake-hazards"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        USGS: Earthquake hazards program
                      </a>
                    </li>
                    <li>
                      <a
                        className="underline"
                        href="https://www.fema.gov/emergency-managers/risk-management/earthquake"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        FEMA: Earthquake risk management
                      </a>
                    </li>
                  </ul>
                </div>
                Approximately <strong>20 major earthquakes</strong> (magnitude
                7.0 or higher) occur annually.
              </li>
              <li>
                The 2011 Japan earthquake (Magnitude 9.0) caused over{" "}
                <strong>$235 billion</strong> in damages.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              What to do during an earthquake
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                <strong>Drop</strong> to the ground.
              </li>
              <li>
                <strong>Cover</strong> yourself under sturdy furniture.
              </li>
              <li>
                <strong>Hold On</strong> until the shaking stops.
              </li>
              <li>Stay indoors until it is safe to exit.</li>
              <li>
                If driving, pull over and stop safely — stay inside the vehicle.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              After the earthquake
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Check for injuries and administer first aid.</li>
              <li>Inspect for gas leaks, fires, and structural damage.</li>
              <li>Listen to emergency services on radio or mobile alerts.</li>
              <li>
                Expect <strong>aftershocks</strong> and stay alert.
              </li>
              <li>Be ready to evacuate if instructed by authorities.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Earthquake‑prone zones
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              Countries located on tectonic plate boundaries are at higher risk,
              including:
            </p>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Japan</li>
              <li>Indonesia</li>
              <li>Turkey</li>
              <li>Mexico</li>
              <li>India</li>
              <li>United States (California, Alaska)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Did you know?
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              The most powerful earthquake ever recorded was the{" "}
              <strong>1960 Valdivia earthquake in Chile</strong> — measuring 9.5
              on the Richter scale!
            </p>
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

export default Earthquake;
