import React from 'react'
import Rabbit from './img/hare.png'
import Turtle from './img/turtle-facing-right.png'
import Stop from './img/pause.png'
import Start from './img/play-button-arrowhead.png'
import { useEffect } from 'react'
import { useState } from 'react'


const Settings = ({ pause, setPause, setTimer, setCount, play, sorted }) => {

    const [range, setRange] = useState(null);


    useEffect(() => {
        setRange(document.querySelector(".range").value)
    }, [document.querySelector(".range")])
    return (
        <div className='settings'>

            <div className="slider border">
                <img src={Rabbit} alt="" className='icon' />
                <div className="">
                    <p className='timer'>{range}</p>
                    <input type="range" className='range' min={10} max={100} onChange={(event) => { setRange(event.target.value); setTimer(event.target.value * 10) }} />

                </div>

                <img src={Turtle} alt="" className='icon' />
            </div>

            <div className="play border" onClick={() => setPause(!pause)}>
                {pause && !sorted ? <img src={Start} className="icon startStop START" /> : <img src={Stop} className="icon startStop STOP" />}
            </div>

            <div className="count border" style={!play ? {} : {pointerEvents: 'none', opacity: 0.3}}>
                <input className='inputBars' type="num" placeholder='Zadej počet barů' style={{ border: 'none' }} />
                <button className='createBars'  onClick={() => {{+document.querySelector(".inputBars").value > 3 ? setCount(document.querySelector(".inputBars").value) : alert("length must be 4+")} document.querySelector(".inputBars").value = ""} }>Vytvoř</button>
            </div>
        </div>
    )
}

export default Settings