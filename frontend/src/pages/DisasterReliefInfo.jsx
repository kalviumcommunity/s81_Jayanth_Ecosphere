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

const DisasterReliefInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen page-wrap py-10 sm:py-14 px-4">
      <div className="relative z-10 max-w-5xl mx-auto glass-card p-6 sm:p-10">
        <div className="border-l-4 border-indigo-500 pl-4">
          <div className="text-xs sm:text-sm font-semibold text-indigo-700 tracking-wide">
            Support
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Disaster relief and recovery
          </h1>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600">
            What happens immediately after a disaster and during rebuilding.
          </p>
          <div className="mt-5 inline-flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-2xl bg-white/70 border border-white/40 h-11 w-11 text-indigo-600">
              <IconHands className="h-6 w-6" />
            </span>
            <div className="text-xs sm:text-sm text-gray-600">
              Relief is urgent. Recovery is long‑term.
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700">
            Disaster relief involves immediate response to save lives and reduce
            suffering after a crisis, while recovery focuses on rebuilding
            communities and infrastructure.
          </p>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Relief objectives
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Provide food, water, and shelter to affected populations.</li>
              <li>Offer emergency healthcare and sanitation services.</li>
              <li>Ensure communication and coordination among aid agencies.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Facts and figures
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                In 2023, natural disasters caused <strong>$360 billion</strong>{" "}
                in global damages.
              </li>
              <li>
                Over <strong>300 million people</strong> required humanitarian
                assistance worldwide.
              </li>
              <li>Top donors include the USA, EU, Germany, and Japan.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Who provides relief?
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>International NGOs (e.g., Red Cross, CARE, World Vision).</li>
              <li>UN agencies like UNHCR, WHO, WFP.</li>
              <li>
                National disaster response forces (e.g., NDRF in India, FEMA in
                the US).
              </li>
              <li>Local volunteers and community-based organizations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Long‑term recovery includes
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Rebuilding schools, hospitals, and roads.</li>
              <li>Providing mental health support.</li>
              <li>
                Restoring livelihoods through financial aid and job programs.
              </li>
              <li>Training communities for future preparedness.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Relief to recovery: typical phases
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Immediate response (hours–days): search and rescue, medical
                care, shelter, water, food.
              </li>
              <li>
                Stabilization (days–weeks): sanitation, power restoration,
                temporary housing, cash assistance.
              </li>
              <li>
                Recovery (weeks–months): rebuilding homes/services, livelihood
                support, schooling.
              </li>
              <li>
                Resilience building (months–years): safer construction, improved
                early warning, risk‑aware planning.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Coordination and accountability
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Relief works best when government agencies, NGOs, and community
                groups share information and avoid duplication.
              </li>
              <li>
                Cash assistance can be faster than goods, when markets are
                functioning.
              </li>
              <li>
                Clear beneficiary lists and feedback channels reduce fraud and
                improve trust.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Emergency kit essentials
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Water (1 gallon/person/day)</li>
              <li>Non-perishable food (3-day supply)</li>
              <li>Flashlight and extra batteries</li>
              <li>First aid kit and medication</li>
              <li>Important documents in waterproof container</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              How to help (as a volunteer or donor)
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Follow official guidance and prioritize safety before helping.
              </li>
              <li>
                Donate money to trusted organizations when possible (it is often
                easier to distribute than physical goods).
              </li>
              <li>
                If donating goods, match requested items and confirm drop-off
                locations.
              </li>
              <li>
                Offer skills: logistics, translation, medical support, or
                community outreach.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Did you know?
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              Mobile cash transfer systems like M-Pesa are increasingly used in
              disaster-hit areas to deliver aid quickly and securely.
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
                  href="https://www.unocha.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UN OCHA: Humanitarian coordination
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.ifrc.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  IFRC: Disaster response and recovery
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://spherestandards.org/handbook/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Sphere Handbook: Humanitarian standards
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.who.int/health-topics/emergencies"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WHO: Emergencies
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

export default DisasterReliefInfo;
