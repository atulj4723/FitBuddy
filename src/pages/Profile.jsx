import { useContext } from "react";
import { DataContext } from "../DataContext";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";

const Profile = () => {
    const { data, setData } = useContext(DataContext);

    const navigate = useNavigate();
    return (
        <div className="profile">
            {/* <image src="" className="profile_pic"/> */}
            <h1 className="user_name">{"" || data.username}</h1>
            <pre className="user_data">Height: {data.height} cm.</pre>
            <pre className="user_data">Weight: {data.weight} kg.</pre>
            <pre className="user_data">Gender : {data.gender}</pre>{" "}
            <pre className="user_data">Age: {data.age} years.</pre>
            <pre className="user_data">Diet : {data.diet}</pre>
            <pre className="user_data">Goal : {data.goal}</pre>
            <pre className="user_data">
                Disease:
                {JSON.parse(data.disease).length == 0 ? (
                    <>healthy body</>
                ) : (
                    JSON.parse(data.disease).join(",")
                )}
            </pre>
            <button
                className="profile_button"
                onClick={() => {
                    navigate("/data");
                }}>
                Edit
            </button>
            <button
                className="profile_button"
                onClick={() => {
                    auth.signOut();
                }}>
                LogOut
            </button>
        </div>
    );
};
export default Profile;
