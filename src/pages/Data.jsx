import React, { useContext, useEffect, useState } from "react";
import Disease from "../components/Disease";
import Diet from "../components/DietChoice";
import Height from "../components/Height";
import Weight from "../components/Weight";
import { ref, get, set } from "firebase/database";
import { db } from "../Firebase";
import { DataContext } from "../DataContext";
import ChatGptDiet from "../ai/ChatGptDiet";
import DietData from "../data/DietData";
import Goal from "../components/Goal";
import ChatGptWorkout from "../ai/ChatGptWorkOut";
import WorkoutData from "../data/WorkoutData";
import { useNavigate } from "react-router-dom";
import Gender from "../components/Gender";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPerson, faPersonDress } from "@fortawesome/free-solid-svg-icons";
import Age from "../components/Age";

const Data = () => {
    const { data, setData } = useContext(DataContext);
    const [disease, setDisease] = useState(JSON.parse(data.disease) || []);
    const [height, setHeight] = useState(data.height || 0);
    const [weight, setWeight] = useState(data.weight || 0);
    const [diet, setDiet] = useState(data.diet || "");
    const [gender, setGender] = useState(data.gender || "");
    const [dataSaved, setDataSaved] = useState(false);
    const [goal, setGoal] = useState(data.goal || "");
    const [age, setAge] = useState(data.age || 0);
    const [preferedDiet, setPreferedDiet] = useState(
        JSON.parse(data.preferedDiet) || []
    );
    const [preferedWorkOut, setPreferedWorkOut] = useState(
        JSON.parse(data.preferedWorkOut) || []
    );
    const navigate = useNavigate();

    const dietList = DietData.map((cur) => cur.name);
    const k = DietData.filter((cur) => preferedDiet.includes(cur.name));
    const ids = k.map((cur) => {
        return cur.id;
    });
    const obj = ids.reduce((acc, curr) => {
        acc[curr] = 0;
        return acc;
    }, {});
    const exerciseList = WorkoutData.map((cur) => cur.name);

    // Save data to Firebase when saveData is true
    async function saveToDb() {
        set(ref(db, data.id), {
            id: data.id,
            username: data.username,
            height: height,
            weight: weight,
            diet: diet,
            dietIntake: JSON.stringify(obj),
            disease: JSON.stringify(disease),
            preferedDiet: JSON.stringify(preferedDiet),
            preferedWorkOut: JSON.stringify(preferedWorkOut),
            goal: goal,
            gender: gender,
            age: age,
        });
        setDataSaved(true);
        const userRef = ref(db, data.id);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            setData(snapshot.val());
        }
    }

    // Trigger filtering and saving when step === 5

    const loadFilteredData = async () => {
        if (height <= 0 || weight <= 0 || age <= 0 || !diet || !gender) {
            alert("Please fill all fields with valid values.");
            return;
        }
        if (weight > 0 && height > 0 && diet.length > 0 && goal.length > 0) {
            try {
                const filteredExercises = await ChatGptWorkout(
                    exerciseList,
                    disease,
                    height,
                    weight,
                    goal,
                    age
                );
                const filteredDiet = await ChatGptDiet(
                    dietList,
                    diet,
                    disease,
                    height,
                    weight,
                    goal,
                    age
                );
                setPreferedDiet(filteredDiet);
                setPreferedWorkOut(filteredExercises);
                saveToDb(); // Trigger Firebase save
            } catch (error) {
                console.error("Error fetching AI data:", error.message);
            }
        }
    };

    function getFilteredDiet(selectedConditions) {
        if (selectedConditions.length === 0) {
            return dietList;
        }
        const Asthama = [
            "apple",
            "soaked dry fruits (mixed)",
            "Kalonji seeds water",
            "cinnamon water",
            "raisin_water",
            "beetroot juice",
            "veggie_protein_boost",
            "boiled_chicken_breast",
            "brown_bread",
            "besan_chilla_cooked",
            "poha_cooked",
            "fruit_salad",
            "scrambled_eggs_with_dry_fruits",
            "boiled_eggs",
            "hummus_with_brown_bread",
            "oats_with_fruits",
            "oats",
            "ragi_upma",
            "protein_milk",
            "yogurt_dry_fruit_bowl",
            "cooked_chapati",
            "cooked_dal",
            "mixed vegetables",
            "palak paratha with curd",
            "dal rice",
            "bajra bhakri",
            "palak_kadhi_with_brown_rice",
            "soya_chunks_gravy_with_chapati",
            "paneer_vegetable_besan_kadhi_with_brown_rice_and_curd",
            "chicken_salad",
            "chicken_kebab",
            "low_fat_chicken_biryani",
            "bhuna chana",
            "boiled corn",
            "coconut water",
            "makhana",
            "rajma salad",
            "egg_avocado_toast",
            "almond_sandwich",
            "celery_juice",
            "tofu_bhurji_with_roti",
            "high_protein_legume_salad",
            "spinach_vegetable_soup",
            "chicken_mushroom_salad",
            "chicken_soup",
            "basil_leaves_tea",
            "chamomile_tea",
        ];
        const Diabates = [
            "apple",
            "soaked dry fruits (mixed)",
            "Kalonji seeds water",
            "cinnamon water",
            "veggie_protein_boost",
            "boiled_chicken_breast",
            "brown_bread",
            "besan_chilla_cooked",
            "scrambled_eggs_with_dry_fruits",
            "boiled_eggs",
            "egg_omelet_with_brown_bread",
            "hummus_with_brown_bread",
            "oats_with_fruits",
            "oats",
            "ragi_upma",
            "cooked_chapati",
            "cooked_dal",
            "mixed vegetables",
            "palak paratha with curd",
            "palak_kadhi_with_brown_rice",
            "soya_chunks_gravy_with_chapati",
            "paneer_bhurji_with_chapati",
            "paneer_vegetable_besan_kadhi_with_brown_rice_and_curd",
            "egg_curry",
            "chicken_salad",
            "chicken_kebab",
            "bhuna chana",
            "coconut water",
            "makhana",
            "rajma salad",
            "egg_avocado_toast",
            "almond_sandwich",
            "celery_juice",
            "tofu_bhurji_with_roti",
            "high_protein_legume_salad",
            "spinach_vegetable_soup",
            "chicken_mushroom_salad",
            "chicken_soup",
            "basil_leaves_tea",
            "chamomile_tea",
        ];
        const Blood_Pressure = [
            "apple",
            "lemon honey water",
            "soaked dry fruits (mixed)",
            "Kalonji seeds water",
            "cinnamon water",
            "veggie_protein_boost",
            "boiled_chicken_breast",
            "brown_bread",
            "besan_chilla_cooked",
            "poha_cooked",
            "fruit_salad",
            "scrambled_eggs_with_dry_fruits",
            "boiled_eggs",
            "egg_omelet_with_brown_bread",
            "hummus_with_brown_bread",
            "oats_with_fruits",
            "oats",
            "ragi_upma",
            "yogurt_dry_fruit_bowl",
            "cooked_chapati",
            "mixed vegetables",
            "palak paratha with curd",
            "bajra bhakri",
            "palak_kadhi_with_brown_rice",
            "soya_chunks_gravy_with_chapati",
            "paneer_vegetable_besan_kadhi_with_brown_rice_and_curd",
            "chicken_salad",
            "chicken_kebab",
            "bhuna chana",
            "boiled corn",
            "coconut water",
            "makhana",
            "rajma salad",
            "egg_avocado_toast",
            "almond_sandwich",
            "celery_juice",
            "dahi_paratha",
            "tofu_bhurji_with_roti",
            "high_protein_legume_salad",
            "spinach_vegetable_soup",
            "chicken_mushroom_salad",
            "chicken_soup",
            "basil_leaves_tea",
            "chamomile_tea",
        ];

        const conditionMap = {
            Asthama,
            Diabates,
            "Blood Pressure": Blood_Pressure,
        };
        // Get arrays for selected conditions
        const selectedArrays = selectedConditions
            .map((cond) => conditionMap[cond])
            .filter((arr) => arr != null);
        // Find intersection of selected arrays
        return intersectArrays(...selectedArrays);
    }
    function getFilteredExercises(selectedConditions) {
        if (selectedConditions.length === 0) {
            return exerciseList;
        }
        const Asthama = [
            "alternate lateral pulldown",
            "assisted parallel close grip pull-up",
            "assisted pull-up",
            "barbell pullover to press",
            "barbell bent over row",
            "barbell decline bent arm pullover",
            "barbell decline wide-grip pullover",
            "barbell incline row",
            "barbell one arm bent over row",
            "barbell pullover",
            "stationary bike walk",
            "walk elliptical cross trainer",
            "assisted chest dip (kneeling)",
            "barbell bench press",
            "barbell decline bench press",
            "barbell decline wide-grip press",
            "barbell front raise and pullover",
            "barbell guillotine bench press",
            "barbell incline bench press",
            "barbell incline shoulder raise",
            "barbell wide bench press",
            "cable bench press",
            "barbell revers wrist curl v. 2",
            "barbell reverse wrist curl",
            "barbell standing back wrist curl",
            "barbell wrist curl v. 2",
            "barbell wrist curl",
            "cable reverse wrist curl",
            "cable standing back wrist curl",
            "cable wrist curl",
            "dumbbell lying pronation",
            "dumbbell lying supination",
            "barbell seated calf raise",
            "barbell standing leg calf raise",
            "barbell standing rocking leg calf raise",
            "circles knee stretch",
            "donkey calf raise",
            "dumbbell seated one leg calf raise",
            "dumbbell single leg calf raise",
            "dumbbell standing calf raise",
            "lever seated calf raise",
            "lever standing calf raise",
            "side push neck stretch",
            "neck side stretch",
            "barbell front raise",
            "barbell one arm snatch",
            "barbell rear delt raise",
            "barbell rear delt row",
            "barbell seated behind head military press",
            "barbell seated bradford rocky press",
            "barbell seated overhead press",
            "barbell skier",
            "barbell standing bradford press",
            "barbell standing front raise over head",
            "assisted standing triceps extension (with towel)",
            "assisted triceps dip (kneeling)",
            "barbell alternate biceps curl",
            "barbell close-grip bench press",
            "barbell curl",
            "barbell decline close grip to skull press",
            "barbell drag curl",
            "barbell incline reverse-grip press",
            "barbell jm bench press",
            "barbell lying close-grip press",
            "assisted prone hamstring",
            "balance board",
            "barbell bench front squat",
            "barbell bench squat",
            "barbell clean and press",
            "barbell clean-grip front squat",
            "barbell deadlift",
            "barbell front chest squat",
            "barbell front squat",
            "barbell full squat",
            "3/4 sit-up",
            "45° side bend",
            "alternate heel touchers",
            "assisted hanging knee raise with throw down",
            "assisted hanging knee raise",
            "assisted lying leg raise with lateral throw down",
            "assisted lying leg raise with throw down",
            "assisted motion russian twist",
            "barbell press sit-up",
        ];
        const Diabates = [
            "alternate lateral pulldown",
            "assisted parallel close grip pull-up",
            "assisted pull-up",
            "barbell pullover to press",
            "barbell bent over row",
            "barbell decline bent arm pullover",
            "barbell decline wide-grip pullover",
            "barbell incline row",
            "barbell one arm bent over row",
            "barbell pullover",
            "stationary bike walk",
            "walk elliptical cross trainer",
            "walking on stepmill",
            "assisted chest dip (kneeling)",
            "barbell bench press",
            "barbell decline bench press",
            "barbell decline wide-grip press",
            "barbell front raise and pullover",
            "barbell guillotine bench press",
            "barbell incline bench press",
            "barbell incline shoulder raise",
            "barbell wide bench press",
            "cable bench press",
            "barbell revers wrist curl v. 2",
            "barbell reverse wrist curl",
            "barbell standing back wrist curl",
            "barbell wrist curl v. 2",
            "barbell wrist curl",
            "cable reverse wrist curl",
            "cable standing back wrist curl",
            "cable wrist curl",
            "dumbbell lying pronation",
            "dumbbell lying supination",
            "barbell seated calf raise",
            "barbell standing leg calf raise",
            "barbell standing rocking leg calf raise",
            "circles knee stretch",
            "donkey calf raise",
            "dumbbell seated one leg calf raise",
            "dumbbell single leg calf raise",
            "dumbbell standing calf raise",
            "lever seated calf raise",
            "lever standing calf raise",
            "side push neck stretch",
            "neck side stretch",
            "barbell front raise",
            "barbell rear delt raise",
            "barbell rear delt row",
            "barbell seated behind head military press",
            "barbell seated bradford rocky press",
            "barbell seated overhead press",
            "barbell skier",
            "barbell standing bradford press",
            "barbell standing front raise over head",
            "assisted standing triceps extension (with towel)",
            "assisted triceps dip (kneeling)",
            "barbell alternate biceps curl",
            "barbell close-grip bench press",
            "barbell curl",
            "barbell decline close grip to skull press",
            "barbell drag curl",
            "barbell incline reverse-grip press",
            "barbell jm bench press",
            "barbell lying close-grip press",
            "assisted prone hamstring",
            "balance board",
            "barbell bench front squat",
            "barbell bench squat",
            "barbell clean-grip front squat",
            "barbell deadlift",
            "barbell front chest squat",
            "barbell front squat",
            "barbell full squat",
            "3/4 sit-up",
            "45° side bend",
            "alternate heel touchers",
            "assisted hanging knee raise with throw down",
            "assisted hanging knee raise",
            "assisted lying leg raise with lateral throw down",
            "assisted lying leg raise with throw down",
            "assisted motion russian twist",
            "barbell press sit-up",
        ];

        const Blood_Pressure = [
            "alternate lateral pulldown",
            "assisted parallel close grip pull-up",
            "assisted pull-up",
            "barbell pullover to press",
            "barbell bent over row",
            "barbell decline bent arm pullover",
            "barbell decline wide-grip pullover",
            "barbell incline row",
            "barbell one arm bent over row",
            "barbell pullover",
            "stationary bike walk",
            "walk elliptical cross trainer",
            "walking on stepmill",
            "assisted chest dip (kneeling)",
            "barbell decline bench press",
            "barbell decline wide-grip press",
            "barbell front raise and pullover",
            "barbell guillotine bench press",
            "barbell incline shoulder raise",
            "barbell wide bench press",
            "cable bench press",
            "barbell revers wrist curl v. 2",
            "barbell reverse wrist curl",
            "barbell standing back wrist curl",
            "barbell wrist curl v. 2",
            "barbell wrist curl",
            "cable reverse wrist curl",
            "cable standing back wrist curl",
            "cable wrist curl",
            "dumbbell lying pronation",
            "dumbbell lying supination",
            "barbell seated calf raise",
            "barbell standing leg calf raise",
            "barbell standing rocking leg calf raise",
            "circles knee stretch",
            "donkey calf raise",
            "dumbbell seated one leg calf raise",
            "dumbbell single leg calf raise",
            "dumbbell standing calf raise",
            "lever seated calf raise",
            "lever standing calf raise",
            "side push neck stretch",
            "neck side stretch",
            "barbell front raise",
            "barbell rear delt raise",
            "barbell rear delt row",
            "barbell seated behind head military press",
            "barbell seated bradford rocky press",
            "barbell skier",
            "barbell standing front raise over head",
            "assisted standing triceps extension (with towel)",
            "assisted triceps dip (kneeling)",
            "barbell alternate biceps curl",
            "barbell close-grip bench press",
            "barbell curl",
            "barbell decline close grip to skull press",
            "barbell drag curl",
            "barbell incline reverse-grip press",
            "barbell jm bench press",
            "barbell lying close-grip press",
            "assisted prone hamstring",
            "balance board",
            "barbell bench front squat",
            "barbell bench squat",
            "barbell clean-grip front squat",
            "barbell front squat",
            "3/4 sit-up",
            "45° side bend",
            "alternate heel touchers",
            "assisted hanging knee raise with throw down",
            "assisted hanging knee raise",
            "assisted lying leg raise with lateral throw down",
            "assisted lying leg raise with throw down",
            "assisted motion russian twist",
            "barbell press sit-up",
        ];

        const conditionMap = {
            Asthama,
            Diabates,
            "Blood Pressure": Blood_Pressure,
        };

        // Get arrays for selected conditions
        const selectedArrays = selectedConditions
            .map((cond) => conditionMap[cond])
            .filter((arr) => arr != null);

        // Find intersection of selected arrays

        return intersectArrays(...selectedArrays);
    }
    function intersectArrays(...arrays) {
        if (arrays.length === 0) return [];
        return arrays.reduce((a, b) => a.filter((c) => b.includes(c)));
    }
    useEffect(() => {
        const bmi = (weight * 10000) / (height * height);
        console.log("bmi", bmi);
        if (bmi < 18.5) {
            setGoal("Gain Weight");
        } else if (bmi > 24.9) {
            setGoal("Lose Weight");
        } else {
            setGoal("Maintain Weight");
        }
    }, [weight, height]);

    if (dataSaved) {
        // Show a message or redirect the user after saving data
        setTimeout(() => {
            navigate("/");
        }, 5000); // Redirect after 5 seconds
        return <div>Data Saved</div>;
    }
    return (
        <div className="main_data_div">
            <div className="dataDiv">
                <div className="data_d"> Enter your Details:</div>
                <div className="height_weight">
                    <Height setHeight={setHeight} height={height} />
                    <Weight setWeight={setWeight} weight={weight} />
                    <Age setAge={setAge} age={age} />
                </div>
                <Gender setGender={setGender} gender={gender} />

                <Diet setDiet={setDiet} diet={diet} />
                <div className="">
                    <Disease setDisease={setDisease} disease={disease} />
                </div>
                {/* <Goal setGoal={setGoal} goal={goal} /> */}
                <div>
                    {/* <button
                        onClick={() => {
                            loadFilteredData();
                        }}>
                        Save Data
                    </button> */}
                </div>
            </div>
            <div className="profile">
                {/* <image src="" className="profile_pic"/> */}
                {gender == "male" ? (
                    <FontAwesomeIcon icon={faPerson} className="person" />
                ) : (
                    <FontAwesomeIcon icon={faPersonDress} className="person" />
                )}
                <h1 className="user_name">{"" || data.username}</h1>
                <pre className="user_data">Height: {height} cm.</pre>
                <pre className="user_data">Weight: {weight} kg.</pre>
                <pre className="user_data">Age: {age} years.</pre>
                <pre className="user_data">Diet : {diet}</pre>
                <pre className="user_data">Goal : {goal}</pre>
                <pre className="user_data">Gender : {gender}</pre>
                <pre className="user_data">
                    Disease:
                    {disease.length == 0 ? (
                        <>healthy body</>
                    ) : (
                        disease.join(",")
                    )}
                </pre>
                <button
                    className="profile_button"
                    onClick={() => {
                        loadFilteredData();
                    }}>
                    Save Data
                </button>
            </div>
        </div>
    );
};

export default Data;
