import React from 'react'
import Sort from './img/sort.png'
import Path from './img/path.png'
import { Link } from 'react-router-dom'
import DSA from './img/folder.png'


const Menu = () => {
    return (
        <div className='Menu'>
            <h1>Visualise algorithms</h1>
            <p>keep it simple 😉</p>



            <div className="links">


                <Link to={'Path_finder'} style={{textDecoration: 'none'}}>
                    <button className='link'><img src={Path} className='pic' alt="" /><p>Path <br />Finder</p></button>
                </Link>

                <Link to={'Alghorithms'} style={{textDecoration: 'none'}}>
                    <button className='link'><img src={Sort} className="pic" alt="" /><p>Sorting</p></button>

                </Link>

            
            </div>
        </div>
    )
}

export default Menu