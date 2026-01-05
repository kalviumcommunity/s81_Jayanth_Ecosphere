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

const LandslideInfo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen page-wrap py-10 sm:py-14 px-4">
      <div className="relative z-10 max-w-5xl mx-auto glass-card p-6 sm:p-10">
        <div className="border-l-4 border-amber-500 pl-4">
          <div className="text-xs sm:text-sm font-semibold text-indigo-700 tracking-wide">
            Safety guide
          </div>
          <h1 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
            Landslides
          </h1>
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600">
            Warning signs, prevention tips, and what to do during an event.
          </p>
          <div className="mt-5 inline-flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-2xl bg-white/70 border border-white/40 h-11 w-11 text-amber-600">
              <IconMountain className="h-6 w-6" />
            </span>
            <div className="text-xs sm:text-sm text-gray-600">
              Watch for cracks, leaning trees, and unusual sounds.
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-8">
          <p className="text-sm sm:text-base lg:text-lg text-gray-700">
            <strong>Landslides</strong> are the movement of rock, earth, or
            debris down a slope due to gravity. Triggered by natural factors
            like heavy rainfall, earthquakes, or human activity, landslides can
            devastate communities in seconds.
          </p>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Global statistics
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Every year, landslides cause over <strong>4,000 deaths</strong>{" "}
                worldwide.
              </li>
              <li>
                In India, the 2023 monsoon triggered{" "}
                <strong>200+ landslides</strong> in Himachal Pradesh alone.
              </li>
              <li>
                Costs associated with landslides in the U.S. exceed{" "}
                <strong>$3.5 billion annually</strong>.
              </li>
              <li>
                Over <strong>75% of landslide fatalities</strong> occur in Asia.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Causes of landslides
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Heavy and prolonged rainfall</li>
              <li>Earthquakes and volcanic activity</li>
              <li>Deforestation and poor land use</li>
              <li>Unstable construction on slopes</li>
              <li>Glacial melting in mountainous regions</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              What to do before and during
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Watch for signs like cracks in soil, leaning trees, or bulging
                ground.
              </li>
              <li>Stay informed with weather alerts during rainy seasons.</li>
              <li>
                Move to higher ground immediately if landslide is imminent.
              </li>
              <li>Avoid river valleys and steep slopes during storms.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              After a landslide
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Stay away from the slide area; secondary slides may occur.
              </li>
              <li>Check for injured or trapped people near the slide.</li>
              <li>Report broken utility lines and damage.</li>
              <li>
                Listen to emergency broadcasts and follow official guidance.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              High‑risk areas
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>Himalayan states (India, Nepal, Bhutan)</li>
              <li>Pacific Rim (Japan, Philippines, Indonesia)</li>
              <li>Western U.S. (California, Washington)</li>
              <li>Andean regions of South America</li>
              <li>Italy (Alps and Apennines)</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Did you know?
            </h2>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              In 2014, a massive landslide in Oso, Washington (USA), killed{" "}
              <strong>43 people</strong> and buried dozens of homes.
            </p>
            <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-700">
              Landslides often follow wildfires, as vegetation loss reduces soil
              stability — a deadly chain reaction.
            </p>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Early warning signs
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>New cracks in walls, floors, soil, or paved areas.</li>
              <li>Doors/windows suddenly sticking or misaligned frames.</li>
              <li>
                Tilting trees, poles, or fences; bulging ground at slope base.
              </li>
              <li>Unusual rumbling sounds during heavy rain.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Preparedness checklist
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Know if your home is near steep slopes, rivers, or cut
                hillsides.
              </li>
              <li>Keep drains and channels clear to reduce water buildup.</li>
              <li>
                During long rains, avoid travel in hilly roads when possible.
              </li>
              <li>Have a go‑bag and a plan to move to safer ground quickly.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Common mistakes to avoid
            </h2>
            <ul className="list-disc list-inside mt-3 text-sm sm:text-base lg:text-lg text-gray-700 space-y-1">
              <li>
                Stopping vehicles under unstable slopes or near rockfall zones.
              </li>
              <li>
                Returning to the slide area too soon (secondary slides can
                occur).
              </li>
              <li>
                Ignoring small warning signs after heavy rain or earthquakes.
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
                  href="https://www.usgs.gov/programs/landslide-hazards"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  USGS: Landslide hazards
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.ready.gov/landslides-debris-flow"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Ready.gov: Landslides and debris flow
                </a>
              </li>
              <li>
                <a
                  className="underline"
                  href="https://www.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  NASA: Hazard monitoring and Earth observations
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

export default LandslideInfo;
