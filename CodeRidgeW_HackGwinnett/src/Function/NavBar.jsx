import React from "react";
import { NavLink, Link } from "react-router";


//NavLink adds the "active" class to the link for the page you are on
const NavBar = () => {
    return(
        <nav className = "navbar" >
            <div className = "navbar_inner">
                <Link className = "navbar_brand" to = "/"><span>ADHD</span> Health</Link>
                <ul className = "navbar_links">
                    <li><NavLink to = "/" end>Home</NavLink></li>
                    <li><Link to = "/#about">About</Link></li>
                    <li><NavLink to = "/journal">Journal</NavLink></li>
                    <li><NavLink to = "/appointment">Medical</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
