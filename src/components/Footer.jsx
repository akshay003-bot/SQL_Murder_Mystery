import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return(
        <>
        <footer class="footer-noir">
        <div class="footer-content">
            <p class="case-closed-notice">Case File #190825. All evidence sealed and archived.</p>
            
            <div class="informant-links">
                <a href="#">Contact the Agency</a>
                <div class="redacted-line"></div>
                <a href="#">Witness Protection Policy</a>
                <div class="redacted-line"></div>
                <a href="#">Classified Marks</a>
            </div>

            <div class="seal-insignia">
                U
            </div>
        </div>
    </footer>
        </>
    )
}

export default Footer;