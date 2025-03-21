import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function StudentDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [interviews, setInterviews] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [credits, setCredits] = useState(0);

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const response = await api.get("user-profile/");
                setUser(response.data);
            } catch (error) {
                navigate("/login");
            }
        };

        const fetchDashboardData = async() => {
            try {
                const response = await api.get("students/dashboard/");
                setInterviews(response.data.interviews);
                setNotifications(response.data.notifications);
                setCredits(response.data.credits);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchUser();
        fetchDashboardData();
    }, [navigate]);

    return ( <
        div style = {
            { textAlign: "center", padding: "50px" } } >
        <
        h2 > Student Dashboard < /h2>

        {
            user ? ( <
                >
                <
                p > Welcome, { user.username }! < /p>

                <
                h3 > Credits: { credits }💰 < /h3>

                <
                h3 > Scheduled Interviews < /h3> {
                    interviews.length > 0 ? ( <
                        ul > {
                            interviews.map((interview) => ( <
                                li key = { interview.id } > { interview.project_name } - { interview.date }
                                at { interview.time } <
                                /li>
                            ))
                        } <
                        /ul>
                    ) : ( <
                        p > No upcoming interviews. < /p>
                    )
                }

                <
                h3 > Notifications🔔 < /h3> {
                    notifications.length > 0 ? ( <
                        ul > {
                            notifications.map((notif) => ( <
                                li key = { notif.id } > { notif.message } < /li>
                            ))
                        } <
                        /ul>
                    ) : ( <
                        p > No new notifications. < /p>
                    )
                }

                <
                button onClick = {
                    () => navigate('/create-team') } > Create a Team < /button> <
                button onClick = {
                    () => navigate("/available-projects") } > Find Projects < /button> <
                button onClick = {
                    () => navigate("/prepare-interview") } > Practice Interview < /button> <
                button onClick = {
                    () => navigate("/my-team") } > My Team < /button> <
                />
            ) : ( <
                p > Loading... < /p>
            )
        } <
        /div>
    );
}

export default StudentDashboard;