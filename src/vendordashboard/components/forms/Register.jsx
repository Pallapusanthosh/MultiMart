import React, { useState } from 'react'
import { APIpath } from '../../helpers/Apipath';

function Register({showLoginHandler}) {

  const [username,setusername] = useState("");
  const [email,setemail] = useState("");
  const [password,setpassword] = useState("");
  const [error,seterror] = useState("");
  const [loading,setloading] = useState(true);
  const api = APIpath;

  const handlesubmit = async (e)=>{
     e.preventDefault();
      try {
        const  response = await fetch(`${api}/vendor/register`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({username,email,password})
      })
      const data = await response.json();
      if(response.ok){
        console.log(data)
        alert("vendor registered succesfully");
        setusername("");
        setemail("");
        setpassword("");
        showLoginHandler();
      }
      } catch (error) {
        console.log("registration failed",error);
        alert("Registration failed successfully");
      }
  }
  return (

    <div className='registerSection'>
      <form className='authform' onSubmit={handlesubmit}>
      <h3>vendor Registeration</h3>
      <label>Usernmae</label>
      <input type='text' name='username' value={username} onChange={(e)=>setusername(e.target.value)} placeholder='Enter your name'></input>
        <label>Email</label>
        <input type='text' name='email' value={email} onChange={(e)=>setemail(e.target.value)}placeholder='Enter your Email'></input>
        <label>password</label>
        <input type='text' name='password' value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='Enter your password'></input>
        <div className="btnSubmit">
            <button type='submit'>
                Submit
            </button>
        </div>
      </form>
    </div>
  )
}

export default Register
