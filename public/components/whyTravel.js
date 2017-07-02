//add the react and react dom requirments
import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

//declare function for search results
export default class WhyTravel extends React.Component {
    render(){
        return (
            <section id="why-travel">
                <h1>Why is travelling important?</h1>
                <div className="why">Travelling helps people to experience a new culture, make new friends, learn new languages, and most importantly helps people to open their mind. So pack your bags and get ready for the new adventures ahead.</div>
                <img src="assets/images/Globe-And-Travelling-Icons.png" className="image-why"/>
            </section>
        );
    }
}
