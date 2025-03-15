import { useContext } from "react";
import { DataContext } from "../DataContext";

const Profile = () => {
	const data = useContext(DataContext);
	return (
		<>
			<image src="" className="profile_pic"/>
			<h1>name</h1>
			<h2>height</h2>
			<h2>weight</h2>
			<h2>disease</h2>
			<h2>bmi</h2>
			<h2>body fat</h2>
			<button>Edit</button>
		</>
	);
};
export default Profile;
