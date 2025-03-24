// import { useState, useEffect } from "react";
// import { useSearchParams } from "react-router-dom";

// const InterviewPage = () => {
//     const [searchParams] = useSearchParams();
//     const interviewTime = searchParams.get("time") || new Date().toISOString(); // Default to current time

//     const [question, setQuestion] = useState("Loading question...");
//     const [videoOn, setVideoOn] = useState(true);
//     const [muted, setMuted] = useState(false);
//     const [timeLeft, setTimeLeft] = useState(300);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//         }, 1000);
//         return () => clearInterval(timer);
//     }, []);

//     const formatTime = (seconds) => {
//         const minutes = Math.floor(seconds / 60);
//         const secs = seconds % 60;
//         return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
//     };

//     const toggleVideo = () => setVideoOn(!videoOn);
//     const toggleMute = () => setMuted(!muted);
//     const restartInterview = () => window.location.reload();
//     const endInterview = () => alert("Interview Ended");
//     const nextQuestion = () => setQuestion("Next question coming up...");

//     return ( <
//         div className = "container" >
//         <
//         header >
//         <
//         h1 > Interview in Progress < /h1> <
//         p > Scheduled Time: { new Date(interviewTime).toLocaleString() } < /p> < /
//         header >

//         <
//         div className = "controls" >
//         <
//         button onClick = { restartInterview } > Restart < /button> <
//         button onClick = { endInterview } > End Interview < /button> < /
//         div >

//         <
//         main >
//         <
//         section className = "form-section" >
//         <
//         h2 > Smart Interviewer < /h2> <
//         div className = "videos" >
//         <
//         div className = "video-section" > {
//             videoOn ? ( <
//                 img src = "/video_feed"
//                 alt = "User Video" / >
//             ) : ( <
//                 div className = "video-placeholder" > Video Off < /div>
//             )
//         } <
//         div className = "video-controls" >
//         <
//         button onClick = { toggleVideo } > { videoOn ? "Turn Off Video" : "Turn On Video" } < /button> <
//         button onClick = { toggleMute } > { muted ? "Unmute" : "Mute" } < /button> < /
//         div > <
//         /div> <
//         div className = "video-section" >
//         <
//         img src = "/static/interviewer.png"
//         alt = "AI Video" / >
//         <
//         /div> < /
//         div > <
//         /section>

//         <
//         section className = "form-section" >
//         <
//         h2 > Questions < /h2> <
//         p > { question } < /p> <
//         button onClick = { nextQuestion } > Next Question < /button> < /
//         section >

//         <
//         section className = "form-section" >
//         <
//         h2 > Microphone Access < /h2> <
//         p > Your microphone is being accessed.Please speak into the microphone. < /p> < /
//         section >

//         <
//         div className = "timer" > { formatTime(timeLeft) } < /div> < /
//         main >

//         <
//         footer >
//         <
//         p > & copy; 2024 AI Interview System.All rights reserved. < /p> < /
//         footer > <
//         /div>
//     );
// };

// export default InterviewPage;



import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const InterviewPage = () => {
    const [searchParams] = useSearchParams();
    const interviewTime = searchParams.get("time") || new Date().toISOString(); // Default to current time

    const [question, setQuestion] = useState("Loading question...");
    const [videoOn, setVideoOn] = useState(true);
    const [muted, setMuted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    const toggleVideo = () => setVideoOn(!videoOn);
    const toggleMute = () => setMuted(!muted);
    const restartInterview = () => window.location.reload();
    const endInterview = () => alert("Interview Ended");
    const nextQuestion = () => setQuestion("Next question coming up...");

    return ( <
        div className = "container" >
        <
        header >
        <
        h1 > Interview in Progress < /h1> <
        p > Scheduled Time: { new Date(interviewTime).toLocaleString() } < /p> <
        /header>

        <
        div className = "controls" >
        <
        button onClick = { restartInterview } > Restart < /button> <
        button onClick = { endInterview } > End Interview < /button> <
        /div>

        <
        main >
        <
        section className = "form-section" >
        <
        h2 > Smart Interviewer < /h2> <
        div className = "videos" >
        <
        div className = "video-section" > {
            videoOn ? ( <
                img src = "/video_feed"
                alt = "User Video" / >
            ) : ( <
                div className = "video-placeholder" > Video Off < /div>
            )
        } <
        div className = "video-controls" >
        <
        button onClick = { toggleVideo } > { videoOn ? "Turn Off Video" : "Turn On Video" } < /button> <
        button onClick = { toggleMute } > { muted ? "Unmute" : "Mute" } < /button> <
        /div> <
        /div> <
        div className = "video-section" >
        <
        img src = "/static/interviewer.png"
        alt = "AI Video" / >
        <
        /div> <
        /div> <
        /section>

        <
        section className = "form-section" >
        <
        h2 > Questions < /h2> <
        p > { question } < /p> <
        button onClick = { nextQuestion } > Next Question < /button> <
        /section>

        <
        section className = "form-section" >
        <
        h2 > Microphone Access < /h2> <
        p > Your microphone is being accessed.Please speak into the microphone. < /p> <
        /section>

        <
        div className = "timer" > { formatTime(timeLeft) } < /div> <
        /main>

        <
        footer >
        <
        p > & copy; 2024 AI Interview System.All rights reserved. < /p> <
        /footer> <
        /div>
    );
};

export default InterviewPage;