import React, { useEffect } from 'react'
import Knot from './Knot'
import Line from './Line'

const Dijkstra2 = ({startNodeId, endNode}) => {

    useEffect(() => {

      var lines = new Set([
        ...document.querySelectorAll(".linex"),
        ...document.querySelectorAll(".liney")
      ]);
      lines = Array.from(lines)
      
      const paths = document.querySelectorAll(".pathCost")
      paths.forEach((x) => {
        x.value = Math.floor(Math.random() * 100) + 20;
      })

     
   
    }, [])



    var passedNode = {
      node: "",
      distance: 0,
      previousNode: ""

    }


    async function visualiseDijkstra()
    {
      var ids = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"]
      console.log(startNodeId)
      if (!ids.includes(startNodeId.toUpperCase())){
        return;

      }
      if (!ids.includes(endNode.toUpperCase())){
        return;

      }

      var startNode = document.getElementById(startNodeId.toUpperCase())
      var passedNodes = [];
      var chart = []; 
      chart.push({ node: startNodeId.toUpperCase(), distance: 0, previousNode: "0" });
      passedNodes.push(startNodeId.toUpperCase());

      var lines = new Set([
        ...document.querySelectorAll(".linex"),
        ...document.querySelectorAll(".liney")
      ]);
      lines = Array.from(lines)
      
      lines.forEach((x) => {
        x.style.background = "black"
      })

      var unvisitedNodes = new Set([
        ...document.querySelectorAll(".Knot")
       
      ]);
      unvisitedNodes = Array.from(unvisitedNodes)

      
      document.querySelectorAll(".Knot").forEach((x) => {
        if (x.id !== passedNodes[0]){
          chart.push({ node: x.id, distance: Infinity, previousNode: "" })
        }
    
      })
    


      var Lines = new Set([
        ...document.querySelectorAll(".pathCost")
     
      ]);

     
     
      


      while(unvisitedNodes.length != 0)
      {
        var nextNode;
        Lines.forEach((x) => {
          var lineId = x.id;
          var startNodeId = startNode.id;
          if (lineId.includes(startNodeId)){
            var tempId = lineId.replace(startNodeId, "")
            chart.forEach(async (x) => {
              if (x.node == tempId){

                var distance;
                chart.forEach((y) => {
                  if (y.node == startNodeId){
                    distance = y.distance;
                  }
                })
                if (unvisitedNodes.includes(document.getElementById(x.node))){
                  if (+x.distance > +distance + +document.getElementById(lineId).value){
                    x.distance = +distance + +document.getElementById(lineId).value;
                    x.previousNode = startNodeId;
                  }
                
                }

                
               
            
                
              }
            })

          }
  

        

         
        })

        var index = unvisitedNodes.indexOf(startNode)
        unvisitedNodes.splice(index, 1);
  

        var num = 0;
        chart.forEach((x) => {
        
          if (x.distance != Infinity && unvisitedNodes.includes(document.getElementById(x.node))){
            if (!num){
              num = x.distance;
              nextNode = document.getElementById(x.node)
            }else{
              if (+num > +x.distance && unvisitedNodes.includes(document.getElementById(x.node))){
                num = x.distance
                nextNode = document.getElementById(x.node)
              }
            }
           
          }
        })


        startNode = nextNode;
        passedNodes.push(startNode);

      }
      console.log("check");
      console.log(chart)
      var targetNode = endNode.toUpperCase();


      while (targetNode != startNodeId.toUpperCase()){
        chart.forEach((x) => {
          if (x.node == targetNode){
            const pathCosts = document.querySelectorAll(".pathCost")
  
            pathCosts.forEach((y) => {
              if (y.id.includes(x.previousNode) && y.id.includes(targetNode) && targetNode != x.previousNode){
                console.log(targetNode + " " + x.previousNode)
                var parentDiv = y.parentNode;
                parentDiv.style.background = "red"
  
                targetNode = x.previousNode;
                
              }
            })
            
          }
        })
      }
     





    




    }

    function clearBoard(){
         var lines = new Set([
        ...document.querySelectorAll(".linex"),
        ...document.querySelectorAll(".liney")
      ]);
      lines = Array.from(lines)
      
      lines.forEach((x) => {
        x.style.background = "black"
      })
      const paths = document.querySelectorAll(".pathCost")
      paths.forEach((x) => {
        x.value = Math.floor(Math.random() * 100) + 20;
      })
    }




  return (
    <div className='Dijkstra2'>

     
      <div className="column" style={{flexDirection: "column"}}>
       <div className="knowColumn">
        <Knot id={"A"}/>
         <Line className={"linex"} id={"AB"}/>
        <Knot id={"B"}/>
        <Line className={"linex"} id={"BC"}/>
        <Knot id={"C"}/>
        <Line className={"linex"} id={"CD"}/>
        <Knot id={"D"}/>
       </div>
        <div className="lines">
        <Line className={"liney"} id={"AE"}/>
        <Line className={"liney"} id={"BF"}/>
        <Line className={"liney"} id={"CG"}/>
        <Line className={"liney"} id={"DH"}/>
        </div>

       <div className="knowColumn">
        <Knot id={"E"}/>
        <Line className={"linex"} id={"EF"}/>
        <Knot id={"F"}/>
        <Line className={"linex"} id={"FG"}/>
        <Knot id={"G"}/>
        <Line className={"linex"} id={"GH"}/>
        <Knot id={"H"}/>
       </div>
       <div className="lines">
        <Line className={"liney"} id={"EI"}/>
        <Line className={"liney"} id={"FJ"}/>
        <Line className={"liney"} id={"GK"}/>
        <Line className={"liney"} id={"HL"}/>
        </div>
        <div className="knowColumn">
        <Knot id={"I"}/>
        <Line className={"linex"} id={"IJ"}/>
        <Knot id={"J"}/>
        <Line className={"linex"} id={"JK"}/>
        <Knot id={"K"}/>
        <Line className={"linex"} id={"KL"}/>
        <Knot id={"L"}/>
       </div>
      </div>

      <div className="buttons">
             <button className='visualiseBtn'
             style={startNodeId && endNode  ? {} : { pointerEvents: 'none', opacity: '0.3' }}
              onClick={() => {visualiseDijkstra()}}>
               Visualise!
            </button>
            
            <button className='restartBtn' onClick={() => {clearBoard()}}>Restart</button>
        
      </div>
    

       
       
       
     
    
      
    
       
       
    
    </div>
  )
}

export default Dijkstra2