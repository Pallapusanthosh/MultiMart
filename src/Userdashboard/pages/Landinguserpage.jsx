import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navbar from "../components/Navbar"
import Userlogin from "../components/forms/Userlogin"
import Userregister from "../components/forms/Userregister"
import Home from "../components/Home"

function Landinguserpage({onUserLogout}) {
  const [activeView, setActiveView] = useState("login")
  const [username, setUsername] = useState("")

  const showLogin = () => setActiveView("login")

  const showRegister = () => setActiveView("register")
  const showLogout = () => setActiveView("home")  // Navbar "logout" can just take user to home where logout button lives

  const handleLoginSuccess = ({ username }) => {
    setUsername(username || "")
    setActiveView("home")
  }

  const handleLogout = () => {
    localStorage.removeItem("logintoken")
    localStorage.removeItem("userid")
    localStorage.removeItem("username")
    setActiveView("login")
    onUserLogout() // Notify parent component about logout
    setUsername("")
    localStorage.removeItem("forceLogin") // Clear forceLogin flag
   
  }

  useEffect(() => {
    const t = localStorage.getItem("logintoken")
    const n = localStorage.getItem("username") || ""
    setUsername(n)
    setActiveView(t ? "home" : "login")
  }, [])

  const fadeVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.2, ease: "easeIn" } }
  }

  return (
    <div className=" h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      <Navbar showlogin={showLogin} showlogout={showLogout} showregister={showRegister} isLoggedIn={activeView === "home"} onLogout={handleLogout}  />
      <div className="flex-grow flex justify-center items-center px-4 overflow-y-auto">
       {activeView !== "home" ? (
  <div className="w-full max-w-md max-h-[90vh] overflow-auto bg-white/90 shadow-2xl rounded-2xl p-8 backdrop-blur-md">
    <AnimatePresence mode="wait">
      {activeView === "login" && (
        <motion.div key="login" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
          <Userlogin onSuccess={handleLoginSuccess} />
          <p className="text-center text-sm mt-4 text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-purple-500 font-medium cursor-pointer hover:underline"
              onClick={showRegister}
            >
              Register here
            </span>
          </p>
        </motion.div>
      )}
      {activeView === "register" && (
        <motion.div key="register" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
          <Userregister showlogin={showLogin} />
          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-purple-500 font-medium cursor-pointer hover:underline"
              onClick={showLogin}
            >
              Login here
            </span>
          </p>
        </motion.div>
      )}
     
    </AnimatePresence>
  </div>
) : (
  <div className="w-full h-full px-4">
    <AnimatePresence mode="wait">
      <motion.div key="home" variants={fadeVariants} initial="hidden" animate="visible" exit="exit">
        <Home username={username}  />
      </motion.div>
    </AnimatePresence>
  </div>
)}

      </div>
    </div>
  )
}

export default Landinguserpage
