import React from "react";
import { useNavigate } from "react-router-dom";

const IconHands = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <path
      d="M8.5 13.2 7 14.7a2.3 2.3 0 0 0 0 3.3 2.3 2.3 0 0 0 3.3 0l2.4-2.4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M15.5 13.2 17 14.7a2.3 2.3 0 0 1 0 3.3 2.3 2.3 0 0 1-3.3 0l-2.4-2.4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
    <path
      d="M9.8 11.6 11.2 10a2 2 0 0 1 3 0l1.4 1.6"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      opacity="0.8"
    />
  </svg>
);

const ClimateResilience = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen page-wrap py-10 sm:py-14 px-4">
      <div className="relative z-10 max-w-5xl mx-auto glass-card p-6 sm:p-10">
        <div className="border-l-4 border-indigo-500 pl-4">
          <div className="text-xs sm:text-sm font-semibold text-indigo-700 tracking-wide">
            Preparedness
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Climate resilience
          </h1>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600">
            How communities plan, adapt, and recover from climate impacts.
          </p>
          <div className="mt-5 inline-flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-2xl bg-white/70 border border-white/40 h-11 w-11 text-indigo-600">
              <IconHands className="h-6 w-6" />
            </span>
            <div className="text-xs sm:text-sm text-gray-600">
              Resilience is planning + action + community.
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700">
            Climate resilience refers to the ability of communities, systems,
            and ecosystems to anticipate, prepare for, respond to, and recover
            from adverse climate-related impacts.
          </p>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Why climate resilience matters
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Climate change has increased the frequency of extreme events
                like floods, droughts, wildfires, and storms.
              </li>
              <li>
                Vulnerable populations are disproportionately affected by
                climate hazards.
              </li>
              <li>
                Resilience building is essential to ensure food, water, and
                economic security.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Global insights
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                UN estimates that over <strong>1.2 billion people</strong> could
                be displaced by climate-related disasters by 2050.
              </li>
              <li>
                Every $1 invested in resilience saves up to $6 in disaster
                recovery (World Bank).
              </li>
              <li>
                Only <strong>20% of climate finance</strong> globally goes to
                adaptation and resilience — the rest is for mitigation.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Key strategies
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Green infrastructure (urban forests, green roofs, wetlands).
              </li>
              <li>Climate-smart agriculture and drought-resistant crops.</li>
              <li>Community early-warning systems and education.</li>
              <li>Resilient housing and flood barriers.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              What climate resilience includes
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Risk assessment (hazard maps, vulnerability analysis, scenario
                planning).
              </li>
              <li>
                Early warning systems (alerts, evacuation planning, local
                communication channels).
              </li>
              <li>
                Strong infrastructure (drainage, heat‑resilient buildings,
                backup power for critical services).
              </li>
              <li>
                Nature‑based solutions (wetlands, mangroves, urban tree cover).
              </li>
              <li>
                Social resilience (health services, inclusive planning,
                protection for vulnerable groups).
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Household actions that help
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Keep an emergency kit and backups of key documents.</li>
              <li>Learn local evacuation routes and shelter locations.</li>
              <li>Check on neighbors during extreme heat or disasters.</li>
              <li>Support local preparedness drills and community networks.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Community participation
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              Building climate resilience is a collective effort. Local
              governments, NGOs, scientists, and citizens must collaborate to:
            </p>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Design disaster-proof infrastructure.</li>
              <li>Improve emergency preparedness and planning.</li>
              <li>Promote sustainable resource use.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Did you know?
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              The Netherlands has one of the world's most advanced
              climate-resilient infrastructures — with flood management systems
              that protect land below sea level.
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
                  href="https://www.ipcc.ch/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IPCC: Climate assessment reports
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.undrr.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UNDRR: Disaster risk reduction
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.worldbank.org/en/topic/climatechange"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  World Bank: Climate change and resilience
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://climate.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NASA: Climate science and indicators
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

export default ClimateResilience;
