import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return ( <
        div style = {
            { textAlign: "center", padding: "50px" }
        } ><title>Stujya | Home</title>
        <
        h1 > Welcome to Stujya < /h1> <
        p > Brisging the Gap between the students and the Industry. < /p> <
        button onClick = {
            () => navigate("/login")
        } > Login < /button> <
        button onClick = {
            () => navigate("/signup")
        } > Signup < /button> < /
        div >
    );
}

export default Home;
