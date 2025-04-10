const WorkOutCard = ({exercise}) => {
	return (
		<>
			<img src={exercise.gifUrl} alt={exercise.name}/>
            <h1>{exercise.name}</h1>
            <h2>{exercise.secondaryMuscles.join(",")}</h2>
            <h1>{exercise.bodyPart}</h1>
		</>
	);
};
export default WorkOutCard;
