import React from "react";
import { useNavigate } from "react-router-dom";
import donateBanner from "../assets/donate-banner.svg";

const Icon = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center justify-center rounded-2xl bg-white/70 border border-white/40 ${className}`}
  >
    <span className="text-indigo-600">{children}</span>
  </span>
);

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

const disasterCards = {
  leftTall: {
    title: "Wildfire",
    desc: "Rapidly spreading fire causing destruction to forests and wildlife.",
    to: "/wildfire",
    tint: "text-red-600",
    icon: IconFlame,
  },
  col1Top: {
    title: "Flood",
    desc: "Overflow of water submerging land and properties.",
    to: "/flood",
    tint: "text-sky-600",
    icon: IconWave,
  },
  col1Bottom: {
    title: "Landslide",
    desc: "Sudden movement of rock and soil down a slope.",
    to: "/landslide",
    tint: "text-amber-600",
    icon: IconMountain,
  },
  centerTall: {
    title: "Earthquake",
    desc: "Violent shaking of the ground caused by tectonic movements.",
    to: "/earthquake",
    tint: "text-indigo-600",
    icon: IconMountain,
  },
  col2Top: {
    title: "Cyclone",
    desc: "Powerful storm system with strong winds and rain.",
    to: "/cyclone",
    tint: "text-indigo-600",
    icon: IconWave,
  },
  col2Bottom: {
    title: "Tsunami",
    desc: "Huge ocean wave caused by underwater earthquakes.",
    to: "/tsunami",
    tint: "text-sky-600",
    icon: IconWave,
  },
  bottom1: {
    title: "Climate Resilience",
    desc: "Learn how communities adapt to climate change impacts.",
    to: "/climate-resilience",
    tint: "text-indigo-600",
    icon: IconHands,
  },
  bottom2: {
    title: "Disaster Relief Info",
    desc: "Access emergency resources and government aid.",
    to: "/disaster-relief",
    tint: "text-indigo-600",
    icon: IconHands,
  },
};

const DisasterCard = ({ title, desc, icon: CardIcon, tint, size = "md" }) => {
  const sizes = {
    sm: {
      box: "min-h-[180px] p-5",
      icon: "h-10 w-10",
      title: "text-base sm:text-lg lg:text-xl",
      desc: "text-xs sm:text-sm lg:text-base",
    },
    md: {
      box: "min-h-[220px] p-6",
      icon: "h-12 w-12",
      title: "text-lg sm:text-xl lg:text-2xl",
      desc: "text-sm sm:text-base lg:text-lg",
    },
    lg: {
      box: "min-h-[420px] p-8",
      icon: "h-14 w-14",
      title: "text-xl sm:text-2xl lg:text-3xl",
      desc: "text-sm sm:text-base lg:text-lg",
    },
  };
  const s = sizes[size] || sizes.md;

  return (
    <div
      className={`relative bg-white rounded-3xl overflow-hidden border border-gray-200 ${s.box} flex items-center justify-center`}
    >
      {/* subtle background shape */}
      <div className="absolute -top-10 -right-10 w-36 h-36 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full opacity-60 transform rotate-12" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-gradient-to-br from-indigo-50 to-white rounded-full opacity-90" />

      <div className="relative z-10 w-full">
        <div className="flex items-start gap-4">
          <Icon className="h-12 w-12 sm:h-14 sm:w-14">
            {CardIcon ? (
              <CardIcon className={`${s.icon} ${tint || ""}`} />
            ) : null}
          </Icon>
          <div className="min-w-0">
            <h2
              className={`${s.title} font-semibold text-gray-900 leading-tight`}
            >
              {title}
            </h2>
            <p className={`${s.desc} mt-2 text-gray-600`}>{desc}</p>
            <div className="mt-4 text-xs sm:text-sm font-semibold text-indigo-700">
              Learn more →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Homepage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen py-16 sm:py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-screen-3xl mx-auto">
          {/* Hero */}
          <div className="glass-card p-6 sm:p-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-3xl">
                <div className="text-xs sm:text-sm font-semibold text-indigo-700 tracking-wide">
                  Disaster help • Community coordination • Real-time support
                </div>
                <h1 className="mt-2 text-2xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                  EcoSphere helps people get support fast.
                </h1>
                <p className="mt-3 text-sm sm:text-base lg:text-lg text-gray-600">
                  Report incidents, request assistance, contact volunteers, and
                  support relief efforts — all in one place.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
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
                  <button
                    className="glass-btn"
                    onClick={() => navigate("/chat")}
                  >
                    Contact Volunteer
                  </button>
                </div>
              </div>

              <div className="w-full lg:w-[420px] grid grid-cols-2 gap-4">
                <div
                  className="glass-card p-5 cursor-pointer"
                  onClick={() => navigate("/incidents")}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-11 w-11">
                      <IconFlame className="h-7 w-7 text-red-600" />
                    </Icon>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        Incident Feed
                      </div>
                      <div className="text-xs text-gray-600">
                        Updates near you
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="glass-card p-5 cursor-pointer"
                  onClick={() => navigate("/donate")}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-11 w-11">
                      <IconHands className="h-7 w-7 text-indigo-600" />
                    </Icon>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        Donate
                      </div>
                      <div className="text-xs text-gray-600">
                        Support relief
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="glass-card p-5 cursor-pointer"
                  onClick={() => navigate("/assistance/my")}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-11 w-11">
                      <IconMountain className="h-7 w-7 text-amber-600" />
                    </Icon>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        My Requests
                      </div>
                      <div className="text-xs text-gray-600">Track status</div>
                    </div>
                  </div>
                </div>

                <div
                  className="glass-card p-5 cursor-pointer"
                  onClick={() => navigate("/dashboard")}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-11 w-11">
                      <IconWave className="h-7 w-7 text-sky-600" />
                    </Icon>
                    <div>
                      <div className="text-sm font-bold text-gray-900">
                        Dashboard
                      </div>
                      <div className="text-xs text-gray-600">Quick actions</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disaster knowledge cards */}
          <div className="mt-12">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900">
                  Learn & prepare
                </h2>
                <p className="mt-1 text-sm sm:text-base text-gray-600">
                  Simple, practical guidance for common disasters.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-8">
              <div
                className="cursor-pointer flex flex-col"
                onClick={() => navigate(disasterCards.leftTall.to)}
              >
                <DisasterCard {...disasterCards.leftTall} size="lg" />
              </div>

              <div className="flex flex-col gap-10">
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(disasterCards.col1Top.to)}
                >
                  <DisasterCard {...disasterCards.col1Top} size="md" />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(disasterCards.col1Bottom.to)}
                >
                  <DisasterCard {...disasterCards.col1Bottom} size="md" />
                </div>
              </div>

              <div
                className="cursor-pointer"
                onClick={() => navigate(disasterCards.centerTall.to)}
              >
                <DisasterCard {...disasterCards.centerTall} size="lg" />
              </div>

              <div className="flex flex-col gap-10">
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(disasterCards.col2Top.to)}
                >
                  <DisasterCard {...disasterCards.col2Top} size="md" />
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => navigate(disasterCards.col2Bottom.to)}
                >
                  <DisasterCard {...disasterCards.col2Bottom} size="md" />
                </div>
              </div>

              <div
                className="col-span-1 md:col-span-2 cursor-pointer"
                onClick={() => navigate(disasterCards.bottom1.to)}
              >
                <DisasterCard {...disasterCards.bottom1} size="lg" />
              </div>
              <div
                className="col-span-1 md:col-span-2 cursor-pointer"
                onClick={() => navigate(disasterCards.bottom2.to)}
              >
                <DisasterCard {...disasterCards.bottom2} size="lg" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-3xl mx-auto mt-14">
          <div
            className="glass-card p-6 sm:p-8 flex flex-col md:flex-row items-center gap-8 cursor-pointer"
            onClick={() => navigate("/donate")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate("/donate");
            }}
          >
            <img
              src={donateBanner}
              alt="Donate ad"
              className="w-full md:w-[420px] rounded-2xl border border-gray-200"
              loading="lazy"
            />

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Donate to support disaster relief
              </h2>
              <p className="text-gray-600 mt-2">
                Your contribution helps provide food, medical support, clean
                water, and emergency shelter.
              </p>
              <div className="mt-5">
                <button
                  className="glass-btn"
                  onClick={() => navigate("/donate")}
                >
                  Donate Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12">
        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2025 EcoSphere. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-indigo-600 hover:underline mr-4">
              About Us
            </a>
            <a href="#" className="text-indigo-600 hover:underline mr-4">
              Contact
            </a>
            <a href="#" className="text-indigo-600 hover:underline">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Homepage;
