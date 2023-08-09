import "./App.css";
import Home from "./components/homepage/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import About from "./components/homepage/About";
import Contact from "./components/homepage/Contact";
import AvailableCabs from "./components/homepage/AvailableCabs";
import Signup from "./components/login/Signup";
import Dashboard from "./components/navbar/Dashboard";
import Login from "./components/login/Login";
import "react-toastify/dist/ReactToastify.css";
import Previewbooking from "./components/homepage/Previewbooking";
import SingleDashboard from "./components/navbar/SingleDashboard";
import Setting from "./components/setting/Setting";
import EditProfile from "./components/setting/profile/EditProfile";
import ViewProfile from "./components/setting/profile/ViewProfile";


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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/previewbooking" element={<Previewbooking />} />
            <Route path='/singledash/:userid/:bid' element={<SingleDashboard />} />
            {/* <Route path='/setting' element={<Setting />} /> */}
            <Route path='/profile/editprofile/:id' element={<EditProfile />} />
            <Route path="/profile/:id" element={<ViewProfile />} />
          </Route>
        </Routes>
      </Router>
      {/* <Signup />   */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
