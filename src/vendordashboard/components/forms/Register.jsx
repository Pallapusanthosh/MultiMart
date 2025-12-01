import React, { useState } from 'react';
import { APIpath } from '../../helpers/Apipath';

function Register({ showLoginHandler }) {
    const [username, setusername] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);
    const [phonenumber , setphonenumber] = useState('');
    const api = APIpath;

    const handlesubmit = async (e) => {
        e.preventDefault();
        setloading(true);
        seterror('');

        try {
            const response = await fetch(`${api}/vendor/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password ,phonenumber}),
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data);
                alert('Vendor registered successfully');
                setusername('');
                setemail('');
                setpassword('');
                setphonenumber('');
                showLoginHandler();
            } else {
                seterror(data.message || 'Registration failed');
            }
        } catch (err) {
            console.log('registration failed', err);
            seterror('An error occurred. Please try again.');
        } finally {
            setloading(false);
        }
    };

    return (
       <div className="flex justify-center items-center min-v-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4 ">
  <form 
    className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5 mx-w-md "
    onSubmit={handlesubmit}
  >
    <h3 className="text-2xl font-bold text-center text-purple-600 mb-6">Vendor Registration</h3>
    
    <div>
      <label className="block text-gray-600 mb-1">Username</label>
      <input 
        type="text" 
        name="username" 
        value={username} 
        onChange={(e)=>setusername(e.target.value)}
        placeholder="Enter your name"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
    
    <div>
      <label className="block text-gray-600 mb-1">Email</label>
      <input 
        type="email" 
        name="email" 
        value={email} 
        onChange={(e)=>setemail(e.target.value)}
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
        onChange={(e)=>setpassword(e.target.value)}
        placeholder="Enter your password"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
    <div>
      <label className="block text-gray-600 mb-1">Password</label>
      <input 
        type="number" 
        name="phonenumber" 
        value={phonenumber} 
        onChange={(e)=>setphonenumber(e.target.value)}
        placeholder="Enter your phone number"
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
    </div>
    
    <div className="text-center">
      <button 
        type="submit" 
        disabled={loading}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg shadow hover:scale-105 transform transition duration-300"
      >
        {loading ?  "Submitting":"Submit"}
      </button>
    </div>
  </form>
</div>

    );
}

export default Register;
