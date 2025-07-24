import React from "react";

function Navbar({ showLoginHandler, showRegisterHandler, showLogout, showLogoutHandler }) {
  const firmname = localStorage.getItem("firmname");

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      showLogoutHandler();
    }
  };

  return (
    <nav className="flex justify-between items-center h-16 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-md">
      {/* Logo / Title */}
      <div className="text-white font-bold text-xl uppercase tracking-wide">
        Vendor Dashboard
      </div>

      {/* Firm Name */}
      <div className="text-white font-medium hidden sm:block">
        {!firmname ? "Welcome to Vendor Dashboard" : `Firm: ${firmname}`}
      </div>

      {/* Auth Buttons */}
      <div className="flex gap-3">
        {!showLogout ? (
          <>
            <button
              onClick={showLoginHandler}
              className="px-4 py-1.5 bg-white text-indigo-600 rounded-lg text-sm font-semibold shadow hover:bg-gray-100 transition-colors"
            >
              Login
            </button>
            <button
              onClick={showRegisterHandler}
              className="px-4 py-1.5 bg-indigo-50 text-purple-700 border border-purple-200 rounded-lg text-sm font-semibold hover:bg-purple-100 transition-colors"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 bg-indigo-50 text-white rounded-lg text-sm font-semibold shadow hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
