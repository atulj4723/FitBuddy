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
const Data = () => {
    const [disease, setDisease] = useState([]);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [diet, setDiet] = useState("");
    const [step, setStep] = useState(0);
    const [goal, setGoal] = useState("");
    const { data } = useContext(DataContext);
    useEffect(() => {
        if (height !== 0 && weight !== 0 && diet !== "" && step === 7) {
            set(ref(db, data.id), {
                id: data.id,
                username: data.name,
                height: height,
                weight: weight,
                diet: diet,
                disease: JSON.stringify(disease),
                preferedDiet: "[]",
                preferedWorkOut: "[]",
            });
        }
    }, [step, data, height, weight, diet, disease]);
    const dietList = DietData.map((cur) => {
        return cur.name;
    });
    if (step === 5) {
        ChatGptDiet(dietList, disease, height, weight, goal)
            .then((filtered) => {
                console.log("Filtered Diet Items:", filtered);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }

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
