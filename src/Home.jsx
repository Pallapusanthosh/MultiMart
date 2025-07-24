import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Store } from 'lucide-react';
import Landinguserpage from './Userdashboard/pages/Landinguserpage';
import Landingpage from './vendordashboard/pages/Landingpage';

function Home() {
  const [user, setUser] = useState(false);
  const [vendor, setVendor] = useState(false);
  const [home, sethome] = useState(true);

  const resetToHome = () => {
    setUser(false);
    setVendor(false);
    sethome(true);
  };

  const handleUserClick = () => {
    setUser(true);
    setVendor(false);
    sethome(false);
  };

const handleVendorClick = () => {
  const token = localStorage.getItem('logintoken');
  setVendor(true);
  setUser(false);
  sethome(false);

  if (!token) {
    // When vendor is not logged in, Landingpage will open with login
    localStorage.setItem('forceLogin', 'true');
  } else {
    localStorage.removeItem('forceLogin');
  }
};


  const cardVariants = {
    hover: { scale: 1.05, y: -5, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }
  };

  return (
    <div className="min-h-screen w-full">
      {home && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 font-montserrat">
          <div className="bg-white/80 rounded-3xl shadow-2xl p-12 text-center max-w-md animate-fadeIn">
            <motion.h1
              className="text-4xl mb-4 font-bold text-pink-600 tracking-wide drop-shadow"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Welcome to Suby!
            </motion.h1>
            <motion.p
              className="text-lg mb-8 text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Choose your role to continue:
            </motion.p>

            <div className="flex gap-6 justify-center">
              <motion.div
                className="w-36 h-36 bg-gradient-to-br from-indigo-300 to-pink-300 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer hover:from-indigo-400 hover:to-pink-400 transition-colors"
                whileHover="hover"
                variants={cardVariants}
                onClick={handleUserClick}
              >
                <User size={40} className="text-white mb-2" />
                <span className="text-white font-semibold text-lg">User</span>
              </motion.div>

              <motion.div
                className="w-36 h-36 bg-gradient-to-br from-pink-300 to-indigo-300 rounded-2xl shadow-md flex flex-col items-center justify-center cursor-pointer hover:from-pink-400 hover:to-indigo-400 transition-colors"
                whileHover="hover"
                variants={cardVariants}
                onClick={handleVendorClick}
              >
                <Store size={40} className="text-white mb-2" />
                <span className="text-white font-semibold text-lg">Vendor</span>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {user && <Landinguserpage onUserLogout={resetToHome} />}
      {vendor && <Landingpage onVendorLogout={resetToHome} />}

      <style>
        {`
        .animate-fadeIn {
          animation: fadeIn 1s;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        `}
      </style>
    </div>
  );
}

export default Home;
