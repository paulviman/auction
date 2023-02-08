import React, {Component} from 'react';
import "../App.css"

class HeaderComponent extends Component {
    render() {
        return (
            <div>
                <header>
                    {/*<nav className="navbar navbar-expand-md navbar-dark bg-dark">*/}

                    {/*    <div className="row">*/}
                    {/*        <div className="col">*/}
                    {/*            <a href="">Bids for you</a>*/}
                    {/*        </div>*/}
                    {/*        <div className="col">*/}
                    {/*            <button className="btn btn-light">Log In</button>*/}
                    {/*        </div>*/}
                    {/*        <div className="col">*/}
                    {/*            <button className="btn btn-light">Sign Up</button>*/}
                    {/*        </div>*/}


                    {/*    </div>*/}


                    {/*</nav>*/}
                    <nav className="navbar navbar-expand-lg bg-dark">
                        <div className="container-fluid">
                            <a className="navbar-brand text-white" href="http://localhost:3000/products">Bids for U</a>
                            {/*<div className="collapse navbar-collapse text-white" id="navbarSupportedContent">*/}
                            {/*    <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-white">*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <a className="nav-link active text-white" aria-current="page" href="#">Home</a>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <a className="nav-link text-white" href="#">Link</a>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item dropdown">*/}
                            {/*            <a className="nav-link dropdown-toggle text-white" href="#" role="button"*/}
                            {/*               data-bs-toggle="dropdown" aria-expanded="false">*/}
                            {/*                Dropdown*/}
                            {/*            </a>*/}
                            {/*            <ul className="dropdown-menu text-white">*/}
                            {/*                <li><a className="dropdown-item" href="#">Action</a></li>*/}
                            {/*                <li><a className="dropdown-item" href="#">Another action</a></li>*/}
                            {/*                <li>*/}
                            {/*                    <hr className="dropdown-divider"/>*/}
                            {/*                </li>*/}
                            {/*                <li><a className="dropdown-item" href="#">Something else here</a></li>*/}
                            {/*            </ul>*/}
                            {/*        </li>*/}
                            {/*        <li className="nav-item">*/}
                            {/*            <a className="nav-link disabled">Disabled</a>*/}
                            {/*        </li>*/}
                            {/*    </ul>*/}
                            {/*    <form className="d-flex" role="search">*/}
                            {/*        <input className="form-control me-2" type="search" placeholder="Search"*/}
                            {/*               aria-label="Search"/>*/}
                            {/*        <button className="btn btn-outline-success" type="submit">Search</button>*/}
                            {/*    </form>*/}
                            {/*</div>*/}
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default HeaderComponent;