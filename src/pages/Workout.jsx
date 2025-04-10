import WorkOutCard from "../components/WorkOutCard";
import WorkoutData from "../data/WorkoutData";
const Workout = () => {
	return <div className="">{
		WorkoutData.map((exercise, index) => (
			<WorkOutCard key={index} exercise={exercise} />
		))
	}</div>;
};
export default Workout;