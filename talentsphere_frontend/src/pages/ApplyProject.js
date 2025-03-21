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
            const response = await api.get("my-team/");
            setTeam(response.data);
        } catch (error) {
            console.error("Error fetching team data:", error);
        }
    };

    const handleConfirm = async() => {
        try {
            const response = await api.post("projects/apply/", { project_id: projectId, team_id: team.id });

            // If application is successful, navigate to interview scheduling
            if (response.data.redirect_url) {
                navigate(response.data.redirect_url);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); // Show alert for duplicate application
            } else {
                console.error("Error applying for project:", error);
            }
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