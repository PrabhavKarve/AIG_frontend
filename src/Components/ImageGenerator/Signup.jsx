import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import api_url from "../endpoint"


function SignUp() {
    const history = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert( confirmPassword + " " + password);
            return;
        }

        try {
            console.log("sent signup req from client")
            await axios.post(api_url + "/signup", {
                email, password
            },  {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(res => {
                if (res.data === "exist") {
                    console.log("server responded")
                    alert("User already exists");
                } else if (res.data === "notexist") {
                    console.log("server responded")
                    history("/home", { state: { id: email } });
                }
            })
            .catch(e => {
                alert("Error in signup");
                console.log(e);
            });

        } catch (e) {
            console.log(e);
        }

    }


    return (
        <div className="login_container">

            <h1 className="header2">Signup</h1>

            <form action="POST" className='login_box'>
                <input className='search_input' type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  />
                <input className='search_input' type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" />
                {/*<input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="confirm password" />*/}
                <input className='search_input' type="password" onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder="Confirm Password" />
                <input className="generate_btn" type="submit" onClick={submit} />

            </form>

            <br />
            <p>OR</p>
            <br />

            <Link to="/">Login Page</Link>

        </div>
    )
}

export default SignUp