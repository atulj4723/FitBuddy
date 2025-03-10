import { useParams } from "react-router-dom";

const WorkOutDisplay = () => {
	const { id } = useParams();
	return (
		<>
			<img src="yugf" />
			<h1>workoutname</h1>
			
			<h2>WorkOut muscle</h2>
			<h2>workout secondary muscle</h2>
			<h1>Workout bodypart</h1>
			<h2>required machine</h2>
			<h2>instruction</h2>
			<div>
				<h3>st1</h3>
				<h3>st1</h3>
				<h3>st1</h3>
				<h3>st1</h3>
			</div>
		</>
	);
};
export default WorkOutDisplay;
