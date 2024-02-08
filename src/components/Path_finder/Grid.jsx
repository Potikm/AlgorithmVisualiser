import React, { useRef } from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Node from './Node';
import Loader from 'react-loaders'
import Feedback from 'react-bootstrap/esm/Feedback';
import Settings from './Settings';
import { clear } from '@testing-library/user-event/dist/clear';
import Navbar from './Navbar';
import Dijkstra2 from './Dijkstra2';

const Grid = () => {


  const [nodes, setNodes] = useState([]);
  const prevStartNode = useRef(null);
  const prevFinalNode = useRef(null);
  const [algo, setAlgo] = useState("");
  const [node, setNode] = useState(null);
  const [wall, setWall] = useState(null);
  const [visualizing, setVisualising] = useState(false);
  const [startNode, setStartNode] = useState(null);
  const [finalNode, setFinalNode] = useState(null);
  const [choosingFinal, setChoosingFinal] = useState(false);
  const [choosingWall, setChoosingWall] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [visualised, setVisualised] = useState(false);
  const [restart, setRestart] = useState(false);
  const [btnText, setBtnText] = useState("Restart")
  const [startNode2, setStartNode2] = useState("");
  const [endNode, setEndNode] = useState("");

  useEffect(() => {
    setNodes([]);

    for (let i = 0; i < 1800; i++) {
      setNodes(nodes => [...nodes, <Node id={i} setNode={setNode} mouseDown={mouseDown} choosingWall={choosingWall} setWall={setWall} />])
    }


  }, [])

  useEffect(() => {                        // logic for setting walls (click + hover over node)

    if (choosingWall && mouseDown) {

      if (isClassValid(wall.id)) {
        wall.classList.add("wall")
      }else{
        if (wall.classList.contains("wall")){
          wall.classList.remove("wall")
        }
      }



    }

  }, [wall])



  useEffect(() => { 
     console.log(algo)
  }, [algo])

  useEffect(() => {                                            // logic for startNode, finalNode and wall when is clicked on Node            



    if (choosingWall) {
      if (isClassValid(wall.id)) {
        wall.classList.add("wall")
      }else{
        if (wall.classList.contains("wall")){
          wall.classList.remove("wall")
        }
      }
    } else {
      if (!choosingFinal && !choosingWall) {
        setStartNode(node)

      } else {
        setFinalNode(node)
      }
      if (node && !choosingFinal && !choosingWall) {
        if (prevStartNode.current) {
          prevStartNode.current.classList.remove('startNode')
        }
        node.classList.add("startNode")
        prevStartNode.current = node;
        setChoosingFinal(true);
      } else {
        if (node && choosingFinal && !choosingWall) {
          if (prevFinalNode.current) {
            prevFinalNode.current.classList.remove('finalNode')
          }
          node.classList.add("finalNode")
          prevFinalNode.current = node;
          setChoosingFinal(false)
          setChoosingWall(true)

        }

      }
    }





  }, [node])


  useEffect(() => {

    if (document.getElementById("btnStart")) {

      if (choosingFinal && !choosingWall) {
        document.getElementById("btnStart").style.opacity = "0.3"
        document.getElementById("btnWall").style.opacity = "0.3"
        document.getElementById("btnFinal").style.opacity = "1"

      } else if (!choosingFinal && choosingWall) {
        document.getElementById("btnStart").style.opacity = "0.3"
        document.getElementById("btnFinal").style.opacity = "0.3"
        document.getElementById("btnWall").style.opacity = "1"

      } else if (!choosingFinal && !choosingWall){
        document.getElementById("btnWall").style.opacity = "0.3"
        document.getElementById("btnFinal").style.opacity = "0.3"
        document.getElementById("btnStart").style.opacity = "1"
      }
    }



  }, [choosingFinal, choosingWall])



  useEffect(() => {
    if (document.querySelector(".visualiseBtn")) {
      if (visualizing) {
        document.querySelector(".visualiseBtn").style.backgroundColor = "green"
      }

      if (visualised) {
        document.querySelector(".visualiseBtn").style.backgroundColor = "greenyellow"

      }
    }
  }, [visualizing, visualised])


  useEffect(() => {
    const handleDocumentMouseDown = event => {

      setMouseDown(true)


    };

    document.addEventListener('mousedown', handleDocumentMouseDown);
    return () => {
      document.removeEventListener('mousedown', handleDocumentMouseDown);
    };
  }, []);

  useEffect(() => {
    const handleDocumentMouseUp = event => {

      setMouseDown(false)


    };

    document.addEventListener('mouseup', handleDocumentMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, []);


  useEffect(() => {
    if (restart && visualised) {
      clearBoard();
      setRestart(false)
    }
  }, [restart])



  function clearBoard() {
    const nodes = document.querySelectorAll(".node")

    nodes.forEach((node) => {
      node.classList.forEach((classa) => {
        node.style.backgroundColor = "";
        if (+classa >= 0){
          node.classList.remove(classa, "visited", "startNode", "wall", "finalNode", "path", "visited", "left", "right", "top", "bottom", "hCost", "used");
          setStartNode2("");
          setEndNode("");
        }else{
          node.classList.remove("visited", "startNode", "wall", "finalNode", "path", "visited", "left", "right", "top", "bottom", "hCost", "used");
          setStartNode2("");
          setEndNode("");
        }
      })
    })


    setBtnText("Restart")


    setRestart(false)
    setVisualised(false)
    setStartNode(null)
    setFinalNode(null)
    setChoosingFinal(false)
    setChoosingWall(false)
    setVisualising(false)


  }


  async function aSearch(){
   
    var unvisitedNodes = [];
    unvisitedNodes.push(startNode);

    const final = finalNode.id;
    console.log(final);
    var fCost = 0;

    await checkHcost();
    //startNode.classList.remove("startNode")
    var id = unvisitedNodes[0].id
    while (unvisitedNodes.length) {
      
      document.getElementById(id).classList.add("used");
      document.getElementById(id).classList.add("visited");
      document.getElementById(id).style.backgroundColor = "red";

      if (document.querySelector(".restartBtn").innerHTML === "Restarting") {
        clearBoard();
        break;
      }

      if (isNodeValid(id, "top") && isClassValid(id - 60)) {  // top
        if (isTarget(id - 60)) {
          document.getElementById(id - 60).classList.add('top');
          showPathASearch(id - 60);
          break;
        }
        document.getElementById(id - 60).classList.add('visited');
        document.getElementById(id - 60).classList.add('top');
        var distance = document.getElementById(id - 60).className.replace(/[^\d.-]/g, '');


        const updatedClass = document.getElementById(id - 60).className.replace(/\d+/g, '');
        document.getElementById(id - 60).setAttribute('class', updatedClass);
        document.getElementById(id - 60).lang = distance;
        document.getElementById(id - 60).classList.add(+distance + 1);

  
        unvisitedNodes.push(document.getElementById(id - 60));
        await wait(10);
      }


      if (isNodeValid(id, "left") && isClassValid(id - 1)) {  // left
        if (isTarget(id - 1)) {
          document.getElementById(id - 1).classList.add('left');
          showPathASearch(id - 1);
          break;
        }
        document.getElementById(id - 1).classList.add('visited');
        document.getElementById(id - 1).classList.add('left');
        var distance = document.getElementById(id - 1).className.replace(/[^\d.-]/g, '');


        const updatedClass = document.getElementById(id - 1).className.replace(/\d+/g, '');
        document.getElementById(id - 1).setAttribute('class', updatedClass);
        document.getElementById(id - 1).lang = distance;
      
        document.getElementById(id - 1).classList.add(+distance + 1);
   
        unvisitedNodes.push(document.getElementById(id - 1));
        await wait(10);
      }


      if (isNodeValid(id, "right") && isClassValid(+id + 1)) {  // right
        if (isTarget(+id + 1)) {
          document.getElementById(+id + 1).classList.add('right');
          showPathASearch(+id + 1);
          break;
        }
        document.getElementById(+id + 1).classList.add('visited');
        document.getElementById(+id + 1).classList.add('right');
        var distance = document.getElementById(+id + 1).className.replace(/[^\d.-]/g, '');
      
        
    
        const updatedClass = document.getElementById(+id + 1).className.replace(/\d+/g, '');
        document.getElementById(+id + 1).setAttribute('class', updatedClass);
        document.getElementById(+id + 1).lang = distance;

        document.getElementById(+id + 1).classList.add(+distance + 1);
        
        unvisitedNodes.push(document.getElementById(+id + 1));
        await wait(10);
      }


      if (isNodeValid(id, "bottom") && isClassValid(+id + 60)) {  // bottom
        if (isTarget(+id + 60)) {
          document.getElementById(+id + 60).classList.add('bottom');
          showPathASearch(+id + 60);
          break;
        }

        document.getElementById(+id + 60).classList.add('visited');
        document.getElementById(+id + 60).classList.add('bottom');
        var distance = document.getElementById(+id + 60).className.replace(/[^\d.-]/g, '');


        const updatedClass = document.getElementById(+id + 60).className.replace(/\d+/g, '');
        document.getElementById(+id + 60).setAttribute('class', updatedClass);
        document.getElementById(+id + 60).lang = distance;
      
        document.getElementById(+id + 60).classList.add(+distance + 1);
     
        unvisitedNodes.push(document.getElementById(+id + 60));
        await wait(10);
      }
      if (unvisitedNodes[0].className.includes("startNode")){
        unvisitedNodes.shift();
      }
      
      if (document.querySelector(".restartBtn").innerHTML === "Restarting") {
        clearBoard();
        break;
      }
      await wait(100);
  
     
      var cost = 0;
      var cell;
      unvisitedNodes.forEach((x) => {
       
      

        if (cost === 0) {
          if (x.classList.contains("used")){
            return;
          }else{
            cost = x.className.replace(/[^\d.-]/g, '');
            cell = x;
          }
         
          return;
          
         
        }
      

        if (+cost >= +x.className.replace(/[^\d.-]/g, '') ){
          if (x.classList.contains("used")){
            return
          }else{

            cost = +x.className.replace(/[^\d.-]/g, '');
            cell = x;
          }

       
        }
          
        
     
      })
      console.log(cell);
      id = cell.id;
      
      
    }
   
  
  }




  async function showPathASearch(id) {

    var path = [document.getElementById(id)];
    let smallestNode = null;
    var temp = [];

    while (!path[path.length - 1].classList.contains("startNode")) {
      console.log(path);
      id = path.at(-1).id;
      temp = [];
    
      if (document.getElementById(id).classList.contains("top")){
        path.push(document.getElementById(+id + 60));
        continue;
      }

      if (document.getElementById(id).classList.contains("left")){
        path.push(document.getElementById(+id + 1));
        continue;
      }

      if (document.getElementById(id).classList.contains("right")){
        path.push(document.getElementById(id - 1));
        continue;
      }

      if (document.getElementById(id).classList.contains("bottom")){
        path.push(document.getElementById(id - 60));
        continue;
      }




      console.log("check")





      


  
    }


    console.log(path);
    for (let i = 0; i < path.length; i++) {
     
      path[i].style.backgroundColor = "";
      path[i].classList.add("path")
      
      await wait(10);
    }
    setVisualising(false);
    setVisualised(true);


  }



  async function checkHcost(){
   
    var unvisitedNodes = [];
    unvisitedNodes.push(finalNode);

    finalNode.classList.add(0)
    //startNode.classList.remove("startNode")


    while (unvisitedNodes.length) {
      const id = unvisitedNodes[0].id

      if (isNodeValid(id, "top") && isClassValidHCost(id - 60)) {  // top
  
        document.getElementById(id - 60).classList.add('hCost');
        var distance = document.getElementById(id).className.replace(/[^\d.-]/g, '');
        console.log(distance);
        document.getElementById(id - 60).classList.add(+distance + 1);
        unvisitedNodes.push(document.getElementById(id - 60));
     
      }
      if (isNodeValid(id, "left") && isClassValidHCost(id - 1)) {   // left
    
        document.getElementById(id - 1).classList.add('hCost');
        var distance = document.getElementById(id).className.replace(/[^\d.-]/g, '');
        document.getElementById(id - 1).classList.add(+distance + 1);
        unvisitedNodes.push(document.getElementById(id - 1));
    
      }
      if (isNodeValid(id, "right") && isClassValidHCost(+id + 1)) {  // right

        document.getElementById(+id + 1).classList.add('hCost');
        var distance = document.getElementById(+id).className.replace(/[^\d.-]/g, '');
        document.getElementById(+id + 1).classList.add(+distance + 1);
        unvisitedNodes.push(document.getElementById(+id + 1));
  
      }
      if (isNodeValid(id, "bottom") && isClassValidHCost(+id + 60)) {  // down

        document.getElementById(+id + 60).classList.add('hCost');
        var distance = document.getElementById(+id).className.replace(/[^\d.-]/g, '');
        document.getElementById(+id + 60).classList.add(+distance + 1);
        unvisitedNodes.push(document.getElementById(+id + 60));
        
      }
    
   
      unvisitedNodes.shift();
      if (unvisitedNodes.length === 0){
        break;
      }

    }
  }





 
























  async function dijkstra() {

    var unvisitedNodes = [];
    unvisitedNodes.push(startNode);

    startNode.classList.add(0)
    //startNode.classList.remove("startNode")


    while (unvisitedNodes.length) {

      const id = unvisitedNodes[0].id




      if (document.querySelector(".restartBtn").innerHTML === "Restarting") {
        clearBoard();
        break;
      }

      if (isNodeValid(id, "top") && isClassValid(id - 60)) {  // top
        if (isTarget(id - 60)) {

          showPath(id - 60);
          break;
        }
        document.getElementById(id - 60).classList.add('visited');
        var distance = document.getElementById(id).className.replace(/[^\d.-]/g, '');
        document.getElementById(id - 60).classList.add(+distance + 1);
        unvisitedNodes.push(document.getElementById(id - 60));
        await wait(10);
      }
      if (isNodeValid(id, "left") && isClassValid(id - 1)) {   // left
        if (isTarget(id - 1)) {

          showPath(id - 1)
          break;
        }
        document.getElementById(id - 1).classList.add('visited');
        var distance = document.getElementById(id).className.replace(/[^\d.-]/g, '');
        document.getElementById(id - 1).classList.add(+distance + 1);
        unvisitedNodes.push(document.getElementById(id - 1));
        await wait(10);
      }
      if (isNodeValid(id, "right") && isClassValid(+id + 1)) {  // right
        if (isTarget(+id + 1)) {

          showPath(+id + 1)
          break;
        }
        document.getElementById(+id + 1).classList.add('visited');
        var distance = document.getElementById(+id).className.replace(/[^\d.-]/g, '');
        document.getElementById(+id + 1).classList.add(+distance + 1);
        unvisitedNodes.push(document.getElementById(+id + 1));
        await wait(10);
      }
      if (isNodeValid(id, "bottom") && isClassValid(+id + 60)) {  // down
        if (isTarget(+id + 60)) {

          showPath(+id + 60)
          break;
        }
        document.getElementById(+id + 60).classList.add('visited');
        var distance = document.getElementById(+id).className.replace(/[^\d.-]/g, '');
        document.getElementById(+id + 60).classList.add(+distance + 1);
        unvisitedNodes.push(document.getElementById(+id + 60));
        await wait(10);
      }
      if (document.querySelector(".restartBtn").innerHTML === "Restarting") {
        clearBoard();
        break;
      }

      console.log(unvisitedNodes)
      unvisitedNodes.shift();
      if (unvisitedNodes.length === 0) {
        setVisualising(false);
        setVisualised(true)
      }
    }

  }







  function isTarget(id) {
    const node = document.getElementById(id);

    if (node.classList.contains("finalNode")) {
      return true;
    } else {
      return false;
    }

  }

  async function showPath(id) {

    var path = [document.getElementById(id)];
    let smallestNode = null;
    var temp = [];

    while (!path.at(-1).classList.contains("startNode")) {
      id = path.at(-1).id;
      temp = [];
    
      if (isNodeValid(id, "top")) {  // top
        temp.push(document.getElementById(id - 60));

      }
      if (isNodeValid(id, "left")) {   // left
        temp.push(document.getElementById(id - 1));

      }
      if (isNodeValid(id, "right")) {  // right
        temp.push(document.getElementById(+id + 1));

      }
      if (isNodeValid(id, "bottom")) {  // down
        temp.push(document.getElementById(+id + 60));

      }

      console.log("check")

      if (temp.length === 1) {

        break;
      }

    
      for (let i = 0; i < temp.length; i++) {

        if (temp[i].className.replace(/[^\d.-]/g, '') === '') {

          continue;
        }
        if (!smallestNode) {
          smallestNode = temp[i];
        }



        if (+smallestNode.className.replace(/[^\d.-]/g, '') > +temp[i].className.replace(/[^\d.-]/g, '')) {
          smallestNode = temp[i];
        }

      }
      path.push(smallestNode);
    }



    for (let i = 0; i < path.length; i++) {
      path[i].classList.add("path")
      await wait(10);
    }
    setVisualising(false);
    setVisualised(true);


  }


  function isClassValidHCost(id) {
    const node = document.getElementById(id);

    if (node.classList.contains("hCost")) {
      return false;
    } else {
      return true;
    }
  }


  function isClassValid(id) {
    const node = document.getElementById(id);

    if (node.classList.contains("visited") || node.classList.contains("wall") || node.classList.contains("startNode")) {
      return false;
    } else {
      return true;
    }
  }



  function isNodeValid(id, type) {

    const node = document.getElementById(id);


    if (type === "top") {
      if (+node.id > 59) {
        return true;
      } else {
        return false;
      }
    }

    if (type === "left") {
      for (let i = 0; i <= 29; ++i) {
        if (+node.id === i * 60) {
          return false;
        }
      }
      return true;
    }

    if (type === "right") {
      for (let i = 0; i <= 29; i++) {
        if (+node.id === 59 + i * 60) {
          return false;

        }
      }
      return true;
    }

    if (type === "bottom") {
      if (+node.id < 1740) {
        return true;
      } else {
        return false;
      }
    }

  }

  const wait = (ms) => {
    return new Promise(resolve => {
      setTimeout(() => { resolve('') }, ms)
    })
  }

  return (
    <div className="pathFinder">
       
      <Navbar setAlgo={setAlgo} clearBoard={clearBoard}/> 
      {algo !== "Dijkstra 2" ?
       <div className="nodeBtn">
         <button className='button' id='btnStart' onClick={() => {setChoosingFinal(false);setChoosingWall(false) }}>Start <div className="node startNode"></div></button>
         <button className='button' id='btnFinal' onClick={() => {setChoosingFinal(true);setChoosingWall(false) }}>Target <div className="node finalNode"></div></button>
         <button className='button' id='btnWall' onClick={() => {setChoosingWall(true); setChoosingFinal(false)}}>Wall <div className="node wall"></div></button>
       </div>
      :
       <div className="Input">
        <label htmlFor="">Z uzlu </label>
        <input style={{width: "40px", textTransform: "uppercase"}} type="text" onChange={(e) => setStartNode2(e.target.value)}/>
        <label htmlFor=""> do uzlu </label>
        <input style={{width: "40px", textTransform: "uppercase"}} type="text" onChange={(e) => setEndNode(e.target.value)}/>
       </div>
      }
     

      <div className='algoName'>Algo: <div className='text'>{algo}</div></div>

      {algo !== "Dijkstra 2" ? 
      
      <div className='Grid'>
      
        {nodes.map((node) => {
          return node
       })}


       </div> 
       : 
      <Dijkstra2 startNodeId={startNode2} endNode={endNode}/>}
      

      {algo !== "Dijkstra 2" ?
       <div className="buttons">
       <Settings algo={algo} dijkstra={dijkstra} aSearch={aSearch} setVisualising={setVisualising} clearBoard={clearBoard} btnText={btnText} setBtnText={setBtnText} setRestart={setRestart} startNode={startNode} visualised={visualised} visualizing={visualizing}/>

       </div>
      :
      null
      }
     

    </div>
  )
}

export default Grid