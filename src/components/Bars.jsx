import React from 'react'
import Bar from './Bar'
import { useEffect } from 'react'
import { useState } from 'react'
import Algos from './Algos'



const Bars = ({ alghorithm, play, setPlay, pause, timer, setSorted, setRestart, reload, setReload, setPause, restart }) => {

    const [heights, setHeights] = useState([]);
    const [bars, setBars] = useState([]);
    const [restartArr, setRestartArr] = useState([]);


    useEffect(() => {


        setPlay(false);
        document.querySelector(".Bars").style.transform = "none";

        document.querySelectorAll(".Bar").forEach((bar) => {
            bar.style.transform = "none";

        })


        if (!reload) {              // reload only when reload button ís clieckd
            spawnBars();
        }

        clearColor(null);

        if (!play) {
            setReload(false);

        }

        if (play && pause && reload) {
            setPause(false);
        }



        console.log(alghorithm)


    }, [alghorithm, reload])




    useEffect(() => {                               // setting each bar in bars
        setBars(document.querySelectorAll(".Bar"));




    }, [heights])





    useEffect(() => {

        if (!play && restart) {
            for (let i = 0; i < heights.length; i++) {
                bars[i].innerHTML = heights[i];
                bars[i].style.height = heights[i] + "px";
            }
            setReload(false);
            setPlay(false)
            setPause(true);
            clearColor(null);
            setRestart(false);
        }

        if (pause && play && restart) {
            setPause(false);
        }

    }, [restart])






    useEffect(() => {

        console.log(bars)
        if (alghorithm === "bubble" && play === true) {
            bubble();
        } else if (alghorithm === "selection" && play === true) {
            selection();
        } else if (alghorithm === "insertion" && play === true) {
            insertion()
        } else if (alghorithm === "merge" && play === true) {
            merge()
        } else if (alghorithm === "quick" && play === true) {
            quick();
        }


    }, [play])

    const spawnBars = () => {


        setHeights([])
        for (let i = 0; i < 26; i++) {
            const num = Math.floor(Math.random() * 100) + 30;
            setHeights(heights => [...heights, num])

        }




    }


    const checkForStop = (bars, duplicate) => {
        var same = 0;

        if (document.querySelector(".reloadBtn").innerHTML === 'Reloading') {
            document.querySelector(".Bars").style.transform = "none";

            document.querySelectorAll(".Bar").forEach((bar) => {
                bar.style.transform = "none";

            })
            setReload(false);
            setPlay(false)
            setPause(true);
            spawnBars();
            clearColor(null);
            return true;
        } else if (document.querySelector(".restartBtn").innerHTML === 'Restarting') {
            document.querySelector(".Bars").style.transform = "none";


            document.querySelectorAll(".Bar").forEach((bar) => {
                bar.style.transform = "none";

            })


            for (let i = 0; i < heights.length; i++) {
                bars[i].innerHTML = heights[i];
                bars[i].style.height = heights[i] + "px";
            }
            setReload(false);
            setPlay(false)
            setPause(true);
            clearColor(null);
            setRestart(false);

            return true;

        }
        for (let i = 0; i < bars.length; i++) {

            for (let j = 0; j < duplicate.length; j++) {


                if (bars[i] === duplicate[j] && bars[i].offsetHeight) {
                    same++;
                }

            }

        }

        if (same === bars.length && same === duplicate.length) {              /////////////////vzdy pokud se zmeni bars tak restart pomoci checkforstop
            return false;
        } else {
            return true;
        }
    }




    const bubble = async () => {
        const duplicate = bars;
        setBars(document.querySelectorAll(".Bar"));

        if (bars !== [] && bars !== undefined) {

            var swapped = false;
            for (let i = 0; i < bars.length - 1; i++) {
                swapped = false;
                for (let j = 0; j < bars.length - 1; j++) {


                    if (document.querySelector(".startStop").className.includes("START")) {
                        while (document.querySelector(".startStop").className.includes("START")) {
                            await wait(+document.querySelector(".timer").innerHTML * 10);
                            console.log("s");
                        }
                    }
                    bars[j].style.backgroundColor = "red";
                    bars[j + 1].style.backgroundColor = "red";









                    if (checkForStop(bars, duplicate)) {
                        return;
                    }


                    console.log(document.querySelector(".timer").value)
                    await wait(+document.querySelector(".timer").innerHTML * 10);
                    if (+bars[j].innerHTML > +bars[j + 1].innerHTML) {
                        var temp = bars[j + 1].innerHTML;

                        bars[j + 1].style.height = bars[j].innerHTML + "px";
                        bars[j].style.height = temp + "px"


                        bars[j + 1].innerHTML = bars[j].innerHTML;
                        bars[j].innerHTML = temp;




                        swapped = true;


                    }


                    if (checkForStop(bars, duplicate)) {
                        return;
                    }

                    if (document.querySelector(".startStop").className.includes("START")) {
                        while (document.querySelector(".startStop").className.includes("START")) {
                            await wait(+document.querySelector(".timer").innerHTML * 10);
                            console.log("s");
                        }
                    }
                    await wait(+document.querySelector(".timer").innerHTML * 10);
                    clearColor(null);

                }
                if (!swapped) {
                    setSorted(true);
                    setPlay(false);
                    return;
                }
            }
            setSorted(true);
            setPlay(false);
        }

    }

    const selection = async () => {
        var duplicate = bars;
        var min;
        var index;

        for (let i = 0; i < bars.length; i++) {
            min = bars[i];
            for (let j = 0 + i; j < bars.length; j++) {
                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                if (checkForStop(bars, duplicate)) {
                    return;
                }
                await wait(+document.querySelector(".timer").innerHTML * 10);
                bars[j].style.backgroundColor = "green";
                if (+min.innerHTML > +bars[j].innerHTML) {
                    min = bars[j];
                    index = j;

                    clearColor(null);
                    min.style.backgroundColor = "red";
                    if (document.querySelector(".startStop").className.includes("START")) {
                        while (document.querySelector(".startStop").className.includes("START")) {
                            await wait(+document.querySelector(".timer").innerHTML * 10);
                        }
                    }

                    if (checkForStop(bars, duplicate)) {
                        return;
                    }
                    await wait(+document.querySelector(".timer").innerHTML * 10);

                }

                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }

                if (checkForStop(bars, duplicate)) {
                    return;
                }
                await wait(+document.querySelector(".timer").innerHTML * 10);
                clearColor('selection');





            }
            if (document.querySelector(".startStop").className.includes("START")) {
                while (document.querySelector(".startStop").className.includes("START")) {
                    await wait(+document.querySelector(".timer").innerHTML * 10);

                }
            }
            await wait(+document.querySelector(".timer").innerHTML * 10);

            if (bars[i].innerHTML !== min.innerHTML) {
                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                const temp = bars[i].innerHTML;
                bars[i].style.backgroundColor = "red";
                min.style.backgroundColor = "red";
                if (checkForStop(bars, duplicate)) {
                    return;
                }
                await wait(+document.querySelector(".timer").innerHTML * 10);




                bars[i].innerHTML = min.innerHTML
                bars[i].style.height = min.innerHTML + "px"


                bars[index].innerHTML = temp
                bars[index].style.height = temp + "px";
                bars[i].style.backgroundColor = "burlywood";
                if (i === bars.length - 1) {
                    bars[i + 1].style.backgroundColor = "burlywood";
                }
            }
            if (document.querySelector(".startStop").className.includes("START")) {
                while (document.querySelector(".startStop").className.includes("START")) {
                    await wait(+document.querySelector(".timer").innerHTML * 10);

                }
            }
            if (checkForStop(bars, duplicate)) {
                return;
            }
            await wait(+document.querySelector(".timer").innerHTML * 10);

            bars[i].style.backgroundColor = "burlywood";
            clearColor(null);





        }
        setSorted(true);
        setPlay(false);
    }

    const insertion = async () => {
        var duplicate = bars;
        for (let i = 0; i < bars.length - 1; i++) {

            if (document.querySelector(".startStop").className.includes("START")) {
                while (document.querySelector(".startStop").className.includes("START")) {
                    await wait(+document.querySelector(".timer").innerHTML * 10);

                }
            }
            bars[i].classList.add("red");
            bars[i + 1].classList.add("red");
            if (checkForStop(bars, duplicate)) {
                return;
            }
            await wait(+document.querySelector(".timer").innerHTML * 10);

            if (+bars[i].innerHTML > +bars[i + 1].innerHTML) {
                let x = i;

                while (x >= 0) {

                    if (+bars[x].innerHTML > +bars[x + 1].innerHTML) {
                        bars[x].style.backgroundColor = "red"
                        bars[x + 1].style.backgroundColor = "red"
                        if (document.querySelector(".startStop").className.includes("START")) {
                            while (document.querySelector(".startStop").className.includes("START")) {
                                await wait(+document.querySelector(".timer").innerHTML * 10);
                            }
                        }
                        if (checkForStop(bars, duplicate)) {
                            return;
                        }
                        await wait(+document.querySelector(".timer").innerHTML * 10);

                        var temp = bars[x + 1].innerHTML;


                        bars[x + 1].innerHTML = bars[x].innerHTML;
                        bars[x + 1].style.height = bars[x].innerHTML + "px";

                        bars[x].innerHTML = temp;
                        bars[x].style.height = temp + "px";
                    } else {

                        break;
                    }
                    if (document.querySelector(".startStop").className.includes("START")) {
                        while (document.querySelector(".startStop").className.includes("START")) {
                            await wait(+document.querySelector(".timer").innerHTML * 10);
                        }
                    }
                    if (checkForStop(bars, duplicate)) {
                        return;
                    }
                    await wait(+document.querySelector(".timer").innerHTML * 10);
                    clearColor(null);


                    x--;
                }
            }
            clearColor(null);
        }
        setSorted(true);
        setPlay(false);
    }


    const merge = async () => {
        const half = Math.ceil(bars.length / 2);
        let left = [];
        let right = [];
        let sortedLeft = [];
        let sortedRight = [];
        var tempArr = [];
        var tempColor;
        // get positions for animation
        var duplicate = bars;
        var posLeft = [], posTop = [];
        var posLeftAfter = [];


        for (let i = 0; i < bars.length; i++) {

            if (left.length === 0) {
                let x = 0;
                while (x < bars.length) {
                    tempColor = color();
                    if (document.querySelector(".startStop").className.includes("START")) {
                        while (document.querySelector(".startStop").className.includes("START")) {
                            await wait(+document.querySelector(".timer").innerHTML * 10);
                        }
                    }
                    if (half % 2 !== 0 && x === half - 3 || x === bars.length - 3) {

                        if (+bars[x].innerHTML > +bars[x + 1].innerHTML) {

                            if (+bars[x + 1].innerHTML > +bars[x + 2].innerHTML) {


                                if (document.querySelector(".startStop").className.includes("START")) {
                                    while (document.querySelector(".startStop").className.includes("START")) {
                                        await wait(+document.querySelector(".timer").innerHTML * 10);
                                    }
                                }
                                bars[x].style.backgroundColor = "red";
                                bars[x + 2].style.backgroundColor = "red";
                                if (checkForStop(bars, duplicate)) {
                                    return;
                                }
                                await wait(+document.querySelector(".timer").innerHTML * 10);
                                let temp = bars[x].innerHTML;
                                bars[x].innerHTML = bars[x + 2].innerHTML;
                                bars[x].style.height = bars[x + 2].innerHTML + "px";

                                bars[x + 2].innerHTML = temp;
                                bars[x + 2].style.height = temp + "px";
                                {
                                    x < half ?
                                        left.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])
                                        :
                                        right.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])
                                }
                                bars[x].style.backgroundColor = tempColor;
                                bars[x + 1].style.backgroundColor = tempColor;
                                if (bars[x + 2]) {
                                    bars[x + 2].style.backgroundColor = tempColor;

                                }
                                x++;
                            } else {
                                if (+bars[x].innerHTML > +bars[x + 2].innerHTML) {


                                    if (document.querySelector(".startStop").className.includes("START")) {
                                        while (document.querySelector(".startStop").className.includes("START")) {
                                            await wait(+document.querySelector(".timer").innerHTML * 10);
                                        }
                                    }
                                    bars[x].style.backgroundColor = "red";
                                    bars[x + 1].style.backgroundColor = "red";
                                    if (checkForStop(bars, duplicate)) {
                                        return;
                                    }
                                    await wait(+document.querySelector(".timer").innerHTML * 10);


                                    let temp = bars[x].innerHTML;
                                    bars[x].innerHTML = bars[x + 1].innerHTML;
                                    bars[x].style.height = bars[x + 1].innerHTML + "px";
                                    bars[x + 1].innerHTML = bars[x + 2].innerHTML;
                                    bars[x + 1].style.height = bars[x + 2].innerHTML + "px";


                                    bars[x + 1].style.backgroundColor = "red";
                                    bars[x + 2].style.backgroundColor = "red";
                                    await wait(+document.querySelector(".timer").innerHTML * 10);


                                    bars[x].style.backgroundColor = "red";
                                    bars[x + 2].style.backgroundColor = "red";
                                    if (document.querySelector(".startStop").className.includes("START")) {
                                        while (document.querySelector(".startStop").className.includes("START")) {
                                            await wait(+document.querySelector(".timer").innerHTML * 10);
                                        }
                                    }
                                    if (checkForStop(bars, duplicate)) {
                                        return;
                                    }
                                    await wait(+document.querySelector(".timer").innerHTML * 10);

                                    bars[x + 2].innerHTML = temp;
                                    bars[x + 2].style.height = temp + "px";


                                    {
                                        x < half ?
                                            left.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])
                                            :
                                            right.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])
                                    }
                                    bars[x].style.backgroundColor = tempColor;
                                    bars[x + 1].style.backgroundColor = tempColor;
                                    if (bars[x + 2]) {
                                        bars[x + 2].style.backgroundColor = tempColor;

                                    }

                                    x++;
                                } else {


                                    if (document.querySelector(".startStop").className.includes("START")) {
                                        while (document.querySelector(".startStop").className.includes("START")) {
                                            await wait(+document.querySelector(".timer").innerHTML * 10);
                                        }
                                    }
                                    bars[x].style.backgroundColor = "red";
                                    bars[x + 1].style.backgroundColor = "red";
                                    if (checkForStop(bars, duplicate)) {
                                        return;
                                    }
                                    await wait(+document.querySelector(".timer").innerHTML * 10);
                                    let temp = bars[x].innerHTML;
                                    bars[x].innerHTML = bars[x + 1].innerHTML;
                                    bars[x].style.height = bars[x + 1].innerHTML + "px";
                                    bars[x + 1].innerHTML = temp;
                                    bars[x + 1].style.height = temp + "px";

                                    {
                                        x < half ?
                                            left.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])
                                            :
                                            right.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])

                                    }
                                    bars[x].style.backgroundColor = tempColor;
                                    bars[x + 1].style.backgroundColor = tempColor;
                                    if (bars[x + 2]) {
                                        bars[x + 2].style.backgroundColor = tempColor;

                                    }
                                    x++;
                                }

                            }
                        } else {
                            if (+bars[x].innerHTML > +bars[x + 2].innerHTML) {


                                if (document.querySelector(".startStop").className.includes("START")) {
                                    while (document.querySelector(".startStop").className.includes("START")) {
                                        await wait(+document.querySelector(".timer").innerHTML * 10);
                                    }
                                }
                                bars[x].style.backgroundColor = "red";
                                bars[x + 2].style.backgroundColor = "red";
                                if (checkForStop(bars, duplicate)) {
                                    return;
                                }
                                await wait(+document.querySelector(".timer").innerHTML * 10);

                                let temp = bars[x].innerHTML;
                                bars[x].innerHTML = bars[x + 2].innerHTML;
                                bars[x].style.height = bars[x + 2].innerHTML + "px";




                                bars[x + 2].innerHTML = bars[x + 1].innerHTML;
                                bars[x + 2].style.height = bars[x + 1].innerHTML + "px";

                                bars[x + 1].innerHTML = temp
                                bars[x + 1].style.height = temp + "px";

                                {
                                    x < half ?
                                        left.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])
                                        :
                                        right.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])

                                }
                                bars[x].style.backgroundColor = tempColor;
                                bars[x + 1].style.backgroundColor = tempColor;
                                bars[x + 2].style.backgroundColor = tempColor;

                                x++;
                            } else {
                                if (+bars[x + 1].innerHTML > +bars[x + 2].innerHTML) {

                                    if (document.querySelector(".startStop").className.includes("START")) {
                                        while (document.querySelector(".startStop").className.includes("START")) {
                                            await wait(+document.querySelector(".timer").innerHTML * 10);
                                        }
                                    }
                                    bars[x + 1].style.backgroundColor = "red";
                                    bars[x + 2].style.backgroundColor = "red";
                                    if (checkForStop(bars, duplicate)) {
                                        return;
                                    }
                                    await wait(+document.querySelector(".timer").innerHTML * 10);
                                    let temp = bars[x + 1].innerHTML;
                                    bars[x + 1].innerHTML = bars[x + 2].innerHTML;
                                    bars[x + 1].style.height = bars[x + 2].innerHTML + "px";

                                    bars[x + 2].innerHTML = temp;
                                    bars[x + 2].style.height = temp + "px";

                                    {
                                        x < half ?
                                            left.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])
                                            :
                                            right.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])

                                    }
                                    bars[x].style.backgroundColor = tempColor;
                                    bars[x + 1].style.backgroundColor = tempColor;
                                    if (bars[x + 2]) {
                                        bars[x + 2].style.backgroundColor = tempColor;

                                    }
                                } else {
                                    {
                                        x < half ?
                                            left.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])
                                            :
                                            right.push([bars[x].innerHTML, bars[x + 1].innerHTML, bars[x + 2].innerHTML])

                                    }
                                    bars[x].style.backgroundColor = tempColor;
                                    bars[x + 1].style.backgroundColor = tempColor;
                                    if (bars[x + 2]) {
                                        bars[x + 2].style.backgroundColor = tempColor;

                                    }
                                }

                                x++;

                            }
                        }
                        if (document.querySelector(".startStop").className.includes("START")) {
                            while (document.querySelector(".startStop").className.includes("START")) {
                                await wait(+document.querySelector(".timer").innerHTML * 10);
                            }
                        }
                        if (checkForStop(bars, duplicate)) {
                            return;
                        }
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                        console.log(bars[x], bars[x + 1], bars[x + 2])
                        bars[x].style.backgroundColor = tempColor;
                        bars[x + 1].style.backgroundColor = tempColor;
                        if (bars[x + 2]) {
                            bars[x + 2].style.backgroundColor = tempColor;

                        }
                        x++;
                    } else {

                        if (+bars[x].innerHTML > +bars[x + 1].innerHTML) {
                            if (document.querySelector(".startStop").className.includes("START")) {
                                while (document.querySelector(".startStop").className.includes("START")) {
                                    await wait(+document.querySelector(".timer").innerHTML * 10);
                                }
                            }
                            bars[x].style.backgroundColor = "red";
                            bars[x + 1].style.backgroundColor = "red";
                            if (checkForStop(bars, duplicate)) {
                                return;
                            }
                            await wait(+document.querySelector(".timer").innerHTML * 10);
                            let temp = bars[x].innerHTML;
                            bars[x].innerHTML = bars[x + 1].innerHTML;
                            bars[x].style.height = bars[x + 1].innerHTML + "px";

                            bars[x + 1].innerHTML = temp;
                            bars[x + 1].style.height = temp + "px";

                            {
                                x < half ?
                                    left.push([bars[x].innerHTML, bars[x + 1].innerHTML])
                                    :
                                    right.push([bars[x].innerHTML, bars[x + 1].innerHTML])

                            }
                            if (document.querySelector(".startStop").className.includes("START")) {
                                while (document.querySelector(".startStop").className.includes("START")) {
                                    await wait(+document.querySelector(".timer").innerHTML * 10);
                                }
                            }
                            bars[x].style.backgroundColor = tempColor;
                            bars[x + 1].style.backgroundColor = tempColor;
                            if (checkForStop(bars, duplicate)) {
                                return;
                            }
                            await wait(+document.querySelector(".timer").innerHTML * 10);

                            x++;
                        } else {

                            if (document.querySelector(".startStop").className.includes("START")) {
                                while (document.querySelector(".startStop").className.includes("START")) {
                                    await wait(+document.querySelector(".timer").innerHTML * 10);
                                }
                            }
                            bars[x].style.backgroundColor = "red";
                            bars[x + 1].style.backgroundColor = "red";
                            if (checkForStop(bars, duplicate)) {
                                return;
                            }
                            await wait(+document.querySelector(".timer").innerHTML * 10);
                            {
                                x < half ?
                                    left.push([bars[x].innerHTML, bars[x + 1].innerHTML])
                                    :
                                    right.push([bars[x].innerHTML, bars[x + 1].innerHTML])


                            }
                            if (document.querySelector(".startStop").className.includes("START")) {
                                while (document.querySelector(".startStop").className.includes("START")) {
                                    await wait(+document.querySelector(".timer").innerHTML * 10);
                                }
                            }
                            bars[x].style.backgroundColor = tempColor;
                            bars[x + 1].style.backgroundColor = tempColor;
                            if (checkForStop(bars, duplicate)) {
                                return;
                            }
                            await wait(+document.querySelector(".timer").innerHTML * 10);

                            x++;
                        }
                    }

                    x++;


                }

            }
            if (i === 0) {
                for (let h = 0; h < bars.length; h++) {


                    posLeftAfter.push(bars[h].offsetLeft)
                }


            }





            if (i < half) {
                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                if (i === 0) {

                    tempColor = color();
                    for (let i = 0; i < bars.length; i++) {
                        posLeft.push(bars[i].offsetLeft);
                        posTop.push(bars[i].offsetTop);
                    }

                    for (let i = 0; i < half; i++) {
                        bars[i].classList.add("down");
                    }
                    if (checkForStop(bars, duplicate)) {
                        return;
                    }
                    await wait(2000);
                }


                let pivot = 0;
                let arr;
                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                left.map((bar) => {

                    if (bar.length > 0 && pivot === 0) {
                        pivot = +bar[0]
                        arr = bar

                        left = left.filter(function (e) {
                            return e.length;
                        });

                    }

                    if (bar.length > 0 && pivot > +bar[0]) {

                        pivot = +bar[0];
                        arr = bar;

                        left = left.filter(function (e) {
                            return e.length;
                        });
                    }



                })




                for (let x = 0; x < left.length; x++) {

                    if (+pivot === +left[x][0]) {
                        if (document.querySelector(".startStop").className.includes("START")) {
                            while (document.querySelector(".startStop").className.includes("START")) {
                                await wait(+document.querySelector(".timer").innerHTML * 10);
                            }
                        }

                        for (let j = 0; j < bars.length; j++) {


                            var rect = bars[j].getBoundingClientRect();

                            if (+pivot === +bars[j].innerHTML && rect.top > 160) {
                                bars[j].style.transform = `translate(${posLeft[i] - posLeftAfter[j]}px, 6px)`
                                bars[j].style.animationFillMode = "forwards";
                                tempArr.push(bars[j])
                                bars[j].style.transition = ` all 1s`;

                                bars[j].style.backgroundColor = tempColor;
                                break;
                            }

                        }
                        if (document.querySelector(".startStop").className.includes("START")) {
                            while (document.querySelector(".startStop").className.includes("START")) {
                                await wait(+document.querySelector(".timer").innerHTML * 10);
                            }
                        }
                        if (checkForStop(bars, duplicate)) {
                            return;
                        }
                        await wait(800);

                        break;
                    }


                }


                /* bars[i].innerHTML = pivot;
                 bars[i].style.height = pivot + "px"*/
                sortedLeft.push(pivot);
                pivot = 0;
                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                if (arr) {

                    arr.shift();


                }


            }



            if (i >= half) {
                let pivot = 0;
                let arr;

                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                if (i === half) {

                    tempColor = color();
                    for (let i = half; i < bars.length; i++) {
                        bars[i].classList.add("down");
                    }
                    if (checkForStop(bars, duplicate)) {
                        return;
                    }
                    await wait(2000);
                }

                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                right.map((bar) => {
                    if (bar.length > 0 && pivot === 0) {
                        pivot = +bar[0]
                        arr = bar

                        right = right.filter(function (e) {
                            return e.length;
                        });

                    }

                    if (bar.length > 0 && pivot > +bar[0]) {

                        pivot = +bar[0];
                        arr = bar;

                        right = right.filter(function (e) {
                            return e.length;
                        });
                    }
                })

                for (let x = 0; x < right.length; x++) {

                    if (+pivot === +right[x][0]) {


                        for (let j = 0; j < bars.length; j++) {

                            if (document.querySelector(".startStop").className.includes("START")) {
                                while (document.querySelector(".startStop").className.includes("START")) {
                                    await wait(+document.querySelector(".timer").innerHTML * 10);
                                }
                            }
                            var rect = bars[j].getBoundingClientRect();

                            if (+pivot === +bars[j].innerHTML && rect.top > 160) {
                                bars[j].style.transform = `translate(${posLeft[i] - posLeftAfter[j]}px, 6px)`
                                bars[j].style.animationFillMode = "forwards";
                                tempArr.push(bars[j])
                                bars[j].style.transition = ` all 1s`;
                                bars[j].style.backgroundColor = tempColor;

                                break;
                            }

                        }

                        if (checkForStop(bars, duplicate)) {
                            return;
                        }
                        await wait(800);

                        break;
                    }


                }




                /**bars[i].innerHTML = pivot;
                bars[i].style.height = pivot + "px" */
                sortedRight.push(pivot);
                pivot = 0;
                if (arr) {
                    arr.shift();

                }

                if (i === bars.length - 1) {

                    if (document.querySelector(".startStop").className.includes("START")) {
                        while (document.querySelector(".startStop").className.includes("START")) {
                            await wait(+document.querySelector(".timer").innerHTML * 10);
                        }
                    }
                    for (let x = 0; x < bars.length; x++) {
                        bars[x].classList.remove("down");

                    }

                    setBars([...tempArr])
                    if (checkForStop(bars, duplicate)) {
                        return;
                    }
                    await wait(800);
                }
            }







        }
        for (let i = 0; i < bars.length; i++) {

            if (i === 0) {
                tempColor = color();
                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                for (let i = 0; i < bars.length; i++) {
                    document.querySelector(".Bars").style.transform = "translateY(150px)";
                    document.querySelector(".Bars").style.transition = ` all 1s`;
                }

                if (checkForStop(bars, duplicate)) {
                    return;
                }
                await wait(800);
            }





            if (+sortedLeft[0] > +sortedRight[0]) {
                if (sortedRight.length > 0) {

                    for (let x = 0; x < bars.length; x++) {
                        var rect = bars[x].getBoundingClientRect();

                        if (+sortedRight[0] === +bars[x].innerHTML && rect.top > 240) {
                            if (document.querySelector(".startStop").className.includes("START")) {
                                while (document.querySelector(".startStop").className.includes("START")) {
                                    await wait(+document.querySelector(".timer").innerHTML * 10);
                                }
                            }
                            bars[x].style.transform = `translate(${posLeft[0] - posLeftAfter[x]}px,-150px)`
                            bars[x].style.animationFillMode = "forwards";
                            posLeft.shift();
                            bars[x].style.transition = ` all 1s`;
                            bars[x].style.backgroundColor = tempColor;
                            break;
                        }
                    }
                    sortedRight.shift();
                }
                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                if (checkForStop(bars, duplicate)) {
                    return;
                }
                await wait(800);
            } else {
                if (sortedLeft.length > 0) {
                    for (let x = 0; x < bars.length; x++) {
                        var rect = bars[x].getBoundingClientRect();

                        if (+sortedLeft[0] === +bars[x].innerHTML && rect.top > 240) {
                            if (document.querySelector(".startStop").className.includes("START")) {
                                while (document.querySelector(".startStop").className.includes("START")) {
                                    await wait(+document.querySelector(".timer").innerHTML * 10);
                                }
                            }
                            bars[x].style.transform = `translate(${posLeft[0] - posLeftAfter[x]}px,-150px)`
                            bars[x].style.animationFillMode = "forwards";
                            posLeft.shift();
                            bars[x].style.transition = ` all 1s`;
                            bars[x].style.backgroundColor = tempColor;

                            break;
                        }
                    }
                    sortedLeft.shift();
                } else {
                    for (let x = 0; x < bars.length; x++) {
                        var rect = bars[x].getBoundingClientRect();

                        if (+sortedRight[0] === +bars[x].innerHTML && rect.top > 240) {
                            if (document.querySelector(".startStop").className.includes("START")) {
                                while (document.querySelector(".startStop").className.includes("START")) {
                                    await wait(+document.querySelector(".timer").innerHTML * 10);
                                }
                            }
                            bars[x].style.transform = `translate(${posLeft[0] - posLeftAfter[x]}px,-150px)`
                            bars[x].style.animationFillMode = "forwards";
                            posLeft.shift();
                            bars[x].style.transition = ` all 1s`;
                            bars[x].style.backgroundColor = tempColor;

                            break;
                        }
                    }
                    sortedRight.shift();
                }
                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                if (checkForStop(bars, duplicate)) {
                    return;
                }
                await wait(800);

            }

        }





        setPlay(false);
        setSorted(true);
    }


    const quick = async () => {
        var duplicate = bars;

        let i = 0;
        while (i < bars.length) {
            let swapped = false;
            let swapper = 1;
            if (document.querySelector(".startStop").className.includes("START")) {
                while (document.querySelector(".startStop").className.includes("START")) {
                    await wait(+document.querySelector(".timer").innerHTML * 10);
                }
            }
            if (bars[i].style.backgroundColor === "cyan") {

                i++;
                continue;
            }
            bars[i].style.backgroundColor = "beige";
            for (let j = i + 1; j < bars.length; j++) {
                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                if (+bars[i].innerHTML > +bars[j].innerHTML && bars[j].style.backgroundColor !== "cyan") {
                    bars[i + swapper].style.backgroundColor = "red";
                    bars[j].style.backgroundColor = "red";
                    if (checkForStop(bars, duplicate)) {
                        return;
                    }
                    await wait(+document.querySelector(".timer").innerHTML * 10);

                    if (document.querySelector(".startStop").className.includes("START")) {
                        while (document.querySelector(".startStop").className.includes("START")) {
                            await wait(+document.querySelector(".timer").innerHTML * 10);
                        }
                    }
                    let temp = bars[i + swapper].innerHTML;

                    bars[i + swapper].innerHTML = bars[j].innerHTML;
                    bars[i + swapper].style.height = bars[j].innerHTML + "px";

                    bars[j].innerHTML = temp;
                    bars[j].style.height = temp + "px";


                    bars[i + swapper].style.backgroundColor = "green";

                    swapped = true;
                    swapper++;
                    if (document.querySelector(".startStop").className.includes("START")) {
                        while (document.querySelector(".startStop").className.includes("START")) {
                            await wait(+document.querySelector(".timer").innerHTML * 10);
                        }
                    }
                    if (checkForStop(bars, duplicate)) {
                        return;
                    }
                    await wait(+document.querySelector(".timer").innerHTML * 10);


                } else {
                    if (bars[j].style.backgroundColor === "cyan") {
                        bars[i].style.backgroundColor = "cyan";
                        break;
                    }
                }
                if (bars[j].style.backgroundColor !== "green") {
                    bars[j].style.backgroundColor = "violet";
                    await wait(+document.querySelector(".timer").innerHTML * 10);

                }
                if (j < bars.length - 1 && bars[j + 1].style.backgroundColor === "cyan") {
                    break;
                }
                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                //clearColor("quick");
            }
            if (swapped) {
                if (document.querySelector(".startStop").className.includes("START")) {
                    while (document.querySelector(".startStop").className.includes("START")) {
                        await wait(+document.querySelector(".timer").innerHTML * 10);
                    }
                }
                swapper--;
                bars[i + swapper].style.backgroundColor = "red";
                bars[i].style.backgroundColor = "red";
                if (checkForStop(bars, duplicate)) {
                    return;
                }
                await wait(+document.querySelector(".timer").innerHTML * 10);
                let temp = bars[i].innerHTML;

                bars[i].innerHTML = bars[i + swapper].innerHTML;
                bars[i].style.height = bars[i + swapper].innerHTML + "px";

                bars[i + swapper].innerHTML = temp;
                bars[i + swapper].style.height = temp + "px";
                bars[i + swapper].style.backgroundColor = "cyan"
                i--;

            } else {
                bars[i].style.backgroundColor = "cyan";
            }
            clearColor("quick");
            if (document.querySelector(".startStop").className.includes("START")) {
                while (document.querySelector(".startStop").className.includes("START")) {
                    await wait(+document.querySelector(".timer").innerHTML * 10);
                }
            }


            i++;
        }
        setSorted(true);
        setPlay(false);
    }







    const wait = (ms) => {
        return new Promise(resolve => {
            setTimeout(() => { resolve('') }, ms)
        })
    }

    const color = () => {
        let color = "#";
        for (let i = 0; i < 3; i++)
            color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
        return color;
    }

    const clearColor = (type) => {

        if (type === "selection") {
            for (let i = 0; i < bars.length; i++) {
                if (bars[i].style.backgroundColor !== "red" && bars[i].style.backgroundColor !== "burlywood") {
                    bars[i].style.backgroundColor = "greenyellow";
                }

            }
        }
        if (type === "quick") {
            for (let i = 0; i < bars.length; i++) {
                if (bars[i].style.backgroundColor !== "cyan") {

                    bars[i].style.backgroundColor = "greenyellow";
                }

            }
        }
        if (type === null) {

            for (let i = 0; i < bars.length; i++) {
                bars[i].classList.remove("redRight");
                bars[i].classList.remove("redLeft");
                bars[i].classList.remove("red");
                bars[i].style.backgroundColor = "greenyellow"

            }
        }







    }





    return (
        <div className='Bars'>
            {heights.map((hei, key) => {
                return <Bar key={key} height={hei} />;
            })}


        </div>
    )
}

export default Bars