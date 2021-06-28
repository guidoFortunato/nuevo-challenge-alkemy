import React from 'react';
import { useState, useCallback } from 'react';
import {withRouter} from 'react-router-dom';
import {auth,db} from '../firebase'

const Home = (props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(true)

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

        if (pass.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres. Probar "react1"')
            return
        }
        if (pass !== 'react1') {
            setError('Contraseña incorrecta. Probar "react1"')
            return
        }
        console.log('procesando...')
        setEmail('')
        setPass('')
        setError(null)
        if (esRegistro) {
            registrar()
        }else{
            login()
        }
    }

    const login = useCallback( async ()=> {
        try {
            const res = await auth.signInWithEmailAndPassword(email,pass)
            console.log('Inició sesión correctamente')
            console.log(res.user)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')


        } catch (error) {
            console.log(error)
            if (error.code === 'auth/user-not-found') {
                setError('Email no registrado')
            }
            if (error.code === 'auth/wrong-password') {
                setError('La contraseña debe tener al menos 6 caracteres. Probar "react1"')
            }
            if (error.code === 'auth/invalid-email') {
                setError('Email inválido')                
            }
        }
    }, [email, pass, props.history])
    
    const registrar = useCallback( async()=> {

        try {
            
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            console.log(res.user)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid:res.user.uid

            })
            await db.collection(res.user.uid).add({
                name: 'tarea de ejemplo',
                fecha: Date.now()
            })
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')

        } catch (error) {
            console.log(error)
            if (error.code === 'auth/invalid-email') {
                setError('Email inválido')                
            }
            if (error.code === 'auth/email-already-in-use') {
                setError('Email ya utilizado')
            }
            if (error.code === 'auth/weak-password') {
                setError('La contraseña debe tener al menos 6 caracteres.Probar "react1"')
            }
        }
    }, [email, pass, props.history])

    return (
        <div className="mt-5">
            <h1 className="p-3 mb-2 bg-success text-white text-center">Bienvenido al challenge de Alkemy</h1>
            <h4 className="text-center mt-5">
                {
                    esRegistro ? 'Registro de usuarios' : 'Login de acceso'
                }
            </h4>
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
                            className="btn btn-dark btn-lg w-100 mb-2"
                            type='submit'
                        
                        >
                        {
                            esRegistro ? 'Registrarse' : 'Acceder'
                        }
                            
                        </button>
                        <button 
                            className="btn btn-primary btn-lg w-100"
                            type='button'
                            onClick={e=> {
                                setError(null)
                                setEsRegistro(!esRegistro)
                            }}
                        >
                        
                        {
                            esRegistro ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'
                        }
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Home)
