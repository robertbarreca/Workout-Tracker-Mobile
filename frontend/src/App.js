import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./hooks/useAuthContext";
// pages and components
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AddWorkout from "./pages/AddWorkout";
import Feed from "./pages/Feed"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages" > 
          <Routes>
            <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
            <Route path="/addworkout" element={user ? <AddWorkout /> : <Navigate to="/login" />} />
            <Route path="/feed" element={user ? <Feed />: <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={! user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
