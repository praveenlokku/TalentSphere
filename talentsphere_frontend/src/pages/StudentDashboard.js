import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function StudentDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [interviews, setInterviews] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [credits, setCredits] = useState(0);
    const [projects, setProjects] = useState([]);

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
                setProjects(response.data.projects);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchUser();
        fetchDashboardData();
    }, [navigate]);

    const handleLogout = async() => {
        try {
            await api.post("logout/"); // Backend logout API
            localStorage.removeItem("token"); // Remove token from local storage
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const markProjectCompleted = async(projectId) => {
        try {
            await api.post(`projects/${projectId}/complete/`);
            alert("Project marked as completed! Credits awarded.");
            setCredits((prev) => prev + 10);
        } catch (error) {
            console.error("Error marking project as completed:", error);
        }
    };

    return ( <
        div style = {
            { textAlign: "center", padding: "50px" }
        } >
        <
        div style = {
            { display: "flex", justifyContent: "space-between" }
        } >
        <
        h2 > Student Dashboard < /h2> <
        button onClick = { handleLogout }
        style = {
            { backgroundColor: "red", color: "white" }
        } > Logout < /button> < /
        div >

        {
            user ? ( <
                >
                <
                p > Welcome, { user.username }!🎉 < /p> <
                h3 > Credits: { credits }💰 < /h3>

                <
                h3 > Scheduled Interviews📅 < /h3> {
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
        h3 > Ongoing Projects🚀 < /h3> {
        projects.length > 0 ? (
            projects.map((project) => ( <
                div key = { project.id }
                className = "project-card" >
                <
                h4 > { project.name } < /h4> <
                p > Deadline: { project.deadline } < /p> <
                button onClick = {
                    () => markProjectCompleted(project.id)
                } > Mark as Completed < /button> < /
                div >
            ))
        ) : ( <
            p > No active projects. < /p>
        )
    }

    <
    h3 > Quick Access⚡ < /h3> <
    a href = "https://github.com/"
    target = "_blank"
    rel = "noopener noreferrer" >
        <
        button > Go to GitHub < /button> < /
    a > <
        a href = "https://vscode.dev/"
    target = "_blank"
    rel = "noopener noreferrer" >
        <
        button > Open VS Code < /button> < /
    a >

        <
        br / > < br / >
        <
        button onClick = {
            () => navigate('/create-team')
        } > Create a Team < /button> <
    button onClick = {
        () => navigate("/available-projects")
    } > Find Projects < /button> <
    button onClick = {
        () => navigate("/schedule-interview")
    } > Practice Interview < /button> <
    button onClick = {
        () => navigate("/my-team")
    } > My Team < /button><
    button onClick = {
        () => navigate("/myprojecct")
    } > Ats Score < /button> < / >
): ( <
    p > Loading... < /p>
)
} <
/div>
);
}

export default StudentDashboard;