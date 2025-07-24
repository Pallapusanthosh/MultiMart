import React from 'react'

function Welcome() {
  const [vendorname, setVendorname] = React.useState('');

  React.useEffect(() => {
    setVendorname(localStorage.getItem('vendorname'));
  }, [localStorage.getItem('vendorname') 

  ]);
 

  return (
    <div>
      {!vendorname  ? (
        <>
          <h2 className="text-center text-gray-500 animate-pulse">
            Welcome to Zwiggy! Please log in to continue.
          </h2>
        </>
      ):
      ( 
     <> <h2>Welcome mr {vendorname}</h2></>
    )}
    </div>
  );
}

export default Welcome