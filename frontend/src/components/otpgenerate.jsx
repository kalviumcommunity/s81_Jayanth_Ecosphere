import React, { useState } from 'react';

function Otp() {
  const [data, setData] = useState({ email: '' });
  const [showOtpInputs, setShowOtpInputs] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleChange = (e) => {
    setData({ ...data, email: e.target.value });
  };

  const handleSendOtp = () => {
    if (!data.email) return alert("Please enter an email.");
    alert(`OTP sent to ${data.email}`);
    setShowOtpInputs(true);
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value.slice(-1); // allow only 1 digit
    setOtp(newOtp);

    // auto focus next input
    if (e.target.nextSibling && e.target.value) {
      e.target.nextSibling.focus();
    }
  };

  const handleVerify = () => {
    const enteredOtp = otp.join('');
    alert(`Entered OTP: ${enteredOtp}`);
    // Add actual verification logic here
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Send OTP</h2>
        <div className="flex flex-col space-y-4">
          <label htmlFor="email" className="text-gray-700 font-medium">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendOtp}
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Send OTP
          </button>

          {showOtpInputs && (
            <>
              <label className="text-gray-700 font-medium mt-4">
                Enter OTP:
              </label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    maxLength="1"
                    onChange={(e) => handleOtpChange(e, index)}
                    className="w-12 h-12 text-center text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ))}
              </div>
              <button
                onClick={handleVerify}
                className="mt-4 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
              >
                Verify OTP
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Otp;
