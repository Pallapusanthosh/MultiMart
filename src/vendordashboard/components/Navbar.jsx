import React from 'react'

function Navbar({showLoginHandler,showRegisterHandler,showLogout,showLogoutHandler}) {

      const firmname = localStorage.getItem('firmname');

      const handlelogout = () =>{
            if(confirm("are you sure you want to logout?")){
                  showLogoutHandler();
      }
}
  return (
    <div>
          <div className="navSection">
            <div className="company">
                  vendor dashboard
            </div>
            <div className="navbarfirname">
                  {!firmname ?   'Welcome to vendor dashboard' : <>Firmname : {firmname}</>
                  }
                 
            </div>
            <div className="userauth">


            {
               !showLogout  ? 
            <>
                <span onClick={showLoginHandler}>
                      Login /
                </span>
                <span onClick={showRegisterHandler}>
                      Register
                </span>
            </> : 
              <span onClick={handlelogout}>
                      Logout
              </span>

            }  
            </div>
          </div>
    </div>
  )
}

export default Navbar
