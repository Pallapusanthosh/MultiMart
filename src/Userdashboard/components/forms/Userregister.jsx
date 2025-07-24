import React, { useState } from "react";
import { APIpath } from "../../helpers/Api_path";

function Userregister({ showlogin }) {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading,setloading] = useState(false);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
        setloading(true);
      const response = await fetch(`${APIpath}/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        alert("User registered successfully");
        setusername("");
        setemail("");
        setpassword("");
        showlogin();
        setloading(false);
      } else {
        alert("Registration failed");
      }
    } catch (error) {
      console.log("Registration error:", error);
      alert("Something went wrong!");
    }
    setloading(false);
  };

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-center text-purple-600 mb-6">
        User Register
      </h3>
      <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
        <div>
          <label className="block text-gray-700 text-sm mb-1">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-1">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md hover:from-purple-600 hover:to-indigo-600 transition"
        >
          {loading ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Userregister;
