require('babel-polyfill');

import React from 'react';
import ReactDOM from 'react-dom';
import Footer from './components/footer';

document.addEventListener('DOMContentLoaded', () =>     ReactDOM.render(<Footer/>, document.getElementById('reactFooter')));

