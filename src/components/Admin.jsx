import React from 'react'
import {auth} from '../firebase';
import {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
//import Firestore from './Firestore';
import Superheroes from './Superheroes'

const Admin = (props) => {    

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (auth.currentUser) {
            console.log('existe un usuario')
            setUser(auth.currentUser)
        }else{
            console.log('no existe usuario')
            props.history.push('/')
        }
    }, [user, props.history])



    return (
        <div className='mt-5 text-center'>
            
            {
                user && (
                    //<Firestore user={user}/>
                    <Superheroes />
                )
            }
        </div>
    )
}

export default withRouter(Admin)
