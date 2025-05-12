async function ChatGptDiet(dietList, diet, disease, height, weight, goal,age) {
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
                                        `You are an expert nutritionist AI. Your task is to filter a list of diet items for individuals with specific health conditions, body metrics, and dietary goals.\n\n` +
                                        `Instructions:\n` +
                                        `- Evaluate EACH diet item carefully for suitability.\n` +
                                        `- Use evidence-based nutritional knowledge for filtering.\n` +
                                        `- Filter OUT items that are unsuitable for the given health conditions or goals.\n` +
                                        `- ONLY return a valid JSON array of suitable items. DO NOT include any explanation, extra text, or formatting.\n` +
                                        `- Ensure JSON is valid and parsable. No markdown or comments.\n\n` +
                                        `Input Data:\n` +
                                        `Diet Items: ${JSON.stringify(
                                            dietList
                                        )}\n\n` +
                                        `User Profile:\n` +
                                        `- Diet Preference: ${diet}\n` +
                                        `- Weight: ${weight} kg\n` +
                                        `- Height: ${height} cm\n` +
                                        `- Age: ${age} years\n` +
                                        `- Health Conditions: ${
                                            Array.isArray(disease)
                                                ? disease.join(", ")
                                                : disease
                                        }\n` +
                                        `- Goal: ${goal}\n\n` +
                                        `Task:\nReturn ONLY the filtered array of suitable diet items in valid JSON format.`,
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

        const filteredDiet = JSON.parse(cleanJson);

        if (!Array.isArray(filteredDiet)) {
            throw new Error("Invalid JSON response: Not an array.");
        }

        return filteredDiet;
    } catch (error) {
        console.error("Error filtering diet with Gemini AI:", error);
        throw new Error("Failed to filter diet using Gemini AI.");
    }
}

export default ChatGptDiet;
