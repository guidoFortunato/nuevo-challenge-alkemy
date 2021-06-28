import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { auth } from '../firebase'
import {withRouter} from 'react-router-dom';

const Navbar = (props) => {

    const cerrarSesion = () =>{
        auth.signOut()
            .then(()=>{
                props.history.push('/')
            })
    }




    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to='/'>React App</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                <div className="d-flex ms-auto">

                    {
                        props.firebaseUser === null ? (
                            <NavLink className="btn btn-dark me-2" to='/' exact>Home</NavLink>
                        ) : null 
                    }
                   
                  
                    {
                        props.firebaseUser !== null ? (

                           
                            <NavLink 
                                className="btn btn-dark me-2" 
                                to='/Admin'
                            >
                                Admin
                            </NavLink>
                            
                        ) : null
                    }
                    {
                        props.firebaseUser !== null ? (
                            
                            <button 
                            className="btn btn-dark"
                            onClick={()=> cerrarSesion()}
                            >
                                Cerrar Sesión
                            </button>
                        ) : null
                    }
                           
                </div>
                </div>
            </div>
        </nav>
    )
}

export default withRouter(Navbar)
