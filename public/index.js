require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/footer';
import About from './components/about';
import WhyTravel from './components/whyTravel';
import Logo from './components/logo';

document.addEventListener('DOMContentLoaded', () =>     ReactDOM.render(<Footer/>, document.getElementById('reactFooter')));
document.addEventListener('DOMContentLoaded', () =>     ReactDOM.render(<About/>, document.getElementById('aboutReact')));
document.addEventListener('DOMContentLoaded', () =>     ReactDOM.render(<WhyTravel/>, document.getElementById('whyTravelReact')));
document.addEventListener('DOMContentLoaded', () =>     ReactDOM.render(<Logo/>, document.getElementById('logo')));


