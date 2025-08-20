import React from 'react';
import '../styles/Hero.css';
import { Link } from 'react-router-dom';
import titleImage from '../assets/Screenshot_2025-04-17_100946-removebg-preview (1).png';

const Hero = () => {
    return(
        <>
        <div class="hero-noir">
        <div class="hero-content">
            <img class="titleImage" src = {titleImage} />
            <h1 class="hero-headline">
                In a City of Shadows,<br/> Your Story is the <span class="highlight">Light</span>.
            </h1>
            <p class="hero-subtext">
                Every brand has a secret waiting to be told. We're the private eyes of the digital world, digging through the noise to find your truth. We don't just build websites; we build alibis, legends, and legacies that last.
            </p>
            <div class="action-buttons">
                <Link to="/case1sql"><button class="case-button">Open the Case File</button></Link>
                <button class="evidence-button">Review the Evidence</button>
            </div>
            <div class="classified-seal">
                <img src="https://placehold.co/32x32/111111/bfaa7e?text=S" alt="Seal Icon" onerror="this.onerror=null;this.src='https://placehold.co/32x32/111111/bfaa7e?text=S';" />
                Trusted by the City's Most Notorious Kingpins & Dames
            </div>
        </div>
    </div>
    </>
    );
};

export default Hero;