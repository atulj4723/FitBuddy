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