import React from 'react';
import '../styles/Hero.css';
import { Link } from 'react-router-dom';
import titleImage from '../assets/Screenshot_2025-04-17_100946-removebg-preview (1).png';

const Hero = () => {
    return(
        <>
        <div className="hero-noir">
        <div className="hero-content">
            <img className="titleImage" src = {titleImage} />
            <h1 className="hero-headline">
                In a City of Shadows,<br/> Your Story is the <span className="highlight">Light</span>.<br />
            </h1>
            <h1 className="hero-headline-2">
                Every Byte is a <span className="highlight">Clue</span>, Every <span className="glitch">Glitch</span> a Warning.
            </h1>
            <p className="hero-subtext">
                In the dark alleys of the digital world, every click leaves a trace. We chase the ghosts in the machine, piecing together secrets hidden in plain sight. This isn’t just a game of crime and code—it’s a battle for truth in a world wired with lies.
            </p>
            <div className="action-buttons">
                <Link to="/case1sql"><button className="case-button">Open the Case File</button></Link>
                <button className="evidence-button">Review the Evidence</button>
            </div>
            <div className="classified-seal">
                <img src="https://placehold.co/32x32/111111/bfaa7e?text=S" alt="Seal Icon" onerror="this.onerror=null;this.src='https://placehold.co/32x32/111111/bfaa7e?text=S';" />
                Trusted by the City's Most Notorious Kingpins & Dames
            </div>
        </div>
    </div>
    </>
    );
};

export default Hero;