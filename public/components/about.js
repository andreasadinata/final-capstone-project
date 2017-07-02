//add the react and react dom requirments
import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

//declare function for search results
export default class About extends React.Component {
    render(){
        return (
            <section id="about">
                <h1>About</h1>
                <img src="assets/images/Image.png" className="image-about"/>
                <div className="explanation">PLANIT will guide people to estimate their allowance and help them to research the perfect place to travel into. People will only need to put their location and destination, and we are going to help them to find the cheapest accomodation for them.
                </div>
            </section>
        );
    }
}
