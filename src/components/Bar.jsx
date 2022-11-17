import React from 'react'

const Bar = ({height}) => {

  const color = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
   
    return "#" + randomColor;
  }

  return (
    <div className='Bar' style={{height: height+'px'}}>
        {height}
    </div>
  )
}

export default Bar