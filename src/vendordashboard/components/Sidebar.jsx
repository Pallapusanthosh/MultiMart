import React from 'react';

export default function Sidebar({ showFirmHandler, showProductsHandler, showallproductsHandler, showLoginHandler }) {
   
  const frimname = localStorage.getItem('firmname');

  return (
    <div className='sidebarsection'>
      <ul>
       
        {
          !frimname ?  <li onClick={showFirmHandler}>Add firm</li> : <></>
        }
        <li onClick={showProductsHandler}>Add Products</li>
        <li onClick={showallproductsHandler}>All products</li>
        <li>User details</li>
       
      </ul>
    </div>
  );
}