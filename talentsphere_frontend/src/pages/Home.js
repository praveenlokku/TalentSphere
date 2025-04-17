import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (<Helmet>
        <title>Stujya | Home</title>
      </Helmet> <
        div style = {
            { textAlign: "center", padding: "50px" }
        } >
        <
        h1 > Welcome to TalentSphere < /h1> <
        p > Connect students with industrial projects. < /p> <
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
