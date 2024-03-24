import React from 'react'

const Helper = ({ type }) => {




    return (
        <div className='helper'>
            {type === "quick" ?
                <div >
                    <div className="helpText">pivot<div style={{ width: "10px", height: "10px", background: "beige" }}></div></div>
                    <div className="helpText">větší než pivot<div style={{ width: "10px", height: "10px", background: "violet" }}></div></div>
                    <div className="helpText">menší než pivot<div style={{ width: "10px", height: "10px", background: "green" }}></div></div>
                    <div className="helpText">seřazeno<div style={{ width: "10px", height: "10px", background: "cyan" }}></div></div>
                   
                    

                </div>
                :
                null
            }

        </div>
    )
}

export default Helper