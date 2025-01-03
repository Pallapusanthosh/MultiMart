import React, { useState } from 'react'
import { APIpath } from '../../helpers/Api_path';

function Userregister({showlogin}) {

    const [username,setusername] = useState('');
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');

    const handlesubmit = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch(`${APIpath}/user/register`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({username,email,password})
            })
            if(response.ok){
                const data = await response.json();
                alert("user registered succesfully");
                setusername("");
                setemail("");
                setpassword("");
                showlogin();

            }
        } catch (error) {
            console.log("user registration failed",error);
            alert("Registration failed successfully");
        }
    }

    return (
        <div className="LoginSection">
            <form className="authform" style={{marginTop:"50px"}} onSubmit={handlesubmit} >
                <h3>User Register</h3>
                <label>Username</label>
                <input 
                   type='text'
                   name='username'
                   placeholder='Enter your username'
                   value={username}
                   onChange={(e)=>setusername(e.target.value)}
                ></input>
                <br />
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
                />
                <br />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e)=>setpassword(e.target.value)}
                />
                <br />
                <div className="btnSubmit">
                    <button type="submit" >
                        submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Userregister;
