import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import App from '../components/ContactUs';

const Home = () => {
    return(
        <div>
            <Navbar />
            <Hero />
            <Footer />
            <App />
        </div>
    )
}

export default Home;