import React from 'react'

const Navbar = ({setAlgo}) => {
  return (
    <div className='Navbar'>
        <div className="container-fluid">
        <div className='row'>
            <div onClick={() => setAlgo('bubble')} className='col-sm '>Bubble <br /> Sort</div>
            <div onClick={() => setAlgo('selection')} className='col-sm '>Selection Sort</div>
            <div onClick={() => setAlgo('insertion')} className='col-sm '>Insertion Sort</div>
            <div onClick={() => setAlgo('merge')} className='col-sm '>Merge Sort</div>
            <div onClick={() => setAlgo('quick')} className='col-sm '>Quick <br /> Sort</div>
           

        </div>
        </div>
        
    </div>
  )
}

export default Navbar