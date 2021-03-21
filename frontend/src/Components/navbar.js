import React, {Component} from 'react'
import {Link} from "react-router-dom";

class NavigationBar extends Component{
    render() {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                {/*<img src="" width="30" height="30"*/}
                {/*     className="d-inline-block align-top" alt="" loading="lazy"/>*/}
                <Link to={'/'}><div className="navbar-brand">.project</div></Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={'/'}><div className="nav-link">Home</div></Link>
                        </li>
                        {/*<li className="nav-item active">*/}
                        {/*    <Link to={'/main'}><div className="nav-link">Main</div></Link>*/}
                        {/*</li>*/}
                    </ul>
                </div>
            </nav>
        )
    }
}

export default NavigationBar