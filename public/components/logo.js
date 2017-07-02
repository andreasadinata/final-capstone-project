//add the react and react dom requirments
import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

//declare function for search results
export default class Logo extends React.Component {
    render(){
        return (
            <div>
            <h1 className="logo">Planit</h1>
            <h2>Plan your trip with FlightScanner API</h2>
            </div>
        );
    }
}
