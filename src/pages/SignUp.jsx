import { useState, useEffect } from "react";
import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            setErrorMsg("");
        }, 4000);
    }, [errorMsg]);
    const handleSignUp = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMsg("Passwords do not match");
            return;
        }
        if (password.length < 8) {
            setErrorMsg("Password must be at least 8 characters long.");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                set(ref(db, user.uid), {
                    id: user.uid,
                    username: name,
                    height: 0,
                    weight: 0,
                    diet: "",
                    disease: "[]",
                    preferedDiet: "[]",
                    preferedWorkOut: "[]",
                    gender: "",
                });
                sendEmailVerification(user);
                //add toastify to display email verification link is sent
                alert("Email verification link has been sent.");
                auth.signOut();
                navigate("/login"); // Redirect to login page after sign up
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/email-already-in-use":
                        setErrorMsg("Email is already in use.");
                        break;
                    case "auth/invalid-email":
                        setErrorMsg("Invalid email address.");
                        break;
                    case "auth/weak-password":
                        setErrorMsg(
                            "Password is too weak. Please choose a stronger password."
                        );
                        break;
                    case "auth/missing-email":
                        setErrorMsg("Email is required.");
                        break;
                    default:
                        setErrorMsg("An error occurred. Please try again.");
                }
            });
    };
    return (
        <div className="page">
            <h1 className="page_h">CREATE ACCOUNT</h1>
            <input
                type="text"
                placeholder="Enter Name"
                className="info"
                value={name}
                onChange={(e) => {
                    setName(e.target.value);
                }}
            />
            <input
                type="email"
                placeholder="Enter Email"
                className="info"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <input
                type="password"
                placeholder="Enter Password"
                className="info"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <input
                type="password"
                placeholder="Confirm Password"
                className="info"
                value={confirmPassword}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                }}
            />
            <p>{errorMsg}</p>
            <button className="login_button" onClick={(e) => handleSignUp(e)}>
                <b>SIGN UP</b>
            </button>
        </div>
    );
};
export default SignUp;
