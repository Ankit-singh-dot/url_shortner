import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Allurl from "./pages/Allurl";
import "./App.css";
import MousePointer from "./components/MousePointer";

function App() {
  return (
    <>
      <MousePointer />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/getAllUrl" element={<Allurl />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
