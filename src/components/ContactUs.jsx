import React, { useState, useEffect } from 'react';
import '../styles/ContactUs.css';

// SVG Icon for the hotline button (Vintage Telephone)
const HotlineIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
);

// SVG Icon for the close button
const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

// The main Contact Form component
const ContactForm = ({ setSubmitted }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);

        // Simulate a network request
        await new Promise(resolve => setTimeout(resolve, 1500));

        try {
            // --- SIMULATED BACKEND INTEGRATION ---
            // In a real app, a fetch() call would go here.
            const isSuccess = true; 
            
            if (isSuccess) {
                setSubmitted(true);
            } else {
                throw new Error('Transmission failed');
            }
        } catch (error) {
            console.error('FAILED...', error);
            // You can add a more sophisticated error toast/notification here
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="report-form">
            <h2>File Your Report</h2>
            <div className="red-tape-divider"></div>
            <p className="form-briefing">
                This channel is secure. All transmissions are encrypted. Leave your message. The agency is always watching.
            </p>
            <div className="form-group">
                <label htmlFor="informant_name">Your Alias</label>
                <input id="informant_name" name="informant_name" className="form-input" type="text" required />
            </div>
            <div className="form-group">
                <label htmlFor="secure_channel">Secure Channel (Email)</label>
                <input id="secure_channel" name="secure_channel" className="form-input" type="email" required />
            </div>
            <div className="form-group">
                <label htmlFor="message_content">Your Tip</label>
                <textarea id="message_content" name="message_content" className="form-textarea" required></textarea>
            </div>
            <button type="submit" disabled={isSubmitting} className="transmit-button">
                {isSubmitting ? 'Transmitting...' : 'Transmit Message'}
            </button>
        </form>
    );
};

// The pop-up modal component
const DossierPopup = ({ isOpen, onClose }) => {
    const [isSubmitted, setSubmitted] = useState(false);

    // Effect to close the modal automatically after submission
    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                onClose(); // Close the popup
                // Reset submission state after the closing animation
                setTimeout(() => setSubmitted(false), 300); 
            }, 3000); // 3 seconds delay
            return () => clearTimeout(timer);
        }
    }, [isSubmitted, onClose]);
    
    const popupClasses = isOpen ? 'visible' : 'hidden';

    return (
        <div className={`dossier-popup ${popupClasses}`}>
            <div className="dossier-header">
                <h3>Agency Communiqué</h3>
                <button onClick={onClose} className="close-dossier-btn">
                    <CloseIcon />
                </button>
            </div>
            <div className="dossier-body">
                {isSubmitted ? (
                    <div className="transmission-success">
                        <div className="stamp">
                            <h3>Transmission Acknowledged</h3>
                            <p>Your report is under review. We'll be in touch... if necessary.</p>
                        </div>
                    </div>
                ) : (
                    <ContactForm setSubmitted={setSubmitted} />
                )}
            </div>
        </div>
    );
};

// Main App Component to export
export default function App() {
    const [isPopupOpen, setPopupOpen] = useState(false);

    return (
        <div>
            <button 
                onClick={() => setPopupOpen(true)} 
                className="hotline-button">
                <HotlineIcon />
            </button>
            <DossierPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
        </div>
    );
}
