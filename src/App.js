import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./App.css";
import { Route,Routes } from "react-router-dom";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Diet from "./components/Diet";
import AllWorkout from "./components/AllWorkout";
import Height from "./components/Height";
import Weight from "./components/Weight";
import Diease from "./components/Diease";
import WorkOutCard from "./components/WorkOutCard";
import WorkOutDisplay from "./components/WorkOutDisplay";
import FoodCard from "./components/FoodCard";
import FoodDisplay from "./components/FoodDisplay";
import Profile from "./components/Profile";
import Streake from "./components/Streake";
function App() {
	return (
		<Routes>
			<Route path="/" element={<Login/>}/>
			<Route path="/home" element={<Home/>}/>
		</Routes>
	);
}
export default App;
