import React, {Component} from 'react'
import {Link} from "react-router-dom";

class NavigationBar extends Component{
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to={'/'}><div className="navbar-brand">.project</div></Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={'/'}><div className="nav-link">Home</div></Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={'/editingSection'}><div className="nav-link">Reading Section</div></Link>
                        </li>
                        <li className="nav-item active">
                            <Link to={'/editingSection'}><div className="nav-link">Editing Section</div></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavigationBar