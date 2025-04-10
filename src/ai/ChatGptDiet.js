async function ChatGptDiet(dietList,diet, disease, height, weight, goal) {
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
                    inputs: `You are an expert nutritionist AI. Your task is to filter a list of diet items for individuals with specific health conditions, body metrics, and dietary goals.\n\n` +
                            `Instructions:\n` +
                            `- Evaluate EACH diet item carefully for suitability.\n` +
                            `- Use evidence-based nutritional knowledge for filtering.\n` +
                            `- Filter OUT items that are unsuitable for the given health conditions or goals.\n` +
                            `- ONLY return a valid JSON array of suitable items. DO NOT include any explanation, extra text, or formatting.\n` +
                            `- Ensure JSON is valid and parsable. No markdown or comments.\n\n` +
                            `Input Data:\n` +
                            `Diet Items: ${JSON.stringify(dietList)}\n\n` +
                            `User Profile:\n` +
                            `- Diet Preference: ${diet}\n` +
                            `- Weight: ${weight} kg\n` +
                            `- Height: ${height} cm\n` +
                            `- Health Conditions: ${
                                Array.isArray(disease)
                                    ? disease.join(", ")
                                    : disease
                            }\n` +
                            `- Goal: ${goal}\n\n` +
                            `Task:\nReturn ONLY the filtered array of suitable diet items in valid JSON format.`,
                    parameters: {
                        max_length: 800, // Hugging Face uses `max_length` instead of `max_tokens`
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

        // Remove any unexpected Markdown wrapping
        filteredArrayString = filteredArrayString.replace(/```(?:json)?/g, "").replace(/```/g, "").trim();

        const filteredDiet = JSON.parse(filteredArrayString);

        // Validate array
        if (!Array.isArray(filteredDiet)) {
            throw new Error("Invalid JSON response: Not an array.");
        }

        return filteredDiet;
    } catch (error) {
        console.error("Error filtering diet with AI:", error);
        throw new Error("Failed to filter diet using AI.");
    }
}

export default ChatGptDiet;
