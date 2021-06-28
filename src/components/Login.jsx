import React from 'react';
import { useState } from 'react'
import {withRouter} from 'react-router-dom';

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)

    const procesarDatos = (e)=>{
        e.preventDefault()
        if (!email.trim()) {
            setError('Email vacío')
            return
        }
        if (!pass.trim()) {
            setError('Contraseña vacía')
            return
        }
        
        if (email !== 'challenge@alkemy.org') {
            setError('Email incorrecto')
            return
        }
        if (pass !== 'react') {
            setError('Contraseña incorrecta')
            return
        }
        setEmail('')
        setPass('')
        setError(null)
        console.log('procesando...')
        props.history.push('/home')
    }
    


    return (
        <div className="mt-5">
            <h1 className="p-3 mb-2 bg-success text-white text-center ">Bienvenido al challenge de Alkemy</h1>
            <h4 className="text-center mt-5">Iniciá sesión</h4>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && (
                                <div className="alert alert-danger">{error}</div>
                            )
                        }
                        <input 
                            type="email" 
                            className='form-control mb-2'
                            placeholder='Ingrese un email'
                            onChange={e => setEmail(e.target.value)}
                            value={email}

                        />
                        <input 
                            type="password" 
                            className='form-control mb-2'
                            placeholder='Ingrese un password'
                            onChange={e => setPass(e.target.value)}
                            value={pass}

                        />
                        <button 
                            className="btn btn-primary btn-lg w-100 mb-2"
                            type='submit'
                        
                        >
                        
                            Acceder
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)
