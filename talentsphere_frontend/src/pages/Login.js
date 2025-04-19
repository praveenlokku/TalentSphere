import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async() => {
        try {
            const response = await axios.post("https://talentsphere-lbap.onrender.com/api/login/", {
                email,
                password,
            });
            // IMPORTANT: Save the 'access' token here
            const { access, user_type } = response.data;
            localStorage.setItem("token", access);

            // Redirect based on user type
            if (user_type === "student") {
                navigate("/student-dashboard");
            } else {
                navigate("/project-owner-dashboard");
            }
        } catch (error) {
            setError("Invalid credentials. Please try again.");
        }
    };

    return ( <
        div style = {
            { textAlign: "center", padding: "50px" } } >
        <
        h2 > Login < /h2> {
            error && < p style = {
                    { color: "red" } } > { error } < /p>} <
                input
            type = "email"
            placeholder = "UserName"
            value = { email }
            onChange = {
                (e) => setEmail(e.target.value) }
            /> <
            input
            type = "password"
            placeholder = "Password"
            value = { password }
            onChange = {
                (e) => setPassword(e.target.value) }
            /> <
            button onClick = { handleLogin } > Login < /button> <
                button onClick = {
                    () => navigate('/signup') } > Register < /button> <
                /div>
        );
    }

    export default Login;
