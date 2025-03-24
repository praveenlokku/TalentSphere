import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function AvailableProjects() {
    const [projects, setProjects] = useState([]);
    const [filters, setFilters] = useState({
        skills: "",
        minCredits: "",
        maxCredits: "",
        deadline: "",
    });
    const [showFilters, setShowFilters] = useState(false); // Toggle filter section
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllProjects(); // Load all projects initially
    }, []);

    const fetchAllProjects = async() => {
        try {
            const response = await api.get("projects/"); // Fetch all projects
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    const fetchFilteredProjects = async() => {
        try {
            const response = await api.get("projects/search/", { params: filters });
            setProjects(response.data);
        } catch (error) {
            console.error("Error fetching filtered projects:", error);
        }
    };

    const handleApply = (projectId) => {
        navigate(`/apply/${projectId}`);
    };

    return ( <
        div >
        <
        h2 > Available Projects < /h2>

        { /* Filter Toggle Button */ } <
        button onClick = {
            () => setShowFilters(!showFilters) } > { showFilters ? "Hide Filters" : "Show Filters" } <
        /button>

        { /* Filter Form (Shown Only When "Show Filters" is Clicked) */ } {
            showFilters && ( <
                div >
                <
                h3 > Filter Projects < /h3> <
                label > Skills: < /label> <
                input type = "text"
                placeholder = "Python, React..."
                onChange = {
                    (e) => setFilters({...filters, skills: e.target.value }) }
                />

                <
                label > Min Credits: < /label> <
                input type = "number"
                onChange = {
                    (e) => setFilters({...filters, minCredits: e.target.value }) }
                />

                <
                label > Max Credits: < /label> <
                input type = "number"
                onChange = {
                    (e) => setFilters({...filters, maxCredits: e.target.value }) }
                />

                <
                label > Deadline Before: < /label> <
                input type = "date"
                onChange = {
                    (e) => setFilters({...filters, deadline: e.target.value }) }
                />

                <
                button onClick = { fetchFilteredProjects } > Apply Filters < /button> <
                /div>
            )
        }

        { /* Display All Projects (Filtered & Unfiltered) */ } <
        ul > {
            projects.length > 0 ? (
                projects.map((project) => ( <
                    li key = { project.id } >
                    <
                    h3 > { project.name } < /h3> <
                    p > { project.description } < /p> <
                    p > < strong > Deadline: < /strong> {project.deadline}</p >
                    <
                    p > < strong > Credits: < /strong> {project.credits}</p >
                    <
                    button onClick = {
                        () => handleApply(project.id) } > Apply < /button> <
                    /li>
                ))
            ) : ( <
                p > Loading projects... < /p>
            )
        } <
        /ul> <
        /div>
    );
}

export default AvailableProjects;