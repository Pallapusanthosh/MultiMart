import React from "react"
import { APIpath } from "../../helpers/Api_path"// ensure path/name matches your project

function Userlogin({ onSuccess }) {
  const [email, setemail] = React.useState("")
  const [password, setpassword] = React.useState("")
  const [loading, setloading] = React.useState(false)

  const handlesubmit = async e => {
    e.preventDefault()
    if (loading) return
    setloading(true)
    try {
      const response = await fetch(`${APIpath}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (!response.ok) {
        alert(data.message || "Login failed")
        return
      }
      localStorage.setItem("logintoken", data.logintoken)
      localStorage.setItem("userid", data.userid)
      localStorage.setItem("username", data.username || email)
      setemail("")
      setpassword("")
      onSuccess && onSuccess({
        token: data.logintoken,
        userid: data.userid,
        username: data.username || email
      })
      alert("User logged in successfully")
    } catch (error) {
      console.log("Login error:", error)
      alert("Network error")
    } finally {
      setloading(false)
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-center text-purple-600 mb-6">User Login</h3>
      <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
        <div>
          <label className="block text-gray-700 text-sm mb-1">Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={e => setemail(e.target.value)}
            placeholder="Enter your Email"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setpassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold shadow-md hover:from-purple-600 hover:to-indigo-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "submitting" : "submit"}
        </button>
      </form>
    </div>
  )
}

export default Userlogin
