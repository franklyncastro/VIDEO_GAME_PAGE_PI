import "./App.css";
// import { Home } from "./components/Home/Home";
import { Nav } from "./components/NavBar/Nav";
// import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      {/* <Routes>
        <Route to="/home" element={<Home />} />
      </Routes> */}
    </div>
  );
}

export default App;
