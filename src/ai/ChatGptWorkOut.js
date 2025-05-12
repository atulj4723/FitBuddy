async function ChatGptWorkout(
    exerciseList,
    disease,
    height,
    weight,
    goal,
    age
) {
    try {
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" +
                process.env.REACT_APP_GOOGLE_API_KEY,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [
                        {
                            role: "user",
                            parts: [
                                {
                                    text:
                                        `You are an expert fitness AI. Your task is to filter a list of exercises for individuals based on their fitness level, health conditions, body metrics, and fitness goals.\n\n` +
                                        `Instructions:\n` +
                                        `- Evaluate EACH exercise for safety and effectiveness.\n` +
                                        `- Consider the user's health conditions.\n` +
                                        `- Remove exercises that are unsafe or unsuitable.\n` +
                                        `- ONLY return a valid JSON array of suitable exercises. DO NOT include any explanation, extra text, or formatting.\n` +
                                        `- Ensure JSON is valid and parsable. No markdown or comments.\n\n` +
                                        `Input Data:\n` +
                                        `Exercises: ${JSON.stringify(
                                            exerciseList
                                        )}\n\n` +
                                        `User Profile:\n` +
                                        `- Weight: ${weight} kg\n` +
                                        `- Height: ${height} cm\n` +
                                        `- Age: ${age} years\n` +
                                        `- Health Conditions: ${
                                            Array.isArray(disease)
                                                ? disease.join(", ")
                                                : disease
                                        }\n` +
                                        `- Goal: ${goal}\n\n` +
                                        `Task:\nReturn ONLY the filtered array of suitable exercises in valid JSON format.`,
                                },
                            ],
                        },
                    ],
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 800,
                    },
                }),
            }
        );
        const data = await response.json();
        if (!response.ok) {
            console.error("Gemini API error:", data);
            throw new Error(data.error?.message || "Gemini API call failed.");
        }
        const textOutput =
            data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (!textOutput) {
            throw new Error("Invalid response from Gemini: No content.");
        }
        const cleanJson = textOutput
            .replace(/```(?:json)?/g, "")
            .replace(/```/g, "")
            .trim();

        try {
            const filteredExercises = JSON.parse(cleanJson);
            if (!Array.isArray(filteredExercises)) {
                throw new Error("Invalid JSON response: Not an array.");
            }
            return filteredExercises;
        } catch (error) {
            console.error("Raw response:", textOutput);
            throw error;
        }
    } catch (error) {
        console.error("Error filtering workouts with Gemini AI:", error);
        throw new Error("Failed to filter workout plan using Gemini AI.");
    }
}

export default ChatGptWorkout;
