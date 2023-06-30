import "./App.css";
import Home from "./components/homepage/Home";
import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Login />
      {/* <Home /> */}
    </div>
  );
}

export default App;
