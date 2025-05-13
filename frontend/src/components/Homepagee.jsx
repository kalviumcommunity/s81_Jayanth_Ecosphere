import React from "react";

function Homepagee() {
  return (
    <>
      <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen py-20 px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14 max-w-screen-3xl mx-auto">
          {/* Left Tall Box */}
          <div className="bg-white rounded-3xl p-16 flex items-center justify-center border border-gray-300 min-h-[500px]">
            Left Box
          </div>

          {/* First Column Stack */}
          <div className="flex flex-col gap-12">
            <div className="bg-white rounded-3xl p-12 border border-gray-300 min-h-[280px] flex items-center justify-center">
              Top Small Box
            </div>
            <div className="bg-white rounded-3xl p-12 border border-gray-300 min-h-[280px] flex items-center justify-center">
              Bottom Small Box
            </div>
          </div>

          {/* Center Tall Box */}
          <div className="bg-white rounded-3xl p-16 flex items-center justify-center border border-gray-300 min-h-[500px]">
            Center Box
          </div>

          {/* Second Column Stack */}
          <div className="flex flex-col gap-12">
            <div className="bg-white rounded-3xl p-12 border border-gray-300 min-h-[280px] flex items-center justify-center">
              Top Small Box
            </div>
            <div className="bg-white rounded-3xl p-12 border border-gray-300 min-h-[280px] flex items-center justify-center">
              Bottom Small Box
            </div>
          </div>

          {/* Bottom Wide Boxes */}
          <div className="col-span-1 md:col-span-2 bg-white rounded-3xl p-16 border border-gray-300 min-h-[340px] flex items-center justify-center">
            Bottom Section 1
          </div>
          <div className="col-span-1 md:col-span-2 bg-white rounded-3xl p-16 border border-gray-300 min-h-[340px] flex items-center justify-center">
            Bottom Section 2
          </div>
        </div>
      </div>
        <footer className="bg-gray-800 text-white p-6 mt-8">
        <div className="text-center">
          <p>&copy; 2025 EcoSphere. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-blue-400 hover:underline mr-4">About Us</a>
            <a href="#" className="text-blue-400 hover:underline mr-4">Contact</a>
            <a href="#" className="text-blue-400 hover:underline">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Homepagee;
