import { BrowserRouter, Routes, Route } from "react-router-dom"
// pages and components
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AddWorkout from "./pages/AddWorkout";
import Feed from "./pages/Feed"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages" > 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addworkout" element={<AddWorkout />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
