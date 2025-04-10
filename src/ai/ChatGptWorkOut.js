async function ChatGptWorkout(exerciseList, diseaseList, height, weight, goal) {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/google/gemma-3-27b-it",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_HF_API_KEY}`, // Secure API Key
                },
                body: JSON.stringify({
                    inputs: `You are an expert fitness AI. Your task is to filter a list of exercises for individuals based on their fitness level, health conditions, body metrics, and fitness goals.\n\n` +
                            `Instructions:\n` +
                            `- Evaluate EACH exercise for safety and effectiveness.\n` +
                            `- Consider the user's health conditions.\n` +
                            `- Remove exercises that are unsafe or unsuitable.\n` +
                            `- ONLY return a valid JSON array of suitable exercises. DO NOT include any explanation, extra text, or formatting.\n` +
                            `- Ensure JSON is valid and parsable. No markdown or comments.\n\n` +
                            `Input Data:\n` +
                            `Exercises: ${JSON.stringify(exerciseList)}\n\n` +
                            `User Profile:\n` +
                            `- Weight: ${weight} kg\n` +
                            `- Height: ${height} cm\n` +
                            `- Health Conditions: ${
                                Array.isArray(diseaseList)
                                    ? diseaseList.join(", ")
                                    : diseaseList
                            }\n` +
                            `- Goal: ${goal}\n\n` +
                            `Task:\nReturn ONLY the filtered array of suitable exercises in valid JSON format.`,
                    parameters: {
                        max_length: 800,
                        temperature: 0.3,
                    }
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Hugging Face API error:", data);
            throw new Error(data.error || "Hugging Face API call failed.");
        }

        let filteredArrayString = data?.[0]?.generated_text?.trim();
        if (!filteredArrayString) {
            throw new Error("Invalid response from AI: No content found.");
        }

        // Remove any unexpected Markdown formatting
        filteredArrayString = filteredArrayString.replace(/```(?:json)?/g, "").replace(/```/g, "").trim();

        const filteredExercises = JSON.parse(filteredArrayString);

        // Validate array
        if (!Array.isArray(filteredExercises)) {
            throw new Error("Invalid JSON response: Not an array.");
        }

        return filteredExercises;
    } catch (error) {
        console.error("Error filtering workouts with AI:", error);
        throw new Error("Failed to filter workout plan using AI.");
    }
}

export default ChatGptWorkout;
