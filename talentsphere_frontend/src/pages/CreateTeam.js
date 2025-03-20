import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function CreateTeam() {
    const [teamName, setTeamName] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [teamMembers, setTeamMembers] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleTeamSizeChange = (e) => {
        const size = parseInt(e.target.value, 10);
        setTeamSize(size);

        // Reset and create empty objects for each member
        setTeamMembers(
            Array(size).fill().map(() => ({
                name: '',
                skills: '',
                role: '',
                college: '',
                resume: null,
            }))
        );
    };

    const handleMemberChange = (index, field, value) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index][field] = value;
        setTeamMembers(updatedMembers);
    };

    const handleResumeChange = (index, file) => {
        const updatedMembers = [...teamMembers];
        updatedMembers[index].resume = file;
        setTeamMembers(updatedMembers);
    };

    const handleCreateTeam = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('team_name', teamName);
        formData.append('team_size', teamSize);

        teamMembers.forEach((member, index) => {
            formData.append(`member_${index}_name`, member.name);
            formData.append(`member_${index}_skills`, member.skills);
            formData.append(`member_${index}_role`, member.role);
            formData.append(`member_${index}_college`, member.college);
            if (member.resume) {
                formData.append(`member_${index}_resume`, member.resume);
            }
        });

        try {
            await api.post('teams/', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Team created successfully!');
            navigate('/student-dashboard');
        } catch (err) {
            setError('Failed to create team. Please check your inputs.');
        }
    };

    return ( <
        div style = {
            { textAlign: 'center', padding: '50px' }
        } >
        <
        h2 > Create a Team < /h2> {
        error && < p style = {
            { color: 'red' }
        } > { error } < /p>} <
        form onSubmit = { handleCreateTeam } >
        <
        div >
        <
        input type = "text"
        placeholder = "Team Name"
        value = { teamName }
        onChange = {
            (e) => setTeamName(e.target.value)
        }
        required /
        >
        <
        /div> <
        div >
        <
        input type = "number"
        placeholder = "Team Size"
        value = { teamSize }
        onChange = { handleTeamSizeChange }
        required min = "1" /
        >
        <
        /div>

        { /* Dynamic Team Member Inputs */ } {
            teamMembers.map((member, index) => ( <
                div key = { index }
                style = {
                    { border: '1px solid gray', padding: '10px', margin: '10px' }
                } >
                <
                h4 > Member { index + 1 } < /h4> <
                input type = "text"
                placeholder = "Name"
                value = { member.name }
                onChange = {
                    (e) => handleMemberChange(index, 'name', e.target.value)
                }
                required /
                >
                <
                input type = "text"
                placeholder = "Skills (comma separated)"
                value = { member.skills }
                onChange = {
                    (e) => handleMemberChange(index, 'skills', e.target.value)
                }
                required /
                >
                <
                input type = "text"
                placeholder = "Role (e.g., Student)"
                value = { member.role }
                onChange = {
                    (e) => handleMemberChange(index, 'role', e.target.value)
                }
                required /
                >
                <
                input type = "text"
                placeholder = "College Name"
                value = { member.college }
                onChange = {
                    (e) => handleMemberChange(index, 'college', e.target.value)
                }
                required /
                >
                <
                input type = "file"
                onChange = {
                    (e) => handleResumeChange(index, e.target.files[0])
                }
                accept = ".pdf,.doc,.docx"
                required /
                >
                <
                /div>
            ))
        }

        <
        button type = "submit" > Create Team < /button> < /
        form > <
        /div>
    );
}

export default CreateTeam;