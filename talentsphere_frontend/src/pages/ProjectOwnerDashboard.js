import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function ProjectOwnerDashboard() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await api.get("projects/post-by-owner/");
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }
        fetchProjects();
    }, []);

    const handleLogout = async() => {
        try {
            await api.post("logout/"); // Backend logout API
            localStorage.removeItem("token"); // Clear token from storage
            navigate("/login"); // Redirect to login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return ( <
        div style = {
            { textAlign: "center", padding: "50px" } } >
        <
        div style = {
            { display: "flex", justifyContent: "space-between", alignItems: "center" } } >
        <
        h2 > Project Owner Dashboard < /h2> <
        button onClick = { handleLogout }
        style = {
            { backgroundColor: "red", color: "white" } } > Logout < /button> <
        /div>

        <
        button onClick = {
            () => navigate("/projects-and-applications") } >
        View Projects and Applications <
        /button> <
        button onClick = {
            () => navigate("/post-project") } >
        Post a New Project <
        /button>

        <
        h3 > Posted Projects < /h3> {
            projects.length === 0 ? ( <
                p > No projects posted yet. < /p>
            ) : (
                projects.map((project) => ( <
                    div key = { project.id }
                    style = {
                        { border: "1px solid gray", padding: "10px", margin: "10px" } } >
                    <
                    p > < strong > Project Name: < /strong> {project.project_name}</p >
                    <
                    p > < strong > Description: < /strong> {project.description}</p >
                    <
                    p > < strong > Deadline: < /strong> {project.deadline}</p >
                    <
                    p > < strong > Credits: < /strong> {project.credits}</p >

                    <
                    h4 > Applications Received < /h4> {
                        project.applications && project.applications.length > 0 ? (
                            project.applications.map((app) => ( <
                                div key = { app.id }
                                style = {
                                    { border: "1px dashed gray", padding: "10px", margin: "5px" } } >
                                <
                                p > < strong > Team Name: < /strong> {app.team_name}</p >
                                <
                                p > < strong > Applied Date: < /strong> {app.applied_date}</p >
                                <
                                p > < strong > Interview Status: < /strong> {app.interview_status}</p >
                                <
                                /div>
                            ))
                        ) : ( <
                            p > No applications yet. < /p>
                        )
                    } <
                    /div>
                ))
            )
        } <
        /div>
    );
}

export default ProjectOwnerDashboard;