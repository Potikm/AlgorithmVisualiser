import React from 'react'

const Navbar = ({setAlgo, clearBoard}) => {
  return (
    <div className='Navbar'>
        <div className="container-fluid">
        <div className='row'>
           <div onClick={() => {setAlgo("BFS")}} className="col-sm algo">BFS</div>
           <div onClick={() => {setAlgo("A*")}} className="col-sm algo">A*Search</div>
           <div onClick={() => {setAlgo("Dijkstra"); clearBoard()}} className="col-sm algo">Dijkstra</div>
           

        </div>
        </div>
        
    </div>
  )
}

export default Navbar