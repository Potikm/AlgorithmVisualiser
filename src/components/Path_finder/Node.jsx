import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Node = ({ id, setNode, choosingWall, setWall }) => {


  const [mouseDown, setMouseDown] = useState(false);





  const handleHover = (node) => {
    if (mouseDown) {
      node.classList.add("wall");
    }
  }



  return (
    <div className={'node'} id={id} onClick={(e) => setNode(e.target)} onMouseOver={(e) => setWall(e.target)} >

    </div>
  )


}

export default Node