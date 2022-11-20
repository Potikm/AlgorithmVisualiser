import React from 'react'
import Navbar from './Navbar';
import Bars from './Bars';
import { useState, useEffect } from 'react';
import Helper from './Helper';
import Settings from './Settings';
import HomeButton from './HomeButton';









const Algos = () => {

    const [alghorithm, setAlghorithm] = useState('');
    const [play, setPlay] = useState(false);
    const [pause, setPause] = useState(true);
    const [timer, setTimer] = useState(1000);
    const [sorted, setSorted] = useState(false);
    const [spawn, setSpawn] = useState(false);
    const [reload, setReload] = useState(false);
    const [btnText, setBtnText] = useState('Reload');
    const [restart, setRestart] = useState(false);
    const [restartText, setRestartText] = useState('Restart');
    const [count, setCount] = useState(13);




    useEffect(() => {
        console.log(document.querySelector(".timer"))
        setTimer(+document.querySelector(".timer").innerHTML * 10);
    }, [document.querySelector(".timer")])



    const setAlgo = (algo) => {
        setPause(true);
        setSorted(false);
        setPlay(false);
        setAlghorithm('');
        setAlghorithm(algo)
        console.log(alghorithm)
        setSpawn(true);


    }

    useEffect(() => {

        { reload ? setBtnText('Reloading') : setBtnText('Reload') }
        { restart ? setRestartText('Restarting') : setRestartText('Restart') }
        setSorted(false);

        if (document.querySelector(".Bar")) {
            document.querySelector(".Bars").style.transform = "none";          // misto classy "down" predelat na cisty pohyb pomoci pixelu

            document.querySelectorAll(".Bar").forEach((bar) => {
                bar.style.transform = "none";
                bar.classList.remove("down");

            })
        }

    }, [reload, restart])


    useEffect(() => {



        if (play && !sorted && document.querySelector(".playBtn")) {
            console.log(play, sorted)
            document.querySelector(".playBtn").style.backgroundColor = "green"
            document.querySelector(".playBtn").style.pointerEvents = "none"
        }

        if (!play && !sorted && document.querySelector(".playBtn")) {
            console.log(play, sorted)
            document.querySelector(".playBtn").style.backgroundColor = "blanchedalmond"
            document.querySelector(".playBtn").style.pointerEvents = "auto"

        }

        if (sorted && document.querySelector(".playBtn")) {
            console.log(play, sorted)
            document.querySelector(".playBtn").style.backgroundColor = "greenyellow"
            document.querySelector(".playBtn").style.pointerEvents = "none"

        }
    }, [play, sorted])


    const wait = (ms) => {
        return new Promise(resolve => {
            setTimeout(() => { resolve('') }, ms)
        })
    }


    return (
        <div>
            <div className="vertical">
                <Navbar setAlgo={setAlgo} />
                <HomeButton />
                <h1 className='algoText'>{alghorithm}</h1>


                {alghorithm === "" ? <h1>Choose the Algo ;)</h1> : <Bars alghorithm={alghorithm} key={alghorithm} play={play} setPlay={setPlay} pause={pause} timer={timer} setSorted={setSorted} spawn={spawn} setSpawn={setSpawn} reload={reload} setReload={setReload} setPause={setPause} restart={restart} setRestart={setRestart} count={count} />}

            </div>
            <div className="flex">
                {alghorithm === "" ? null : <button className='playBtn' onClick={() => { setPlay(!play); setPause(false) }}>{play && !sorted && <p className='sortText'>Sorting...</p>} {!play && !sorted && <p className='sortText'>Sort!</p>} {sorted && <p className='sortText'>Sorted!</p>}</button>}
                {alghorithm === "" ? null : <div className='underBtns'><button className='restartBtn' style={play || sorted ? {} : { pointerEvents: 'none', opacity: '0.3' }} onClick={() => setRestart(true)}>{restartText}</button> <button className='reloadBtn' onClick={() => setReload(true)}>{btnText}</button> </div>}
            </div>
            <Helper type={alghorithm} />

            <Settings pause={pause} setPause={setPause} setTimer={setTimer} algo={alghorithm} play={play} sorted={sorted} setCount={setCount} />


        </div>
    )
}

export default Algos