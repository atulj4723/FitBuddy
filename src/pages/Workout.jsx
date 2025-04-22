import WorkOutCard from "../components/WorkOutCard";
import WorkoutData from "../data/WorkoutData";
const Workout = () => {
	
	return <div className="workout">{
		WorkoutData.map((exercise, index) => (
			<div className="workout1"><WorkOutCard key={index} exercise={exercise} /></div>
		))
	}</div>;
};
export default Workout;