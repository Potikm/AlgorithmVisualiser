import './App.css';
import Algos from './components/Algos';
import { HashRouter, Routes, Route } from "react-router-dom";
import PathFinder from './components/Path_finder/PathFinder';
import Menu from './components/Menu';
import DSA from './components/DSA/DSA';


function App() {











  return (
    <HashRouter >
      <div className="App">


        <Routes>
          <Route path='/' element={<Menu />}></Route>
          <Route path='/Alghorithms' element={<Algos />}></Route>
          <Route path='/Path_Finder' element={<PathFinder />}></Route>
        

        </Routes>



        <div className="creator">
          <p> Made by <br /> <a href="https://github.com/Potikm">PotikM</a></p>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
