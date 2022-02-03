import React from 'react';

import './homePage.scss';
import Directory from '../components/directory/directory.js';

const HomePage = () => (
    <div className='homepage'>
        <h1>Welcome to my Homepage</h1>
        <Directory />
    </div>
);

export default HomePage;