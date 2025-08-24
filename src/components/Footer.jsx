import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return(
        <>
        <footer className="footer-noir">
        <div className="footer-content">
            <p className="case-closed-notice">Case File #190825. All evidence sealed and archived.</p>
            
            <div className="informant-links">
                <a href="#">Contact the Agency</a>
                <div className="redacted-line"></div>
                <a href="#">Witness Protection Policy</a>
                <div className="redacted-line"></div>
                <a href="#">Classified Marks</a>
            </div>

            <div className="seal-insignia">
                U
            </div>
        </div>
    </footer>
        </>
    )
}

export default Footer;