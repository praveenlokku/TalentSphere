import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import ProjectOwnerDashboard from "./pages/ProjectOwnerDashboard";
import PostProject from "./pages/PostProject";
import CreateTeam from "./pages/CreateTeam";
import ApplyProject from "./pages/ApplyProject";
import TeamDetails from "./pages/TeamDetails";
import ScheduleInterview from "./pages/ScheduleInterview";
import AvailableProjects from "./pages/AvailableProjects";
import ProjectsAndApplications from "./pages/ProjectsAndApplications";

function App() {
    return ( <
        Router >
        <
        Routes >
        <
        Route path = "/"
        element = { < Home / > }
        /> <
        Route path = "/login"
        element = { < Login / > }
        /> <
        Route path = "/signup"
        element = { < Signup / > }
        /> <
        Route path = "/student-dashboard"
        element = { < StudentDashboard / > }
        /> <
        Route path = "/project-owner-dashboard"
        element = { < ProjectOwnerDashboard / > }
        /> <
        Route path = "/post-project"
        element = { < PostProject / > }
        /> <Route path="/schedule - interview /: projectId " element={<ScheduleInterview />} /> <
        Route path = "/create-team"
        element = { < CreateTeam / > }
        />  <
        Route path = "/team-details/:projectId"
        element = { < TeamDetails / > }
        /><
        Route path = "/apply/:projectId"
        element = { < ApplyProject / > }
        />  <
        Route path = "/projects-and-applications"
        element = { < ProjectsAndApplications / > }
        /> <
        Route path = "/available-projects"
        element = { < AvailableProjects / > }
        />< /
        Routes > <
        /Router>
    );
}

export default App;