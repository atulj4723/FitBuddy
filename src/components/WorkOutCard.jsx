import { useNavigate } from "react-router-dom";

const WorkOutCard = ({ exercise }) => {
    const navigate = useNavigate();
    return (
        <div className="workout_card" onClick={() => {
            navigate(`/workout/${exercise.id}`)
        }}>
            {exercise.gifUrl.endsWith(".mp4") ? (
                <video
                    className="workout_vdo"
                    width="300px"
                    height="300px"
                    loop
                    muted
                    autoplay="autoplay">
                    <source src={exercise.gifUrl} type="video/mp4" />
                </video>
            ) : (
                <img className="workout_img" src={exercise.gifUrl} />
            )}

            <h1 className="workout_name">{exercise.name}</h1>
            <h2 className="workout_muscle">
                {exercise.secondaryMuscles.join(", ")}
            </h2>
            <h1 className="workout_part">{exercise.bodyPart}</h1>
        </div>
    );
};
export default WorkOutCard;
