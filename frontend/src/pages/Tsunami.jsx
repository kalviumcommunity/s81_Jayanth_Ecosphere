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

const TsunamiInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen page-wrap py-10 sm:py-14 px-4">
      <div className="relative z-10 max-w-5xl mx-auto glass-card p-6 sm:p-10">
        <div className="border-l-4 border-sky-500 pl-4">
          <div className="text-xs sm:text-sm font-semibold text-indigo-700 tracking-wide">
            Safety guide
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Tsunamis
          </h1>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600">
            Warning signs and evacuation steps for coastal safety.
          </p>
          <div className="mt-5 inline-flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-2xl bg-white/70 border border-white/40 h-11 w-11 text-sky-600">
              <IconWave className="h-6 w-6" />
            </span>
            <div className="text-xs sm:text-sm text-gray-600">
              If you feel strong shaking near the coast, move.
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700">
            <strong>Tsunamis</strong> are giant sea waves caused by underwater
            earthquakes, volcanic eruptions, or landslides. They can travel
            across oceans at jetliner speeds and cause catastrophic flooding and
            destruction when they hit coastal areas.
          </p>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Global statistics
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Most tsunamis are triggered by{" "}
                <strong>underwater earthquakes</strong>.
              </li>
              <li>
                The 2004 Indian Ocean tsunami killed over{" "}
                <strong>230,000 people</strong> in 14 countries.
              </li>
              <li>
                Tsunamis can reach speeds of <strong>500–800 km/h</strong> in
                open ocean.
              </li>
              <li>
                Wave heights at coastlines can exceed <strong>30 meters</strong>
                .
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Warning signs
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Strong or long-lasting ground shaking near the coast.</li>
              <li>Sudden, unusual ocean behavior — like receding water.</li>
              <li>Loud ocean roar or thunder-like noise.</li>
              <li>
                Official tsunami alerts via sirens, radio, or mobile apps.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Safety measures
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Immediately move inland to higher ground — don’t wait.</li>
              <li>Stay away from beaches and low-lying coastal areas.</li>
              <li>
                Follow evacuation signs and listen to emergency broadcasts.
              </li>
              <li>
                Don’t go back until officials say it’s safe — multiple waves can
                occur.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Preparedness checklist
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Know the nearest evacuation route to higher ground.</li>
              <li>
                Practice evacuation with family members (including children).
              </li>
              <li>
                Keep a go‑bag ready (water, first aid, charger, ID, torch).
              </li>
              <li>
                If you live or work near the coast, sign up for official alerts.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Common mistakes to avoid
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Going to the beach to “watch the waves”.</li>
              <li>
                Returning after the first wave (multiple waves can follow).
              </li>
              <li>Driving instead of walking if roads are congested.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              After the tsunami
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Check for injuries and help others if safe to do so.</li>
              <li>
                Watch out for debris, unstable structures, and contamination.
              </li>
              <li>Stay tuned to updates from authorities.</li>
              <li>
                Document damage for relief claims but avoid unsafe buildings.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              High‑risk tsunami zones
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Pacific Ring of Fire (Japan, Indonesia, Chile, Alaska)</li>
              <li>Indian Ocean (India, Sri Lanka, Thailand, Maldives)</li>
              <li>Western U.S. coast (California, Oregon, Washington)</li>
              <li>Mediterranean & Caribbean regions</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Did you know?
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              The word <strong>"tsunami"</strong> comes from Japanese: "tsu"
              (harbor) and "nami" (wave). Tsunamis can travel entire ocean
              basins in a matter of hours.
            </p>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              Unlike regular waves, tsunami energy stretches from the surface to
              the ocean floor, giving them immense force.
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
                  href="https://www.ready.gov/tsunamis"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ready.gov: Tsunamis
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.noaa.gov/tsunamis"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NOAA: Tsunami information
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://ioc.unesco.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  UNESCO-IOC: Tsunami readiness and warnings
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

export default TsunamiInfo;
