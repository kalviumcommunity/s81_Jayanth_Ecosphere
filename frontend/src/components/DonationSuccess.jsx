import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DonationSuccess() {
  const [status, setStatus] = useState("loading");
  const [details, setDetails] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const run = async () => {
      const sp = new URLSearchParams(window.location.search);
      const sessionId = sp.get("session_id");
      if (!sessionId) {
        setStatus("error");
        setError("Missing session_id");
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:4567/donate/confirm?session_id=${encodeURIComponent(
            sessionId
          )}`,
          { withCredentials: true }
        );
        setDetails(res.data?.data);
        setStatus("ok");
      } catch (e) {
        setStatus("error");
        setError(e?.response?.data?.message || "Failed to confirm payment");
      }
    };

    run();
  }, []);

  if (status === "loading")
    return <div className="p-6">Confirming payment…</div>;

  if (status === "error") {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-xl font-bold mb-2">Donation confirmation failed</h1>
        <div className="text-red-600">{error}</div>
        <button className="glass-btn mt-4" onClick={() => navigate("/donate")}>
          Back to Donate
        </button>
      </div>
    );
  }

  const donation = details?.donation;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">Thank you!</h1>
      <p className="text-gray-600 mb-4">Your donation has been processed.</p>

      <div className="glass-card p-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Item</span>
          <span className="font-semibold">{donation?.itemName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Amount</span>
          <span className="font-semibold">₹{donation?.amountInr}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Transaction</span>
          <span className="font-mono text-sm">{donation?.transactionId}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Status</span>
          <span className="font-semibold">{details?.payment_status}</span>
        </div>
      </div>

      <button className="glass-btn mt-4" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
}
