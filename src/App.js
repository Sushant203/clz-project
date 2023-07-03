import "./App.css";
import Home from "./components/homepage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import About from "./components/homepage/About";
import Contact from "./components/homepage/Contact";
import AvailableCabs from "./components/homepage/AvailableCabs";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/available cabs" element={<AvailableCabs />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
