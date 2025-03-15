import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";

function TeamDetails() {
    const { projectId } = useParams();
    const [team, setTeam] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchTeam() {
            try {
                const response = await api.get("team-details/");
                setTeam(response.data);
            } catch (error) {
                console.error("Error fetching team details:", error);
            }
        }
        fetchTeam();
    }, []);

    return ( <
        div style = {
            { textAlign: "center", padding: "50px" } } >
        <
        h2 > Your Team < /h2> {
            team ? ( <
                div >
                <
                h3 > Team Name: { team.team_name } < /h3> <
                h4 > Members: < /h4> <
                ul > {
                    team.members.map((member, index) => ( <
                        li key = { index } > { member.name } - { member.role }({ member.skills.join(", ") }) <
                        /li>
                    ))
                } <
                /ul> <
                button onClick = {
                    () => navigate(`/schedule-interview/${projectId}`) } >
                Proceed to Schedule Interview <
                /button> <
                /div>
            ) : ( <
                p > Loading team details... < /p>
            )
        } <
        /div>
    );
}

export default TeamDetails;