import React, { useContext } from "react";
import { DataContext } from "../DataContext";
import DietData from "../data/DietData";
import Bmi from "../components/Bmi";
import CaloriesBurnt from "../components/CaloriesBurnt";
import CaloriesIntake from "../components/CaloriesIntake";

const FitnessActivity = () => {
    const { data } = useContext(DataContext);
    const { height, weight, dietIntake, age, gender } = data;
    const heightInMeter = height / 100; // Convert height from cm to meters
    const bmi = weight / (heightInMeter * heightInMeter); // Calculate BMI
    const idCaloriesArray = DietData.map((item) => ({
        id: item.id,
        calories: item.calories,
    }));

    const totalCalories = idCaloriesArray.reduce((acc, item) => {
        return acc + (JSON.parse(dietIntake)[item.id] || 0) * item.calories;
    }, 0);
    const target =
        1.55 *
        (gender == "male"
            ? 10 * weight + 6.25 * height - 5 * age + 5
            : 10 * weight + 6.25 * height - 5 * age - 161);
    return (
        <>
            <h1 className="home_h11">Fitness Activity</h1>
            <div className="fitnessactivity">
                <div className="flex1">
                    <div className="flex">
                        <Bmi value={bmi} />
                        <div>
                            <div className="flex">
                                <div className="circle under"></div>
                                <h6>Under Weight</h6>
                            </div>
                            <div className="flex">
                                <div className="circle healthy"></div>
                                <h6>Healthy</h6>
                            </div>
                            <div className="flex">
                                <div className="circle over"></div>
                                <h6>Over Weight</h6>
                            </div>
                            <div className="flex">
                                <div className="circle obese"></div>
                                <h6>Obese</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex2">
                    <CaloriesIntake
                        totalCalories={totalCalories}
                        remaining={target - totalCalories}
                    />
                </div>
                <div className="flex2">
                    <CaloriesBurnt
                        totalCalories={totalCalories}
                        remaining={target - totalCalories}
                    />
                </div>
            </div>
        </>
    );
};

export default FitnessActivity;
