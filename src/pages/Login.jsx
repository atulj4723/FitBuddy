import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../Firebase";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loginHandle = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message on new login attempt
        setLoading(true); // Set loading to true
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            if (user.emailVerified) {
                console.log("SignIn successful");
                navigate("/home");
            } else {
                await auth.signOut();
                setErrorMessage("Please verify your email before logging in.");
            }
        } catch (error) {
            switch (error.code) {
                case 'auth/user-not-found':
                    setErrorMessage("No user found with this email.");
                    break;
                case 'auth/wrong-password':
                    setErrorMessage("Incorrect password. Please try again.");
                    break;
                default:
                    setErrorMessage("An error occurred. Please try again.");
            }
            console.error("Login error:", error.code, error.message);
        } finally {
            setLoading(false); // Reset loading state
        }
    };
    return (
        <div className="Intro_account">
            <div className="page">
                <h1>Welcome Back</h1>
                <br />
                <input
                    type="email"
                    placeholder="Enter Email"
                    className="info"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter password"
                    className="info"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMessage && (
                    <p className="error-message">{errorMessage}</p>
                )}
                <button 
                    className="login_button" 
                    onClick={loginHandle}
                    disabled={loading} // Disable button while loading
                >
                    {loading ? "Logging In..." : "Log In"}
                </button>
                <p>or</p>
                <div className="login_google">Continue with Google</div>
            </div>
        </div>
    );
};
export default Login;