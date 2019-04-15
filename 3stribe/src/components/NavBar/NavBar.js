import React from 'react';
import './NavBar.css';
import { NavLink } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <div className="navBar">
                <NavLink to="/" className="brand">O|O|?|X</NavLink>
                <div className="linkList">
                    <NavLink to="/tock3" className="NavLink">Easy</NavLink>
                    <NavLink to="/tock4" className="NavLink">Difficult</NavLink>
                <div className="space">
                </div>
                </div>
            </div>
        )
    }
}

export default NavBar