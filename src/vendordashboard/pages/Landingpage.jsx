import React, { useState, useEffect } from 'react';
import { Building, Package, List, User } from 'lucide-react';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import Addfirm from '../components/forms/Addfirm';
import AddProduct from '../components/forms/AddProduct';
import Welcome from '../components/Welcome';
import Allproducts from '../components/Allproducts';
import UserDetails from '../components/UserDetails';
import Firms from '../components/Firms';

function Landingpage({ onVendorLogout}) {
  const [showlogin, setshowlogin] = useState(false);
  const [showregister, setshowregister] = useState(false);
  const [showAddFirm, setshowAddFirm] = useState(false);
  const [showAddProducts, setshowAddProducts] = useState(false);
  const [showwelcome, setshowwelcome] = useState(true);
  const [showallproducts, setshowallproducts] = useState(false);
  const [showlogout, setshowlogout] = useState(false);
  const [showUserDetails, setshowUserDetails] = useState(false);
  const [showFirms, setShowFirms] = useState(false);
  const vendorId = localStorage.getItem('vendorid');


  const showFirmsHandler = () => {
    setShowFirms(true);   
    setshowAddFirm(false);
    setshowAddProducts(false);
    setshowwelcome(false);
    setshowallproducts(false);
    setshowUserDetails(false);
    setshowlogin(false);
    setshowregister(false);
    setshowlogout(true);
  };
  const showUserDetailshandler = () => {
    setshowUserDetails(true);
    setshowlogin(false);
    setshowregister(false);
    setshowAddFirm(false);
    setshowAddProducts(false);
    setshowwelcome(false);
    setshowallproducts(false);
    setshowlogout(true);
    setShowFirms(false);
  }

  const showLoginHandler = () => {
    setshowlogin(true);
    setshowregister(false);
    setshowAddFirm(false);
    setshowAddProducts(false);
    setshowwelcome(false);
    setshowallproducts(false);
    setshowlogout(false);
    setshowUserDetails(false);
    setShowFirms(false);
  };

  const showRegisterHandler = () => {
    setshowregister(true);
    setshowlogin(false);
    setshowAddFirm(false);
    setshowAddProducts(false);
    setshowwelcome(false);
    setshowallproducts(false);
    setshowUserDetails(false);
    setshowlogout(false);
    setShowFirms(false);
  };

  const showFirmHandler = () => {
    setshowAddFirm(true);
    setshowlogin(false);
    setshowregister(false);
    setshowAddProducts(false);
    setshowwelcome(false);
    setshowallproducts(false);
    setshowlogout(true);
     setshowUserDetails(false);
     setShowFirms(false);
  };

  const showProductsHandler = () => {
    setshowAddProducts(true);
    setshowlogin(false);
    setshowregister(false);
    setshowAddFirm(false);
    setshowallproducts(false);
    setShowFirms(false);
    setshowwelcome(false);
     setshowUserDetails(false);
  };

  const showWelcomeHandler = () => {
    setshowwelcome(true);
    setshowAddProducts(false);
    setshowlogin(false);
    setshowregister(false);
    setshowAddFirm(false);
    setshowallproducts(false);
     setshowUserDetails(false);
     setShowFirms(false);
     setshowlogout(true);
  };

  const showallproductsHandler = () => {
    setshowallproducts(true);
    setshowwelcome(false);
    setshowAddProducts(false);
    setShowFirms(false);
    setshowlogin(false);
    setshowregister(false);
    setshowAddFirm(false);
     setshowUserDetails(false);
    setshowlogout(true);
  };

  const showAddProductsHandler = () => {
    setshowAddProducts(true); 
    setshowwelcome(false);
    setshowlogin(false);
    setshowregister(false);
    setshowAddFirm(false);
    setShowFirms(false);
    setshowallproducts(false);
     setshowUserDetails(false);
     setshowlogout(true);
  };
   const showLogoutHandler = () => {
    localStorage.removeItem('logintoken');
    localStorage.removeItem('firmid');
    localStorage.removeItem('firmname');
    localStorage.removeItem('vendorid');
    localStorage.removeItem('vendorname');
    setshowlogout(false);
    setshowwelcome(true); // local visual reset (won't show since parent will unmount)
    if (onVendorLogout) onVendorLogout(); // go back to Home screen
  };
  useEffect(() => {
  const logintoken = localStorage.getItem('logintoken');
  const forceLogin = localStorage.getItem('forceLogin');

  if (logintoken) {
    setshowlogout(true);
    setshowwelcome(true);
    setshowlogin(false);
    setshowregister(false);
    setshowAddFirm(false);
    setshowAddProducts(false);
    setshowallproducts(false);
    setshowUserDetails(false);
    setShowFirms(false);
    
  } else if (forceLogin) {
    // User clicked on Vendor but is not logged in
    setshowlogin(true);
    setshowwelcome(false);
  }
}, []);



  return (
   
    <section className=" min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <h1 className="text-2xl font-bold">Vendor Dashboard</h1>
        <div className="flex gap-4 text-sm">
          {showlogout ? (
            <button onClick={showLogoutHandler} className="hover:underline px-4 py-1.5 bg-red-500 text-white rounded-lg text-sm font-semibold shadow hover:bg-red-900 transition-colors">
              Logout
            </button>
          ) : (
           <div className="flex gap-3">
  <button 
    onClick={showLoginHandler} 
    className="px-4 py-1 bg-white text-purple-600 font-medium rounded-lg shadow hover:bg-purple-100 transition"
  >
    Login
  </button>
  <button 
    onClick={showRegisterHandler} 
    className="px-4 py-1 bg-white text-purple-600 font-medium rounded-lg shadow hover:bg-purple-100 transition"
  >
    Register
  </button>
  
</div>
          )}
        </div>
      </nav>

      {/* Main Section */}
      <div className="flex min-h-[calc(100vh-4rem)] w-full">
        {/* Sidebar */}
 <aside className="w-64 bg-white shadow-lg border-r p-4 overflow-y-auto sticky top-16 h-[calc(100vh-4rem)]">

  <ul className="space-y-3 flex flex-col justify-start h-full">
    {showlogout ? (
      <>
        <li
          className="p-3 flex items-center gap-3 bg-gray-100 rounded hover:bg-indigo-400 cursor-pointer transition"
          onClick={showFirmHandler}
        >
          <Building size={20} /> Add Firm
        </li>
        <li
          className="p-3 flex items-center gap-3 bg-gray-100 rounded hover:bg-indigo-400 cursor-pointer transition"
          onClick={showallproductsHandler}
        >
          <List size={20} /> All Products
        </li>
        <li
          onClick={showUserDetailshandler}
          className="p-3 flex items-center gap-3 bg-gray-100 rounded hover:bg-indigo-400 cursor-pointer transition"
        >
          <User size={20} /> User Details
        </li>
        <li
          className="p-3 flex items-center gap-3 bg-gray-100 rounded hover:bg-indigo-400 cursor-pointer transition"
          onClick={showFirmsHandler}
        >
          <Building size={20} /> My Firms
        </li>
      </>
    ) : (
      <li className="text-gray-400 p-3 text-sm">
        Please login to access options
      </li>
    )}
  </ul>
</aside>



        {/* Content Area */}
        <main className="flex-1 p-6 bg-white/70 overflow-y-auto">
          {showwelcome && <Welcome />}
          {showlogin && <Login showWelcomeHandler={showFirmsHandler} />}
          {showregister && <Register showLoginHandler={showLoginHandler} />}
       {showAddFirm && showlogout && <Addfirm showProductsHandler={showProductsHandler} />}
{showAddProducts && showlogout && <AddProduct showAddProductsHandler={showAddProductsHandler} />}
{showallproducts  && showlogout && <Allproducts  showallproductsHandler={showallproductsHandler} />}
{showUserDetails && showlogout && <UserDetails vendorId={vendorId}
    showallproducts={showallproducts} 
    onAddProduct={showAddProductsHandler} showUserDetailshandler={showUserDetailshandler} />}
{showFirms && showlogout && <Firms showFirms={showFirms} showFirmsHandler={showFirmsHandler} />}

        </main>
      </div>
    </section>
  );
}

export default Landingpage;
