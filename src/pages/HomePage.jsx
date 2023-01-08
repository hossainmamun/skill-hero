import React from 'react';
import Banner from '../Components/Banner.jsx';
import Footer from '../Components/Footer.jsx';
import FoundationCourse from '../Components/FoundationCourse.jsx';
import NavBar from '../Components/NavBar.jsx';
import PopularCourse from '../Components/PopularCourse.jsx';

const HomePage = () => {
    return (
        <div>
            <NavBar />
            <Banner />
            <PopularCourse />
            <FoundationCourse />
            <Footer/>
        </div>
    );
};

export default HomePage;