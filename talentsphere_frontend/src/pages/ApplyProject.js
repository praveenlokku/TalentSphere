import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';

function ApplyProject() {
    const { projectId } = useParams();
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTeams = async() => {
            try {
                const response = await api.get('teams/');
                setTeams(response.data);
            } catch (error) {
                console.error('Failed to fetch teams');
            }
        };

        fetchTeams();
    }, []);

    const handleApply = async() => {
        try {
            const response = await api.post('apply/', {
                project: projectId,
                team: selectedTeam,
            });
            alert('Application submitted! Now, schedule your interview.');
            // Assume response.data returns the application id as "id"
            const applicationId = response.data.id;
            navigate(`/schedule-interview/${applicationId}`);
        } catch (err) {
            setError('Failed to apply.');
        }
    };

    return ( <
        div style = {
            { textAlign: 'center', padding: '50px' } } >
        <
        h2 > Apply
        for Project < /h2> {
            error && < p style = {
                    { color: 'red' } } > { error } < /p>} <
                select value = { selectedTeam }
            onChange = {
                    (e) => setSelectedTeam(e.target.value) } >
                <
                option value = "" > Select your team < /option> {
                    teams.map((team) => ( <
                        option key = { team.id }
                        value = { team.id } > { team.team_name } < /option>
                    ))
                } <
                /select> <
                button onClick = { handleApply } > Apply < /button> <
                /div>
        );
    }

    export default ApplyProject;