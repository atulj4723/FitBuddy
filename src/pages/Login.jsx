import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState ,useEffect} from "react";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../DataContext";
import { ref, get, child } from "firebase/database";
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { data, setData } = useContext(DataContext);
useEffect(()=>{
    setTimeout(()=>{
        setErrorMessage("");
    },4000)
},[errorMessage])
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
            const userRef = ref(db, user.uid);
            if (user.emailVerified) {
                const userRef = ref(db, user.uid);
                const snapshot = await get(userRef);
                if (snapshot.exists()) {
                    setData(snapshot.val());
                    const userData=snapshot.val();
                    if(userData.height!=0){
                        navigate("/home");
                        }else{
                        navigate("/data")}
                } else {
                    setErrorMessage("User data not found.");
                }
            } else {
                await auth.signOut();
                
                setErrorMessage("Please verify your email before logging in.");
            }
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    setErrorMessage("No user found with this email.");
                    break;
                case "auth/wrong-password":
                    setErrorMessage("Incorrect password. Please try again.");
                    break;
                case "auth/invalid-credential":
                    setErrorMessage("Invalid Credentials. Please try again.");
                    break;
                default:
                    setErrorMessage("An error occurred. Please try again.");
            }
           
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
                    placeholder="Enter Password"
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
                ><b>
                    {loading ? "Logging In..." : "LOG IN"}
                    </b>
                </button>
                <p>OR</p>
                <div className="login_google">Continue with Google</div>
            </div>
        </div>
    );
};
export default Login;
