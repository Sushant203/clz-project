import "./App.css";
import Home from "./components/homepage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import About from "./components/homepage/About";
import Contact from "./components/homepage/Contact";
import AvailableCabs from "./components/homepage/AvailableCabs";
import Signup from "./components/login/Signup";
// import Dashboard from "./components/navbar/Dashboard";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/availablecabs" element={<AvailableCabs />} />
            {/* <Route path="/Dashboard" element={<Dashboard />} /> */}
          </Route>
        </Routes>
      </Router>
      {/* <Signup /> */}
    </div>
  );
}

export default App;
