import React from 'react';
import { Link } from "react-router-dom";
import './header.css';

const header = (props) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const isAdmin = user?.role === "ROLE_ADMIN";

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark navbar-fixed custom-header-bg">
                <Link className="navbar-brand active p-2" to={"/home"}>E-library management</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                        aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                    <ul className="navbar-nav mr-auto">
                        {user && <li className="nav-item">
                            <Link className="nav-link" to={"/books"}>Book catalog</Link>
                        </li>}
                        {user && isAdmin && <li className="nav-item">
                            <Link className="nav-link" to={"/authors"}>Authors</Link>
                        </li>}
                        {user && isAdmin && <li className="nav-item">
                            <Link className={"nav-link"} to={"/persons"}>Patrons</Link>
                        </li>}
                        {user && <li className="nav-item">
                            <Link className={"nav-link"} to={"/borrowings"}>Borrowings</Link>
                        </li>}
                    </ul>
                    <ul className="navbar-nav mr-50">
                        {!user && <li className="nav-item">
                            <Link className="nav-link" to={"/login"}>Login</Link>
                        </li>}
                        {!user && <li className="nav-item">
                            <Link className={"nav-link"} to={"/register"}>Register</Link>
                        </li>}
                        {user && <span className={"username"}>Hi, {user.username}!</span>}
                        {user && <li className="nav-item">
                            <Link className={"nav-link"} to={"/logout"}>Logout</Link>
                        </li>}
                    </ul>
                </div>
            </nav>
        </header>
    );
}

export default header;