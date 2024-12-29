import React from 'react';

export default function Sidebar({ showFirmHandler, showProductsHandler, showallproductsHandler, showLoginHandler }) {
  const handlelogout = () => {
    if(confirm("Are you sure you want to logout?")){
      alert("user logged out");
      localStorage.removeItem('logintoken'); 
      showLoginHandler();
    }
    
    
  };

  return (
    <div className='sidebarsection'>
      <ul>
        <li onClick={showFirmHandler}>Add firm</li>
        <li onClick={showProductsHandler}>Add Products</li>
        <li onClick={showallproductsHandler}>All products</li>
        <li>User details</li>
        <li onClick={handlelogout}>Logout</li>
      </ul>
    </div>
  );
}