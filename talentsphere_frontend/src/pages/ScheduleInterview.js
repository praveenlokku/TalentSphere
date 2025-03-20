import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function ScheduleInterview() {
    const { projectId } = useParams();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const navigate = useNavigate();

    const handleSchedule = async(startNow = false) => {
        try {
            await api.post("interviews/schedule/", { project_id: projectId, date, time });

            if (startNow) {
                navigate(`/start-interview/${projectId}`); // Redirect to AI Interviewer
            } else {
                alert("Interview scheduled successfully!");
                navigate("/student-dashboard"); // Redirect back to dashboard
            }
        } catch (error) {
            console.error("Error scheduling interview:", error);
        }
    };

    return ( <
        div >
        <
        h2 > Schedule Your Team Interview < /h2> <
        label > Date: < /label> <
        input type = "date"
        value = { date }
        onChange = {
            (e) => setDate(e.target.value) }
        />

        <
        label > Time: < /label> <
        input type = "time"
        value = { time }
        onChange = {
            (e) => setTime(e.target.value) }
        />

        <
        button onClick = {
            () => handleSchedule(false) } > Schedule Interview < /button> <
        button onClick = {
            () => handleSchedule(true) } > Schedule Now < /button> <
        /div>
    );
}

export default ScheduleInterview;