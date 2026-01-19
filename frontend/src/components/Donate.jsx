import React, { useMemo, useState } from "react";
import axios from "axios";
import { buildBackendUrl } from "../utils/apiConfig";

import donateBanner from "../assets/donate-banner.svg";
import donateFood from "../assets/donate-food.svg";
import donateMedical from "../assets/donate-medical.svg";
import donateShelter from "../assets/donate-shelter.svg";
import donateWater from "../assets/donate-water.svg";

const items = [
  {
    key: "food_kit",
    name: "Food Kit",
    amount: 500,
    image: donateFood,
    desc: "Basic nutrition packs for families impacted by disasters.",
  },
  {
    key: "medical_kit",
    name: "Medical Aid Kit",
    amount: 1000,
    image: donateMedical,
    desc: "First-aid supplies and emergency medical support.",
  },
  {
    key: "shelter_kit",
    name: "Emergency Shelter Kit",
    amount: 2500,
    image: donateShelter,
    desc: "Temporary shelter essentials for displaced communities.",
  },
  {
    key: "water_pack",
    name: "Clean Water Pack",
    amount: 300,
    image: donateWater,
    desc: "Safe drinking water support during emergencies.",
  },
  { key: "custom", name: "Custom Donation", amount: null, image: donateBanner },
];

export default function Donate() {
  const [selected, setSelected] = useState("food_kit");
  const [custom, setCustom] = useState(500);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const selectedItem = useMemo(
    () => items.find((i) => i.key === selected),
    [selected]
  );

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const startCheckout = async () => {
    setError("");
    setLoading(true);
    try {
      const body = {
        itemKey: selected,
        ...(selected === "custom" ? { customAmountInr: custom } : {}),
      };

      const res = await axios.post(buildBackendUrl("/donate/checkout"), body, {
        withCredentials: true,
      });

      const rp = res.data?.razorpay;
      if (!rp?.keyId || !rp?.orderId) {
        setError("Failed to start payment");
        return;
      }

      const ok = await loadRazorpayScript();
      if (!ok) {
        setError("Failed to load Razorpay checkout");
        return;
      }

      const options = {
        key: rp.keyId,
        amount: rp.amount,
        currency: rp.currency || "INR",
        name: "EcoSphere",
        description: rp.itemName || "Donation",
        order_id: rp.orderId,
        prefill: {
          name: rp.donorName || "",
          email: rp.donorEmail || "",
        },
        notes: {
          donationId: rp.donationId,
          itemName: rp.itemName,
        },
        handler: async (response) => {
          try {
            await axios.post(buildBackendUrl("/donate/verify"), response, {
              withCredentials: true,
            });
            window.location.href = `/donation-success?donation_id=${encodeURIComponent(
              rp.donationId
            )}`;
          } catch (e) {
            setError(
              e?.response?.data?.message || "Payment verification failed"
            );
          }
        },
        modal: {
          ondismiss: () => setError("Payment cancelled"),
        },
        theme: { color: "#4f46e5" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp) => {
        setError(resp?.error?.description || "Payment failed");
      });
      rzp.open();
    } catch (e) {
      setError(e?.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="glass-card p-5 sm:p-6 flex flex-col md:flex-row items-center gap-6 mb-6">
        <img
          src={donateBanner}
          alt="Donate"
          className="w-full md:w-[420px] rounded-2xl border border-gray-200"
          loading="lazy"
        />
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold">Donate</h1>
          <p className="text-gray-600 mt-2">
            Select an item to support disaster relief efforts.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {items.map((i) => (
          <label
            key={i.key}
            className={`glass-card p-4 cursor-pointer transition hover:bg-indigo-50/30 border ${
              selected === i.key ? "border-indigo-300" : "border-transparent"
            }`}
          >
            <div className="flex items-start gap-4">
              <img
                src={i.image}
                alt={i.name}
                className="w-28 h-20 sm:w-32 sm:h-24 rounded-xl object-cover border border-gray-200"
                loading="lazy"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="donation"
                      value={i.key}
                      checked={selected === i.key}
                      onChange={() => setSelected(i.key)}
                    />
                    <span className="font-semibold text-gray-900">
                      {i.name}
                    </span>
                  </span>

                  <span className="text-gray-800 font-semibold">
                    {i.amount ? `₹${i.amount}` : ""}
                  </span>
                </div>

                {i.desc && (
                  <div className="text-sm text-gray-600 mt-1">{i.desc}</div>
                )}

                {i.key === "custom" && selected === "custom" && (
                  <div className="pt-3">
                    <label className="text-sm text-gray-600">
                      Custom amount (INR)
                    </label>
                    <input
                      type="number"
                      min={1}
                      className="glass-input w-full mt-1"
                      value={custom}
                      onChange={(e) => setCustom(Number(e.target.value))}
                    />
                  </div>
                )}
              </div>
            </div>
          </label>
        ))}

        <div className="md:col-span-2">
          {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

          <button
            className="glass-btn w-full"
            disabled={loading}
            onClick={startCheckout}
          >
            {loading
              ? "Starting payment…"
              : `Donate${
                  selectedItem?.amount ? ` ₹${selectedItem.amount}` : ""
                }`}
          </button>
        </div>
      </div>
    </div>
  );
}
