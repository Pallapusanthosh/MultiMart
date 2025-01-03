import React from 'react'

function Userlogin() {
    return (
        <div className="LoginSection">
            <form className="authform" style={{marginTop:"50px"}} >
                <h3>User Login</h3>
                <label>Email</label>
                <input
                    type="text"
                    name="email"
                    placeholder="Enter your Email"
                />
                <br />
                <label>Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
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

export default Userlogin;
