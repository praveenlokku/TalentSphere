import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
    const [step, setStep] = useState(1); // Step 1: Choose user type, Step 2: Fill form
    const [userType, setUserType] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        university: "",
        major: "",
        graduationYear: "",
        organization: "",
        position: "",
        industry: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleUserTypeSelect = (type) => {
        setUserType(type);
        setStep(2);
    };

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async() => {
        try {
            const payload = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                user_type: userType,
                ...(userType === "student" ?
                    {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        university: formData.university,
                        major: formData.major,
                        graduation_year: formData.graduationYear,
                    } :
                    {
                        first_name: formData.firstName,
                        last_name: formData.lastName,
                        organization: formData.organization,
                        position: formData.position,
                        industry: formData.industry,
                    }),
            };

            await axios.post("https://talentsphere-lbap.onrender.com/api/signup/", payload);
            alert("Signup successful! Please login.");
            navigate("/login");
        } catch (error) {
            setError("Signup failed. Please try again.");
        }
    };

    return ( <
        div style = {
            { textAlign: "center", padding: "40px" } } > {
            step === 1 ? ( <
                >
                <
                h2 > Sign Up
                for Project Connect < /h2> <
                p > Choose your account type to get started < /p> <
                div style = {
                    { display: "flex", justifyContent: "center", gap: "30px", marginTop: "30px" } } >
                <
                div style = {
                    { border: "1px solid #ccc", padding: "30px", borderRadius: "10px", width: "250px" } } >
                <
                h3 > I am a Student < /h3> <
                ul style = {
                    { textAlign: "left" } } >
                <
                li > Work on real - world projects < /li> <
                li > Build your portfolio < /li> <
                li > Join or create teams < /li> <
                li > Earn credits and experience < /li> <
                /ul> <
                button onClick = {
                    () => handleUserTypeSelect("student") } > Sign Up as Student < /button> <
                /div>

                <
                div style = {
                    { border: "1px solid #ccc", padding: "30px", borderRadius: "10px", width: "250px" } } >
                <
                h3 > I am a Project Owner < /h3> <
                ul style = {
                    { textAlign: "left" } } >
                <
                li > Post industrial projects < /li> <
                li > Define milestones < /li> <
                li > Review student applications < /li> <
                li > Find talent < /li> <
                /ul> <
                button onClick = {
                    () => handleUserTypeSelect("project_owner") } > Sign Up as Project Owner < /button> <
                /div> <
                /div> <
                />
            ) : ( <
                    >
                    <
                    h2 > { userType === "student" ? "Student Registration" : "Project Owner Registration" } < /h2> {
                        error && < p style = {
                                { color: "red" } } > { error } < /p>} <
                            form style = {
                                { display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", marginTop: "20px" } } >
                            <
                            input name = "firstName"
                        placeholder = "First Name *"
                        value = { formData.firstName }
                        onChange = { handleChange }
                        required / >
                            <
                            input name = "lastName"
                        placeholder = "Last Name *"
                        value = { formData.lastName }
                        onChange = { handleChange }
                        required / >
                            <
                            input name = "username"
                        placeholder = "Username *"
                        value = { formData.username }
                        onChange = { handleChange }
                        required / >
                            <
                            input name = "email"
                        placeholder = "Email Address *"
                        type = "email"
                        value = { formData.email }
                        onChange = { handleChange }
                        required / >
                            <
                            input name = "password"
                        placeholder = "Password *"
                        type = "password"
                        value = { formData.password }
                        onChange = { handleChange }
                        required / >

                            {
                                userType === "student" ? ( <
                                    >
                                    <
                                    input name = "university"
                                    placeholder = "University"
                                    value = { formData.university }
                                    onChange = { handleChange }
                                    /> <
                                    input name = "major"
                                    placeholder = "Major"
                                    value = { formData.major }
                                    onChange = { handleChange }
                                    /> <
                                    input name = "graduationYear"
                                    placeholder = "Graduation Year"
                                    value = { formData.graduationYear }
                                    onChange = { handleChange }
                                    /> <
                                    />
                                ) : ( <
                                    >
                                    <
                                    input name = "organization"
                                    placeholder = "Organization/Company"
                                    value = { formData.organization }
                                    onChange = { handleChange }
                                    /> <
                                    input name = "position"
                                    placeholder = "Position"
                                    value = { formData.position }
                                    onChange = { handleChange }
                                    /> <
                                    input name = "industry"
                                    placeholder = "Industry"
                                    value = { formData.industry }
                                    onChange = { handleChange }
                                    /> <
                                    />
                                )
                            }

                        <
                        button type = "button"
                        onClick = { handleSignup } >
                            Register <
                            /button> <
                            /form> <
                            p style = {
                                { marginTop: "10px" } } >
                            Already have an account ? < a href = "/login" > Sign in < /a> <
                            /p> <
                            />
                    )
                } <
                /div>
        );
    }

    export default Signup;
