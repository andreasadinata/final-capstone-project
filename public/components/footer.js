//add the react and react dom requirments
import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesome from 'react-fontawesome';

//declare function for search results
export default class Footer extends React.Component {
    render(){
        return (
            <div>
                <p>Created by Andreas Adinata</p>
                <ul>
                <li className="personal-information"><a href="https://github.com/andreasadinata" className="github" target="_blank"><i className="fa fa-github" aria-hidden="true"></i>Github</a></li>
                <li className="personal-information"><a href="https://www.linkedin.com/in/andreasadinata/" className="linkedin" target="_blank"><i className="fa fa-linkedin-square" aria-hidden="true"></i>Linkedin</a></li>
                <li className="personal-information"><a href="mailto:adinataandreas@gmail.com" className="gmail" target="_top"><i className="fa fa-envelope" aria-hidden="true"></i>Gmail</a></li>
                </ul>
            </div>
        );
    }
}
