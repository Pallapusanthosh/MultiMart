import React from 'react'

function Navbar({showLoginHandler,showRegisterHandler}) {
  return (
    <div>
          <div className="navSection">
            <div className="company">
                  vendor dashboard
            </div>
            <div className="userauth">
                <span onClick={showLoginHandler}>
                      Login /
                </span>
                <span onClick={showRegisterHandler}>
                      Register
                </span>
            </div>
          </div>
    </div>
  )
}

export default Navbar
