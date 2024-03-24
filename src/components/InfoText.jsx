import React from 'react'

const InfoText = ( {type} ) => {

    
  return (
    <div className='infoText'>
        {type === "bubble" ?
        <div className="helpText">
            <p>Časová složitost: O(n^2)</p>
           
        </div>
        :
        null}

        {type === "selection" ?
        <div className="helpText">
            <p>Časová složitost: O(n^2)</p>
           
        </div>
        :
        null}

        {type === "insertion" ?
        <div className="helpText">
            <p>Časová složitost: O(n^2)</p>
           
        </div>
        :
        null}

        {type === "merge" ?
        <div className="helpText">
            <p>Časová složitost: O(nLogn)</p>
           
        </div>
        :
        null}

        {type === "quick" ?
        <div className="helpText">
            <p>Časová složitost: O(n*logn)</p>
           
        </div>
        :
        null}

        {type === "merge2" ?
        <div className="helpText">
            <p>Časová složitost: O(n log n)</p>
           
        </div>
        :
        null}
       
    </div>
  )
}

export default InfoText