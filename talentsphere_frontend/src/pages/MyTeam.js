import React, { useState, useEffect } from "react";
import api from "../api";

function MyTeam() {
    const [team, setTeam] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedTeam, setUpdatedTeam] = useState(null);

    useEffect(() => {
        fetchTeam();
    }, []);

    const fetchTeam = async() => {
        try {
            const response = await api.get("/my-team/"); // Assuming user’s team details API
            setTeam(response.data);
            setUpdatedTeam(response.data);
        } catch (error) {
            console.error("Error fetching team data:", error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleChange = (index, field, value) => {
        const updatedMembers = [...updatedTeam.members];
        updatedMembers[index][field] = value;
        setUpdatedTeam({...updatedTeam, members: updatedMembers });
    };

    const handleSave = async() => {
        try {
            await api.put(`teams/${team.id}/`, updatedTeam);
            setTeam(updatedTeam);
            setIsEditing(false);
        } catch (error) {
            console.error("Error updating team:", error);
        }
    };

    if (!team) return <p > Loading... < /p>;

    return ( <
            div >
            <
            h2 > My Team < /h2> <
            p > < strong > Team Name: < /strong> {team.team_name}</p >
            <
            h3 > Team Members < /h3> <
            ul > {
                team.members.map((member, index) => ( <
                        li key = { index } >
                        <
                        strong > Name: < /strong> {
                        isEditing ? ( <
                            input type = "text"
                            value = { updatedTeam.members[index].name }
                            onChange = {
                                (e) => handleChange(index, "name", e.target.value)
                            }
                            />
                        ) : (
                            member.name
                        )
                    } <
                    br / >

                    <
                    strong > Skills: < /strong> {
                    isEditing ? ( <
                        input type = "text"
                        value = { updatedTeam.members[index].skills }
                        onChange = {
                            (e) => handleChange(index, "skills", e.target.value)
                        }
                        />
                    ) : (
                        member.skills
                    )
                } <
                br / >

                <
                strong > Role: < /strong> {
                isEditing ? ( <
                    input type = "text"
                    value = { updatedTeam.members[index].role }
                    onChange = {
                        (e) => handleChange(index, "role", e.target.value)
                    }
                    />
                ) : (
                    member.role
                )
            } <
            br / >

            <
            strong > College: < /strong> {
            isEditing ? ( <
                input type = "text"
                value = { updatedTeam.members[index].college }
                onChange = {
                    (e) => handleChange(index, "college", e.target.value)
                }
                />
            ) : (
                member.college
            )
        } <
        br / >
        <
        /li>
))
} <
/ul>

{
    isEditing ? ( <
        button onClick = { handleSave } > Save Changes < /button>
    ) : ( <
        button onClick = { handleEdit } > Edit Team < /button>
    )
} <
/div>
);
}

export default MyTeam;