import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Userlogin from '../components/forms/Userlogin';
import Userregister from '../components/forms/Userregister';

function Landinguserpage() {
   const[login,setlogin] = useState(false);
     const[register,setregister] = useState(false);
     const[logout,setlogout] = useState(true);

     const showlogin =()=>{
            setlogin(true);
            setlogout(false);
            setregister(false);
     }
     const showregister =()=>{
        setlogin(false);
        setlogout(false);
        setregister(true);
     }
 const showlogout =()=>{
    setlogin(false);
    setlogout(true);
    setregister(false);
}
  return (
    <div>
      <Navbar showlogin={showlogin} showlogout = {showlogout} showregister = {showregister}/>

      {login && <Userlogin/>}
      {register && <Userregister showlogin={showlogin}/>}
      {/* {logout && <h1>logout</h1>} */}
    </div>
  )
}

export default Landinguserpage
