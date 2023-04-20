import "./App.css";
import { Landing } from "./components/Landing/Landing";
import { Home } from "./components/Home/Home";
import { Nav } from "./components/NavBar/Nav";
import {Routes, Route, useLocation} from "react-router-dom"


function App() {
  const location = useLocation()
  return (
    <div className="App">
      
      {
        location.pathname === "/" ? <div> </div> : <div> <Nav/> </div>
      }
      
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/home" element={<Home/>} />
      </Routes>
    </div>
  );
}

export default App;
