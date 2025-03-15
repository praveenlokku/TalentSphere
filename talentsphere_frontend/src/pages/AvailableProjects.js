import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AvailableProjects() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await api.get("projects/");
                setProjects(response.data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        }
        fetchProjects();
    }, []);

    return ( <
        div style = {
            { textAlign: "center", padding: "50px" } } >
        <
        h2 > Available Projects < /h2> {
            projects.length === 0 ? ( <
                p > No projects available. < /p>
            ) : (
                projects.map((project) => ( <
                    div key = { project.id }
                    style = {
                        { border: "1px solid gray", padding: "10px", margin: "10px" } } >
                    <
                    h3 > { project.project_name } < /h3> <
                    p > < strong > Description: < /strong> {project.description}</p >
                    <
                    p > < strong > Skills Required: < /strong> {project.skills_required}</p >
                    <
                    p > < strong > Deadline: < /strong> {project.deadline}</p >
                    <
                    p > < strong > Credits: < /strong> {project.credits}</p >
                    <
                    button onClick = {
                        () => navigate(`/team-details/${project.id}`) } > Apply < /button> <
                    /div>
                ))
            )
        } <
        /div>
    );
}

export default AvailableProjects;