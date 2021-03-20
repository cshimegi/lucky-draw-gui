import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {
    onClickLink (event): void
    {
        let li = event.target.parentNode;
        let ul = li.parentNode;
        
        ul.querySelectorAll('li').forEach(function (childLi) {
            childLi.classList.remove('active');
        });

        li.classList.add('active');
    }

    render () {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active"
                                onClick={this.onClickLink}>
                                <Link className="nav-link" to="/">Home</Link>
                            </li>
                            <li className="nav-item"
                                onClick={this.onClickLink}>
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

