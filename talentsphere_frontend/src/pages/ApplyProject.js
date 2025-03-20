import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function ApplyProject() {
    const { projectId } = useParams();
    const [team, setTeam] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async() => {
        try {
            const response = await api.get("teams/my-team/");
            setTeam(response.data);
        } catch (error) {
            console.error("Error fetching team data:", error);
        }
    };

    const handleConfirm = async() => {
        try {
            if (!team || !team.id) {
                alert("Error: Team information is missing or not loaded!");
                return;
            }

            const response = await api.post("projects/apply/", {
                project_id: projectId,
                team_id: team.id,
            });

            if (response.data.redirect_url) {
                navigate(response.data.redirect_url); // ✅ Redirects to Interview Scheduling Page
            } else {
                alert("Application submitted successfully!");
            }
        } catch (error) {
            console.error(
                "Error applying for project:",
                error.response && error.response.data ? error.response.data : error.message
            );
        }
    };

    if (!team) return <p > Loading... < /p>;

    return ( <
        div >
        <
        h2 > Confirm Your Team
        for Application < /h2> <
        p > < strong > Team Name: < /strong> {team.team_name}</p >
        <
        h3 > Team Members: < /h3> <
        ul > {
            team.members.map((member) => ( <
                li key = { member.id } >
                <
                strong > Name: < /strong> {member.name}, <strong>Skills:</strong > { member.skills } <
                /li>
            ))
        } <
        /ul> <
        button onClick = { handleConfirm } > Confirm and Proceed < /button> < /
        div >
    );
}

export default ApplyProject;