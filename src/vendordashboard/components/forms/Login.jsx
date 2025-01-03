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
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
           
            if (response.ok) { 
                console.log(data);
                localStorage.setItem('logintoken', data.token);
                setEmail('');
                setPassword('');
                showWelcomeHandler();  // Trigger state update for welcome page
            } else {
                setError(data.message || 'Invalid email or password');
            }

            // Fetch vendor details after successful login
            const vendorid = data.vendorid;
            const vendorresponse = await fetch(`${APIpath}/vendor/getvendorbyid/${vendorid}`);
            const vendordata = await vendorresponse.json();

            console.log(vendordata);
            if(vendorresponse.ok) {
                const firmid = vendordata.vendorfirmid;
                const vendorfirmname = vendordata.vendor.firm[0].firmname;
                console.log(firmid);
                localStorage.setItem('firmid', firmid);
                localStorage.setItem('firmname', vendorfirmname);

                // No need to reload the page, handle updates via state or navigation
                showWelcomeHandler();  // Update the page view accordingly
            }
        } catch (err) {
            console.error('Login failed', err);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="LoginSection">
            <form className="authform" onSubmit={handleSubmit}>
                <h3>Vendor Login</h3>
                {error && <p className="error">{error}</p>}
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your Email"
                />
                <br />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
                <br />
                <div className="btnSubmit">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Submit'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;
