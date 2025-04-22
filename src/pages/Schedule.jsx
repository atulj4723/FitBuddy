import { useContext, useState, useEffect } from "react"; 
import { DataContext } from "../DataContext";
import WorkoutData from "../data/WorkoutData";
import WorkOutCard from "../components/WorkOutCard";

const Schedule = () => {
    const { data } = useContext(DataContext);
    const { preferedWorkOut, goal } = data;

    // Filter workout data based on preferred workouts
    const workoutData = WorkoutData.filter((exercise) =>
        JSON.parse(preferedWorkOut).includes(exercise.name)
    );

    // Get the current day name
    const date = new Date().getDay();
    const day = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const dayName = day[date];

    const [schedule, setSchedule] = useState([]);

    // Use useEffect to set the schedule based on the day
    useEffect(() => {
        if (dayName === "Monday") {
            setSchedule(
                workoutData.filter(
                    (exercise) =>
                        exercise.bodyPart === "back" ||
                        (exercise.bodyPart === "cardio" &&
                            goal === "Loss weight")
                )
            );
        } else if (dayName === "Tuesday") {
            setSchedule(
                workoutData.filter(
                    (exercise) =>
                        exercise.bodyPart === "lower arms" ||
                        exercise.bodyPart === "upper arms" ||
                        (exercise.bodyPart === "cardio" &&
                            goal === "Loss weight")
                )
            );
        } else if (dayName === "Wednesday") {
            setSchedule(
                workoutData.filter(
                    (exercise) =>
                        exercise.bodyPart === "chest" ||
                        (exercise.bodyPart === "cardio" &&
                            goal === "Loss weight")
                )
            );
        } else if (dayName === "Thursday") {
            setSchedule(
                workoutData.filter(
                    (exercise) =>
                        exercise.bodyPart === "lower arms" ||
                        exercise.bodyPart === "upper arms" ||
                        (exercise.bodyPart === "cardio" &&
                            goal === "Loss weight")
                )
            );
        } else if (dayName === "Friday") {
            setSchedule(
                workoutData.filter(
                    (exercise) =>
                        exercise.bodyPart === "shoulders" ||
                        (exercise.bodyPart === "cardio" &&
                            goal === "Loss weight")
                )
            );
        } else if (dayName === "Saturday") {
            setSchedule(
                workoutData.filter(
                    (exercise) =>
                        exercise.bodyPart === "lower legs" ||
                        exercise.bodyPart === "neck" ||
                        exercise.bodyPart === "waist" ||
                        exercise.bodyPart === "upper legs" ||
                        (exercise.bodyPart === "cardio" &&
                            goal === "Loss weight")
                )
            );
        } else if (dayName === "Sunday") {
            setSchedule([]);
        }
    }, []);

    return (
        <div>
            <h1 className="schedule_title">Workout Schedule For {dayName}</h1>
            <div className="schedule">{schedule.length > 0 ? (
                schedule.map((exercise, index) => (
                    <WorkOutCard key={index} exercise={exercise} />
                ))
            ) : (
                <p>No workouts scheduled for today.</p>
            )}</div>
        </div>
    );
};

export default Schedule;
