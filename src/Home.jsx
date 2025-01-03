import React, { useState } from 'react';
import Landinguserpage from './Userdashboard/pages/Landinguserpage';
import Landingpage from './vendordashboard/pages/Landingpage';

function Home() {
    const [user, setUser] = useState(false);
    const [vendor, setVendor] = useState(false);
    const [home,sethome] = useState(true);

    const handleUserClick = () => {
        setUser(true);
        setVendor(false);
        sethome(false); // Reset vendor state when user is selected
    };

    const handleVendorClick = () => {
        setVendor(true);
        setUser(false);
        sethome(false); // Reset user state when vendor is selected
    };

    return (
        <div>
            {home && <>
                <h2>Welcome to Suby!!!!!!!!!!</h2>

                <button onClick={handleUserClick}>User</button>
                <button onClick={handleVendorClick}>Vendor</button>
            </>}

            {user && <Landinguserpage />}
            {vendor && <Landingpage />}
        </div>
    );
}

export default Home;
