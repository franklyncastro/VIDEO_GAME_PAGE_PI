import "./App.css";
import {Routes, Route, useLocation} from "react-router-dom"
import { Nav } from "./components/NavBar/Nav";
import { Landing } from "./components/Landing/Landing";
import { Home } from "./components/Home/Home";
import { About } from "./components/About/About";
import { Form } from "./components/Form/Form";
import { Social } from "./components/Social/Social";

import axios from 'axios'
import Detail from "./components/Detail/Detail";

axios.defaults.baseURL ='http://localhost:3001/'



function App() {
  const location = useLocation();
  return (
    <div className="App">
      
      {
        location.pathname === "/" ? <div> </div> : <div> <Nav/> </div>
      }
      
      <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/videogames" element={<Home/>} />
        <Route exact path="/detail/:id" element={<Detail/>} />
        <Route exact path="/form" element={<Form/>} />
        <Route exact path="/about" element={<About/>} />
        <Route exact path="/contact" element={<Social/>} />
      </Routes>
    </div>
  );
}

export default App;
