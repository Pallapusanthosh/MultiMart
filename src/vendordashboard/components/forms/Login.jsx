import React, { useState } from 'react';
import { APIpath } from '../../helpers/Apipath';

function Login({ showWelcomeHandler }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const api = APIpath;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch(`${api}/vendor/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Only do this if login is successful
                localStorage.setItem('logintoken', data.token);
                localStorage.setItem('vendorid', data.vendorid); // Store vendor ID
                setEmail('');
                setPassword('');

                // Fetch vendor details after successful login
                const vendorid = data.vendorid;
                const vendorresponse = await fetch(`${APIpath}/vendor/getvendorbyid/${vendorid}`);
                const vendordata = await vendorresponse.json();

                if (vendorresponse.ok) {
                    const firmid = vendordata.vendorfirmid;
                    let vendorfirmname = '';
                    let vendorname = vendordata.vendor.username;
                    localStorage.setItem('vendorname', vendorname);

                    if (
                        vendordata.vendor &&
                        Array.isArray(vendordata.vendor.firm) &&
                        vendordata.vendor.firm.length > 0
                    ) {
                        vendorfirmname = vendordata.vendor.firm[0].firmname;
                        localStorage.setItem('firmname', vendorfirmname);
                    } else {
                        vendorfirmname = 'No Firm';
                        localStorage.setItem('firmname', vendorfirmname);
                    }
                    localStorage.setItem('firmid', firmid ?? '');
                }
                // Now update the view
                showWelcomeHandler();
            } else {
                setError(data.message || 'Invalid email or password');
            }
        } catch (err) {
            console.error('Login failed', err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
       <div className="flex justify-center items-center min-v-screen bg-gradient-to-br from-purple-100 to-pink-100 screen p-4 ">
  <form 
    className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5 m-4"
    onSubmit={handleSubmit}
  >
    <h3 className="text-2xl font-bold text-center text-purple-600 mb-6">Vendor Login</h3>
    
    {error && <p className="text-red-500 text-center">{error}</p>}
    
    <div>
      <label className="block text-gray-600 mb-1">Email</label>
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your Email"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
    
    <div>
      <label className="block text-gray-600 mb-1">Password</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
    
    <div className="text-center">
      <button 
        type="submit" 
        disabled={loading}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow hover:scale-105 transform transition duration-300"
      >
        {loading ? 'Logging in...' : 'Submit'}
      </button>
    </div>
  </form>
</div>

    );
}

export default Login;
