import React from 'react';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FeatureSection from '../components/FeatureSection';
import Footer from '../components/Footer';

const HomePage = () => {
    return ( <
        div className = "home-container" >
        <
        Header / >
        <
        main >
        <
        section className = "hero-section" >
        <
        div className = "hero-content" >
        <
        h2 > Connect with Top Talent and Opportunities < /h2> <
        p > TalentSphere is the premier platform Bridging the gap between the students and the Industry. < /p> <
        a href = "/login"
        className = "hero-cta-btn" > Get Started < /a> < /
        div > <
        /section> <
        section className = "cta-section" >
        <
        div className = "cta-content" >
        <
        h2 > Ready to Transform Your Talent Pipeline ? < /h2> <
        p > Join thousands of companies and universities already using TalentSphere to connect with exceptional talent and opportunities. < /p> <
        div className = "cta-buttons" >
        <
        a href = "/signup"
        className = "cta-primary-btn" > Sign Up as Project Owner < /a> <
        a href = "/signup"
        className = "cta-secondary-btn" > Sign Up as Student < /a> < /
        div > <
        /div> < /
        section > <
        /main> <
        Footer / >
        <
        /div>
    );
};

export default HomePage;
