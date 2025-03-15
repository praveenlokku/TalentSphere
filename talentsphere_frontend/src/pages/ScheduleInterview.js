import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function ScheduleInterview() {
    const { projectId } = useParams();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await api.post("schedule-interview/", { project: projectId, date, time });
            alert("Interview scheduled successfully!");
            navigate("/student-dashboard");
        } catch (error) {
            console.error("Error scheduling interview:", error);
        }
    };

    return ( <
        div style = {
            { textAlign: "center", padding: "50px" } } >
        <
        h2 > Schedule Interview
        for Project { projectId } < /h2> <
        form onSubmit = { handleSubmit } >
        <
        input type = "date"
        value = { date }
        onChange = {
            (e) => setDate(e.target.value) }
        required / >
        <
        input type = "time"
        value = { time }
        onChange = {
            (e) => setTime(e.target.value) }
        required / >
        <
        button type = "submit" > Schedule < /button> <
        /form> <
        /div>
    );
}

export default ScheduleInterview;