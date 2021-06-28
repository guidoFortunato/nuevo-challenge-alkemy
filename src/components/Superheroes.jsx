import React from 'react'

const Superheroes = () => {

    const [heroes, setHeroes] = React.useState([])

    const mostrarSuperheroes = async()=>{
        const listaNueva = []

        for (let i = 70; i < 80; i++) {
            const data = await fetch(`https://www.superheroapi.com/api/10225724594719868/${i}`)
            const res = await data.json()
            listaNueva.push(res.name)            
        }
        setHeroes(listaNueva)
        


    }




    return (
        <>
            <h1 className='p-3 mb-2 bg-primary text-white text-center'>Superhéroes</h1>
            <button 
                className="btn btn-secondary mt-3 mb-3"
                onClick={()=> mostrarSuperheroes()}
            >
                Mostrar superhéroes
            </button>
            <ul className='list-group'>
            {
                heroes.map((item,index) =>(
                    <li className='list-group-item mb-2' key={index}>{item}</li>
                  ))
            }
          </ul>
        </>
    )
}

export default Superheroes
