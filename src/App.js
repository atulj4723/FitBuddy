import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import "./App.css";
import { Route, Routes, Navigate } from "react-router-dom";
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
import { auth, db } from "./Firebase";
import { useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { DataContext } from "./DataContext";
import { get, ref } from "firebase/database";

function App() {
    const [user, setUser] = useState();
    const { data, setData } = useContext(DataContext);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                const userRef = ref(db, currentUser.uid);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setData(snapshot.val());
                }
            }
            setLoading(false);
        });
    }, []);
    if (loading) {
        return <div>Loading...</div>; //  Show loading indicator
    }

    return (
        <>
            
            <Routes>
                <Route path="/" element={<Introduction />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/data" element={<Data />} />
                <Route path="/diet" element={<Diet />} />
                <Route path="/workout" element={<Workout />} />
                <Route path="/workout/:id" element={<WorkOutDisplay />} />
                <Route path="/diet/:id" element={<DietDisplay />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/*" element={<PageNotFound />} />
            </Routes>
        </>
    );
}
export default App;
