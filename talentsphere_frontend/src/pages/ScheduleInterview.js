// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../api";

// function ScheduleInterview() {
//     const { projectId } = useParams();
//     const [date, setDate] = useState("");
//     const [time, setTime] = useState("");
//     const navigate = useNavigate();

//     const handleSchedule = async(startNow = false) => {
//         let interviewDate = date;
//         let interviewTime = time;

//         if (startNow) {
//             const now = new Date();
//             interviewDate = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
//             interviewTime = now.toTimeString().split(" ")[0].slice(0, 5); // Format: HH:MM
//         }

//         if (!interviewDate || !interviewTime) {
//             alert("Please select a valid date and time.");
//             return;
//         }

//         try {
//             await api.post("interviews/schedule/", {
//                 project_id: projectId,
//                 date: interviewDate,
//                 time: interviewTime
//             });

//             if (startNow) {
//                 navigate(`/start-interview/${projectId}`); // Redirect to AI Interviewer
//             } else {
//                 alert("Interview scheduled successfully!");
//                 navigate("/student-dashboard"); // Redirect back to dashboard
//             }
//         } catch (error) {
//             console.error("Error scheduling interview:", error);
//         }
//     };

//     return ( <
//         div >
//         <
//         h2 > Schedule Your Team Interview < /h2>

//         <
//         label > Date: < /label> <
//         input type = "date"
//         value = { date }
//         onChange = {
//             (e) => setDate(e.target.value)
//         }
//         />

//         <
//         label > Time: < /label> <
//         input type = "time"
//         value = { time }
//         onChange = {
//             (e) => setTime(e.target.value)
//         }
//         />

//         <
//         button onClick = {
//             () => handleSchedule(false)
//         } > Schedule Interview < /button> <
//         button onClick = {
//             () => handleSchedule(true)
//         } > Schedule Now < /button> < /
//         div >
//     );
// }

// export default ScheduleInterview;



import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function ScheduleInterview() {
    const { projectId } = useParams();
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [alreadyScheduled, setAlreadyScheduled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the interview is already scheduled for this project
        const fetchScheduledInterview = async() => {
            try {
                const response = await api.get(`interviews/${projectId}/`);
                if (response.data) {
                    setAlreadyScheduled(true);
                }
            } catch (error) {
                console.error("Error fetching scheduled interview:", error);
            }
        };

        fetchScheduledInterview();
    }, [projectId]);
    const handleScheduleNow = () => {
        navigate("/interview"); // Redirect to InterviewPage.js
    };
    const handleSchedule = async(startNow = false) => {
        let interviewDate = date;
        let interviewTime = time;

        if (startNow) {
            const now = new Date();
            interviewDate = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
            interviewTime = now.toTimeString().split(" ")[0].slice(0, 5); // Format: HH:MM
        }

        if (!interviewDate || !interviewTime) {
            alert("Please select a valid date and time.");
            return;
        }

        try {
            await api.post("interviews/schedule/", {
                project_id: projectId,
                date: interviewDate,
                time: interviewTime
            });

            if (startNow) {
                navigate(`/interview`); // Redirect to AI Interviewer
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
        h2 > Schedule Your Team Interview < /h2>

        {
            alreadyScheduled ? ( <
                p style = {
                    { color: "red" }
                } > Your team has already scheduled an interview
                for this project. < /p>
            ) : ( <
                >
                <
                label > Date: < /label> <
                input type = "date"
                value = { date }
                onChange = {
                    (e) => setDate(e.target.value)
                }
                />

                <
                label > Time: < /label> <
                input type = "time"
                value = { time }
                onChange = {
                    (e) => setTime(e.target.value)
                }
                />

                <
                button onClick = {
                    () => handleSchedule(false)
                } > Schedule Interview < /button> <button onClick={handleScheduleNow}>Schedule Now</button > < / >
            )
        } <
        /div>
    );
}

export default ScheduleInterview;