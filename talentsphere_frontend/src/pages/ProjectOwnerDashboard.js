import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function ProjectOwnerDashboard() {
    const [projects, setProjects] = useState([]);
    const [applications, setApplications] = useState([]);
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

    useEffect(() => {
        async function fetchApplications() {
            try {
                const response = await api.get("project-applications/");
                setApplications(response.data);
            } catch (error) {
                console.error("Error fetching applications:", error);
            }
        }
        fetchApplications();
    }, []);

    return ( <
        div style = {
            { textAlign: "center", padding: "50px" } } >
        <
        h2 > Project Owner Dashboard < /h2>

        <
        button onClick = {
            () => navigate("/projects-and-applications") } > View Projects and Applications < /button>

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
                    /div>
                ))
            )
        }

        <
        h3 > Applications Received < /h3> {
            applications.length === 0 ? ( <
                p > No applications yet. < /p>
            ) : (
                applications.map((app) => ( <
                    div key = { app.id }
                    style = {
                        { border: "1px solid gray", padding: "10px", margin: "10px" } } >
                    <
                    p > < strong > Student Name: < /strong> {app.student_name}</p >
                    <
                    p > < strong > Project Name: < /strong> {app.project_name}</p >
                    <
                    p > < strong > Interview Date: < /strong> {app.date}</p >
                    <
                    p > < strong > Interview Time: < /strong> {app.time}</p >
                    <
                    /div>
                ))
            )
        } <
        /div>
    );
}

export default ProjectOwnerDashboard;