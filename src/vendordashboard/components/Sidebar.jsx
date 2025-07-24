import React from 'react';

export default function Sidebar({ showFirmHandler, showProductsHandler, showallproductsHandler, showLoginHandler  , showUserDetails  , showFirmsHandler}) {
   
  const frimname = localStorage.getItem('firmname');

  return (
    <div className='sidebarsection'>
      <ul>
       
        {
          !frimname ?  <li onClick={showFirmHandler}>Add firm</li> : <></>
        }
        {/* <li onClick={showProductsHandler}>Add Products</li> */}
        <li onClick={showallproductsHandler}>All products</li>
        <li onClick={showUserDetails}>User details </li>
        <li onClick={showFirmsHandler}>My Firms</li>
       
      </ul>
    </div>
  );
}