import React, { useContext, useEffect, useState } from "react";
import Disease from "../components/Disease";
import Diet from "../components/Diet";
import Height from "../components/Height";
import Weight from "../components/Weight";
import { ref, set } from "firebase/database";
import { db } from "../Firebase";
import { DataContext } from "../DataContext";
import ChatGptDiet from "../ai/ChatGptDiet";
import DietData from "../data/DietData";
import Goal from "../components/Goal";
import ChatGptWorkout from "../ai/ChatGptWorkOut";
import WorkoutData from "../data/WorkoutData";
const Data = () => {
    const [disease, setDisease] = useState([]);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [diet, setDiet] = useState("");
    const [step, setStep] = useState(0);
    const [goal, setGoal] = useState("");
    const { data } = useContext(DataContext);
    const [preferedDiet, setPreferedDiet] = useState([]);
    const [preferedWorkOut, setPreferedWorkOut] = useState([]);
    const [saveData, setSaveData] = useState(false);
    const dietList = DietData.map((cur) => cur.name);
    const exerciseList = WorkoutData.map((cur) => cur.name);

    useEffect(() => {
        if (saveData) {
            set(ref(db, data.id), {
                id: data.id,
                username: data.name,
                height: height,
                weight: weight,
                diet: diet,
                disease: JSON.stringify(disease),
                preferedDiet: JSON.stringify(preferedDiet),
                preferedWorkOut: JSON.stringify(preferedWorkOut),
                goal: goal,
            });
        }
    }, [step, data, height, weight, diet, disease]);
    useEffect(() => {
        if (
            step === 5 &&
            weight > 0 &&
            height > 0 &&
            diet.length > 0 &&
            goal.length > 0
        ) {
            const load_data = async () => {
                try {
                    const filteredDiet = await ChatGptDiet(
                        dietList,
                        disease,
                        height,
                        weight,
                        goal
                    );
                    setPreferedDiet(filteredDiet);
                    const filteredWorkout = await ChatGptWorkout(
                        exerciseList,
                        height,
                        weight,
                        disease,
                        goal
                    );
                    setPreferedWorkOut(filteredWorkout);
                    setSaveData(true); // Trigger Firebase save
                } catch (error) {
                    console.error("Error fetching AI data:", error.message);
                }
            };
            load_data();
        }
    }, [step, weight, height, diet, goal, dietList, disease, exerciseList]);

    return (
        <div>
            {step === 0 && (
                <>
                    <Diet setDiet={setDiet} diet={diet} />
                    <Disease setDisease={setDisease} disease={disease} />
                </>
            )}
            {step === 1 && <Height setHeight={setHeight} height={height} />}
            {step === 2 && <Weight setWeight={setWeight} weight={weight} />}
            {step === 3 && <Goal setGoal={setGoal} goal={goal} />}
            {step === 4 && (
                <>
                    <ul>Height:{height}</ul>
                    <ul>Weight:{weight}</ul>
                    <ul>Diet:{diet}</ul>
                    <ul>
                        Disease:
                        {disease.length === 0
                            ? "No Diseases"
                            : disease.join(",")}
                    </ul>
                    <ul>Goal:{goal}</ul>
                </>
            )}

            {step === 5 && <>Data is saving </>}
            <div>
                <button
                    onClick={() => (step > 0 ? setStep(step - 1) : setStep(0))}>
                    Previous
                </button>
                <button
                    onClick={() => (step < 5 ? setStep(step + 1) : setStep(5))}>
                    next
                </button>
            </div>
        </div>
    );
};

export default Data;
