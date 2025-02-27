import { useContext } from "react";
import { DataContext } from "../DataContext";

const Profile = () => {
	const data = useContext(DataContext);
	return (
		<>
			<image src="" />
			<h1>{data.name}</h1>
			<h2>height</h2>
			<h2>weight</h2>
			<h2>bmi</h2>
		</>
	);
};
export default Profile;
