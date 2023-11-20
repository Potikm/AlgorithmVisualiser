import React from 'react'
import NavBar from './Navbar'
import Grid from './Grid'
import './index.css'
import HomeButton from '../HomeButton'

const PathFinder = () => {
  return (
    <div className='pathFinder'>
      <HomeButton />
      <Grid />
    </div>
  )
}

export default PathFinder