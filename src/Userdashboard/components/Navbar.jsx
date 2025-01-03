import React from 'react'
import Userregister from './forms/Userregister'

function Navbar({showlogin,showregister,showlogout}) {
  return (
    <div>
      <div className="navSection">
            <div className="company">
                  user dashboard
            </div>
           <div className="userauth">
           <span onClick={showlogin}>
               Login / 
           </span>
           
           <span onClick={showregister}>
               Register
           </span>
           </div>
        </div>
       
    </div>
  )
}

export default Navbar
