import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Diet from "./pages/Diet";
import Data from "./pages/Data";
import Workout from "./pages/Workout";
import Schedule from "./pages/Schedule";
import WorkOutDisplay from "./pages/WorkOutDisplay";
import DietDisplay from "./pages/DietDisplay";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Introduction from "./pages/Introduction";
import Footer from "./components/Footer";
import Header from "./components/Header";
function App() {
	return (
		<>
			<Routes>
				<Route path="/SignUp" element={<SignUp />} />
				<Route path="/" element={<Introduction />} />
				<Route path="/home" element={<Home />} />
				<Route path="/diet" element={<Diet />} />
				<Route path="/data" element={<Data />} />
				<Route path="/login" element={<Login />} />
				<Route path="/workout" element={<Workout />} />
				<Route path="/workout/:id" element={<WorkOutDisplay />} />
				<Route path="/diet/:id" element={<DietDisplay />} />
				<Route path="/schedule" element={<Schedule />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/*" element={<PageNotFound />} />
				<Route path="/temp" element={<></>}/>
			</Routes>
			<Header />
			<Footer />

		</>
	);
}
export default App;
