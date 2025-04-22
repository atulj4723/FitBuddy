import { useParams } from "react-router-dom";
import WorkoutData from "../data/WorkoutData";

const WorkOutDisplay = () => {
    const { id } = useParams();
    const exercise = WorkoutData.find(
        (exercise) => exercise.id === parseInt(id)
    );
    if (!exercise) {
        return <div>Exercise not found</div>;
    }
    return (
        <div className="workoutdisplay">
            {exercise.gifUrl.endsWith(".mp4") ? (
                <video
                    className="workout_vdo"
                    width="300px"
                    height="300px"
                    loop
                    muted
                    autoplay="autoplay">
                    <source src={`.${exercise.gifUrl}`} type="video/mp4" />
                </video>
            ) : (
                <img className="workout_img" src={`.${exercise.gifUrl}`} />
            )}
            <h1 className="workout_h">{exercise.name}</h1>
            <h2 className="workout_h1">WorkOut muscle: {exercise.target}</h2>
            <h2 className="workout_h1">
                workout secondary muscle: {exercise.secondaryMuscles}
            </h2>
            <h1 className="workout_h1">
                Workout bodypart: {exercise.bodyPart}
            </h1>
            <h2 className="workout_h1">
                required machine: {exercise.equipment}
            </h2>
            <h2 className="workout_h1">instruction:</h2>
            <div className="workout_h2">
                {exercise.instructions.map((instruction, index) => (
                    <p key={index}>{instruction}</p>
                ))}
            </div>
        </div>
    );
};
export default WorkOutDisplay;
