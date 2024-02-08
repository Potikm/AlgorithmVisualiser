import React from 'react'

const Line = ({className, id}) => {


  return (
    <div className={className}>
      <input className='pathCost' style={{width: "40px"}} type="text" id={id}/>
    </div>
  )
}

export default Line