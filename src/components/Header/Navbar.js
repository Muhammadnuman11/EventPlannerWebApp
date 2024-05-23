import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { AuthContext } from "../../pages/Context/AuthContext";
import logo from '../../asset/Images/logo.png'

export default function Navbar() {

    const { authentication, dispatch } = useContext(AuthContext)
    const { isAuthentication } = authentication

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "LOGOUT" })
            })
            .catch(err => {
                console.error(err);
            })
    }

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark py-2">
                <div className="container">
                    <Link to="/" className="navbar-brand fs-2 logo"><img src={logo} alt="" /></Link>
                    <button className="navbar-toggler border-0 shadow-none bg-info px-1" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 w-100">
                            <li className="nav-item">
                                <Link to="/" className="nav-link text-info" aria-current="page">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/events" className="nav-link text-info">Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/addevents" className="nav-link text-info">Add Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/allusers" className="nav-link text-info">All Users</Link>
                            </li>
                            {!isAuthentication ?
                                <>
                                    {/* <button className="btn btn-info btn-sm mx-2 text-light"> */}
                                    <li className="nav-item">
                                        <Link to="auth/login" className="nav-link text-info">Login</Link>
                                    </li>
                                    {/* </button> */}
                                    {/* <button className="btn btn-info btn-sm mx-2 text-light"> */}
                                    <li className="nav-item">
                                        <Link to="auth/register" className="nav-link text-info">Register</Link>
                                    </li>

                                    {/* </button> */}
                                </>
                                : <>
                                    {/* <button className="btn btn-info btn-sm mx-2 text-light"> */}
                                    {/* </button> */}
                                    <li className="nav-item">
                                        <Link to="/" className="nav-link text-danger" onClick={handleLogout}>Logout</Link>
                                    </li>
                                </>
                            }

                            {/* <button className="btn btn-info btn-sm mx-2 text-light">
                                <Link to="auth/register" className="nav-link">Register</Link></button>
                            <button className="btn btn-info btn-sm mx-2 text-light">
                                <Link to="auth/forgotpassword" className="nav-link">Forgot Password</Link></button> */}
                            {/* </div> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}