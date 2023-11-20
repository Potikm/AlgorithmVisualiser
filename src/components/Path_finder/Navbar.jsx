import React from 'react'

const Navbar = ({setAlgo}) => {
  return (
    <div className='Navbar'>
        <div className="container-fluid">
        <div className='row'>
           <div onClick={() => setAlgo("Dijkstra")} className="col-sm algo">Dijkstra</div>
           <div onClick={() => setAlgo("A*")} className="col-sm algo">A*Search</div>
         
           

        </div>
        </div>
        
    </div>
  )
}

export default Navbar