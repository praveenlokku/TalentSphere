import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AvailableProjects() {
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async() => {
        try {
            const response = await api.get("projects/");
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const handleApply = (projectId) => {
        navigate(`/apply/${projectId}`);
    };


    return ( <
        div >
        <
        h2 > Available Projects < /h2> <
        ul > {
            projects.map((project) => ( <
                li key = { project.id } >
                <
                h3 > { project.name } < /h3> <
                p > { project.description } < /p> <
                button onClick = {
                    () => handleApply(project.id)
                } > Apply < /button> < /
                li >
            ))
        } <
        /ul> < /
        div >
    );
}

export default AvailableProjects;