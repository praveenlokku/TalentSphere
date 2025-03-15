import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function StudentDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const response = await api.get("user-profile/");
                setUser(response.data);
            } catch (error) {
                navigate("/login");
            }
        };

        fetchUser();
    }, [navigate]);

    return ( <
            div style = {
                { textAlign: "center", padding: "50px" }
            } >
            <
            h2 > Student Dashboard < /h2> {
            user ? ( <
                >
                <
                p > Welcome, { user.username }! < /p> <
                button onClick = {
                    () => navigate('/create-team')
                } > Create a Team < /button>  <
                button onClick = {
                    () => navigate("/available-projects")
                } > Find Projects < /button> < / >

            ) : ( <
                p > Loading... < /p>
            )
        } <
        /div>
);
}

export default StudentDashboard;