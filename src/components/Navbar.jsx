import React from 'react'

const Navbar = ({setAlgo}) => {
  return (
    <div className='Navbar'>
        <div className="container-fluid">
        <div className='row'>
            <div onClick={() => setAlgo('bubble')} className='col-sm algo'>Bubble <br /> Sort</div>
            <div onClick={() => setAlgo('selection')} className='col-sm algo'>Selection <br /> Sort</div>
            <div onClick={() => setAlgo('insertion')} className='col-sm algo'>Insertion <br /> Sort</div>
            <div onClick={() => setAlgo('merge')} className='col-sm algo'>Merge <br /> Sort</div>
            <div onClick={() => setAlgo('quick')} className='col-sm algo'>Quick <br /> Sort</div>
           

        </div>
        </div>
        
    </div>
  )
}

export default Navbar