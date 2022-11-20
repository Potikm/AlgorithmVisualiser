import React from 'react'
import Home from './img/home.png'
import { Link } from 'react-router-dom'

const HomeButton = () => {
  return (
    <div className=''>
      <Link to={'/'}>
        <button className='homeBtn'><img className='icon' src={Home} alt="" /></button>
      </Link>
    </div>
  )
}

export default HomeButton