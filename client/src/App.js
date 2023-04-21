import "./App.css";
import { Landing } from "./components/Landing/Landing";
import { Home } from "./components/Home/Home";
import { Nav } from "./components/NavBar/Nav";
import {Routes, Route, useLocation} from "react-router-dom"
import { Detail } from "./components/Detail/Detail";
import { Form } from "./components/Form/Form";




function App() {
  const location = useLocation();
  return (
    <div className="App">
      
      {
        location.pathname === "/" ? <div> </div> : <div> <Nav/> </div>
      }
      
      <Routes>
        <Route exact path="/" element={<Landing/>}/>
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/detail" element={<Detail/>} />
        <Route exact path="/form" element={<Form/>} />
      </Routes>
    </div>
  );
}

export default App;
