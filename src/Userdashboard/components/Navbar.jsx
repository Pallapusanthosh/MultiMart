import React from "react";

function Navbar({ showlogin, showregister, isLoggedIn, onLogout }) {
  return (
    <nav className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <h1 className="text-xl font-bold">User Dashboard</h1>
      <div className="flex gap-3">
        {!isLoggedIn ? (
          <>
            <button
              onClick={showlogin}
              className="px-4 py-1 bg-white text-purple-600 rounded-lg text-sm font-semibold shadow hover:bg-purple-100 transition"
            >
              Login
            </button>
            <button
              onClick={showregister}
              className="px-4 py-1 bg-white text-purple-600 rounded-lg text-sm font-semibold shadow hover:bg-purple-100 transition"
            >
              Register
            </button>
          </>
        ) : (
          <button
            onClick={onLogout}
            className="px-4 py-1 bg-white text-purple-600 rounded-lg text-sm font-semibold shadow hover:bg-purple-100 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
