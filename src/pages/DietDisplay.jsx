import { useParams } from "react-router-dom";
import DietData from "../data/DietData";
import { useContext, useState } from "react";
import { DataContext } from "../DataContext";
import { ref, get, update } from "firebase/database";
import { db } from "../Firebase";

const FoodDisplay = () => {
    const { id } = useParams();
    const { data,setData } = useContext(DataContext);
    const diet =JSON.parse(data.dietIntake);
    const food = DietData.find((item) => item.id == id);
    const [count, setCount] = useState(diet[id] || 0);
    const array = Object.keys(diet);
    const saveToDb = (id, count) => {
        diet[id] = count;
        update(ref(db, data.id), {
            dietIntake: JSON.stringify(diet),
        })
            .then(() => {
                console.log("Data saved successfully!");
                get(ref(db, data.id))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const updatedData = snapshot.val();
                            setData(updatedData);
                        } else {
                            console.log("No data available");
                        }
                    })
                    .catch((error) => {
                        console.error("Error fetching data:", error);
                    });
            })
            .catch((error) => {
                console.error("Error saving data:", error);
            });
    };
    if (!food) {
        return <div>Food not found</div>;
    }
    if (!array.includes(id)) {
        return <div>Food is not prefered for you</div>;
    }
    diet[id] = count;

    return (
        <div className="dietdisplay">
            <div className="dis">
                <img className="workout_img" src={`.${food.image}`} alt="" />
                <h1 className="workout_h">{food.name.replace(/_/g, " ")}</h1>
                <h2 className="workout_h1">category (veg/non): {food.type}</h2>
                <h2 className="workout_h1">Food calaries: {food.calories} cal.</h2>
                <h2 className="workout_h1">proteins: {food.protein_g} gram</h2>
                <h2 className="workout_h1">carbohydrates: {food.carbohydrates_total_g} gram</h2>
                <h2 className="workout_h1">fat: {food.fat_total_g} gram</h2>
                <h2 className="workout_h1">fiber: {food.fiber_g} gram</h2>
                <h2 className="workout_h1">serving size: {food.serving_size_g} gram</h2>
                <h2 className="workout_h1">
                    Total Calory intake :{(food.calories * count).toFixed(2)}
                </h2>
                <div className="input_data">
                    <button className="dec"
                        onClick={() => {
                            if (count > 0) {
                                setCount(count - 1);
                            }
                        }}>
                        -
                    </button>
                    <input className="inputs" type="number" value={count} />
                    <button className="inc"
                        onClick={() => {
                            setCount(count + 1);
                        }}>
                        +
                    </button>
                </div>
                <button className="b1"
                    onClick={() => {
                        saveToDb(food.id, count);
                    }}>
                    save data
                </button>
            </div>
        </div>
    );
};
export default FoodDisplay;
