import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function PostProject() {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [skillsRequired, setSkillsRequired] = useState('');
    const [teamStrength, setTeamStrength] = useState('');
    const [credits, setCredits] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handlePostProject = async() => {

        const formattedDeadline = new Date(deadline).toISOString(); // Convert deadline to ISO format
        const formattedSkills = skillsRequired.split(',').map(skill => skill.trim()); // Convert to array

        const projectData = {
            project_name: projectName.trim(),
            description: description.trim(),
            deadline: formattedDeadline,
            skills_required: formattedSkills,
            team_strength: teamStrength ? parseInt(teamStrength) : null,
            credits: credits ? parseInt(credits) : null,
        };

        console.log("Sending Data:", projectData); // Debugging log

        try {
            await api.post('projects/', projectData, {
                headers: { 'Content-Type': 'application/json' }
            });
            alert('Project posted successfully!');
            navigate('/project-owner-dashboard');
        } catch (err) {
            console.error("Error:", err.response && err.response.data ? err.response.data : err);
            setError('Failed to post project. Please check your inputs.');
        }
    };


    return ( <
        div style = {
            { textAlign: 'center', padding: '50px' }
        } >
        <
        h2 > Post a New Project < /h2> {
        error && < p style = {
            { color: 'red' }
        } > { error } < /p>} <
        div >
        <
        input type = "text"
        placeholder = "Project Name"
        value = { projectName }
        onChange = {
            (e) => setProjectName(e.target.value)
        }
        /> < /
        div > <
        div >
        <
        textarea placeholder = "Description"
        value = { description }
        onChange = {
            (e) => setDescription(e.target.value)
        }
        /> < /
        div > <
        div >
        <
        input type = "datetime-local"
        value = { deadline }
        onChange = {
            (e) => setDeadline(e.target.value)
        }
        /> < /
        div > <
        div >
        <
        input type = "text"
        placeholder = "Skills Required (comma separated)"
        value = { skillsRequired }
        onChange = {
            (e) => setSkillsRequired(e.target.value)
        }
        /> < /
        div > <
        div >
        <
        input type = "number"
        placeholder = "Team Strength"
        value = { teamStrength }
        onChange = {
            (e) => setTeamStrength(e.target.value)
        }
        /> < /
        div > <
        div >
        <
        input type = "number"
        placeholder = "Credits"
        value = { credits }
        onChange = {
            (e) => setCredits(e.target.value)
        }
        /> < /
        div > <
        button onClick = { handlePostProject } > Post Project < /button> < /
        div >
    );
}


export default PostProject;