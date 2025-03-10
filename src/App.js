import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Diet from "./pages/Diet";
import Workout from "./pages/Workout";
import Schedule from "./pages/Schedule";
import WorkOutDisplay from "./pages/WorkOutDisplay";
import DietDisplay from "./pages/DietDisplay";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
function App() {
	return (
		<Routes>
			<Route path="/" element={<SignUp />} />
			<Route path="/home" element={<Home />} />
			<Route path="/diet" element={<Diet />} />
			<Route path="/login" element={<Login />} />
			<Route path="/workout" element={<Workout />} />
			<Route path="/workoutdetails/:id" element={<WorkOutDisplay />} />
			<Route path="/dietdetails/:id" element={<DietDisplay />} />
			<Route path="/schedule" element={<Schedule />} />
			<Route path="/profile" element={<Profile />} />
			<Route path="/*" element={<PageNotFound />} />
		</Routes>
	);
}
export default App;
