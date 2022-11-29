import React from 'react'
import { Blocks } from 'react-loader-spinner'


const Settings = ({ dijkstra, setVisualising, startNode, visualised, visualizing, setRestart, btnText, setBtnText }) => {
    return (
        <div className='buttons'>
            <button className='visualiseBtn'
                style={startNode && !visualised ? {} : { pointerEvents: 'none', opacity: '0.3' }}
                onClick={() => { dijkstra(); setVisualising(true) }}>
                {visualised && <p>Done!</p>}
                {
                    visualizing && <p>Visualising! <br />
                        <Blocks
                            visible={true}
                            height="20"
                            width="20"
                            color='red'

                        /></p>
                }
                {!visualizing && !visualised && <p>Visualise!</p>}
            </button>

            <button className='restartBtn' style={visualizing || visualised ? {} : {pointerEvents: 'none', opacity: '0.3'}} onClick={() => {setRestart(true); setBtnText("Restarting")}}>{btnText}</button>
        </div>
    )
}

export default Settings