import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("student");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async() => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
                username,
                email,
                password,
                user_type: userType,
            });

            alert("Signup successful! Please login.");
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                setError(error.response.data.error);
            } else {
                setError("Signup failed");
            }
        }
    };

    return ( <
        div style = {
            { textAlign: "center", padding: "50px" }
        } >
        <
        h2 > Signup < /h2> {
        error && < p style = {
            { color: "red" }
        } > { error } < /p>} <
        input type = "text"
        placeholder = "Username"
        value = { username }
        onChange = {
            (e) => setUsername(e.target.value)
        }
        /> <
        input type = "email"
        placeholder = "Email"
        value = { email }
        onChange = {
            (e) => setEmail(e.target.value)
        }
        /> <
        input type = "password"
        placeholder = "Password"
        value = { password }
        onChange = {
            (e) => setPassword(e.target.value)
        }
        /> <
        select value = { userType }
        onChange = {
            (e) => setUserType(e.target.value)
        } >
        <
        option value = "student" > Student < /option> <
        option value = "project_owner" > Project Owner < /option> < /
        select > <
        button onClick = { handleSignup } > Signup < /button> < /
        div >
    );
}

export default Signup;