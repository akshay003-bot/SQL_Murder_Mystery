import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'

const Navbar = () => {
    return(
    <>
    <nav className="navbar-container">
        <a href="">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="4.706" cy="16" r="4.706" fill="#D9D9D9" />
                <circle cx="16.001" cy="4.706" r="4.706" fill="#D9D9D9" />
                <circle cx="16.001" cy="27.294" r="4.706" fill="#D9D9D9" />
                <circle cx="27.294" cy="16" r="4.706" fill="#D9D9D9" />
            </svg>
        </a>
        <div className="desktop-nav-links">
            <a href="#" className="nav-link-group">
                <span className="nav-link-text">Cases</span>
                <span className="nav-link-text-hover">Cases</span>
            </a>
            <a href="#" className="nav-link-group">
                <span className="nav-link-text">Stories</span>
                <span className="nav-link-text-hover">Stories</span>
            </a>
            <a href="#" className="nav-link-group">
                <span className="nav-link-text">Pricing</span>
                <span className="nav-link-text-hover">Pricing</span>
            </a>
            <Link to="/learn">
            <a className="nav-link-group">
                <span className="nav-link-text">Docs</span>
                <span className="nav-link-text-hover">Docs</span>
            </a>
            </Link>
            <a href="https://akshay003-bot.github.io/Akshay_Nasanakota_Portfolio/" className="nav-link-group">
                <span className="nav-link-text">Know Me</span>
                <span className="nav-link-text-hover">Know Me</span>
            </a>
        </div>

        <div className="desktop-action-buttons">
            <Link to="/case1sql">
            <button className="get-started-button">
                Get Started
            </button>
            </Link>
        </div>
        <button id="menuToggle" className="mobile-menu-toggle">
            <svg className="menu-icon" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
        </button>
        <div id="mobileMenu" className="mobile-menu">
            <a className="mobile-link" href="#">
                Products
            </a>
            <a className="mobile-link" href="#">
                Customer Stories
            </a>
            <a className="mobile-link" href="#">
                Pricing
            </a>
            <a className="mobile-link" href="/learn">
                Docs
            </a>
            <button className="contact-button">
                Contact
            </button>
            <button className="get-started-button">
                Get Started
            </button>
        </div>
    </nav>
<Helmet>
    <script>
        {`const menuToggle = document.getElementById('menuToggle');
        const mobileMenu = document.getElementById('mobileMenu');

        menuToggle.addEventListener('click', () => {
            // Instead of using a 'hidden' className, we toggle a className that sets display to flex
            if (mobileMenu.style.display === 'flex') {
                mobileMenu.style.display = 'none';
            } else {
                mobileMenu.style.display = 'flex';
            }
        });`}
    </script>
</Helmet>
    </>
    );
}

export default Navbar;