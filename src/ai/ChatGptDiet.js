async function ChatGptDiet(dietList, diseaseList, height, weight, goal) {
    try {
        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`, // Keep this secret and use securely!
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini", // Use "gpt-4o" or fallback to "gpt-3.5-turbo"
                    
                    messages: [
                        {
                            role: "system",
                            content:
                                `You are an expert nutritionist AI. Your task is to filter a list of diet items for individuals with specific health conditions, body metrics, and dietary goals.\n\n` +
                                `Instructions:\n` +
                                `- Evaluate EACH diet item carefully for suitability.\n` +
                                `- Use evidence-based nutritional knowledge for filtering.\n` +
                                `- Filter OUT items that are unsuitable for the given health conditions or goals.\n` +
                                `- ONLY return a valid JSON array of suitable items. DO NOT include any explanation, extra text, or formatting.\n` +
                                `- Ensure JSON is valid and parsable. No markdown or comments.`,
                        },
                        {
                            role: "user",
                            content:
                                `Input Data:\n` +
                                `Diet Items: ${JSON.stringify(dietList)}\n\n` +
                                `User Profile:\n` +
                                `- Weight: ${weight} kg\n` +
                                `- Height: ${height} cm\n` +
                                `- Health Conditions: ${
                                    Array.isArray(diseaseList)
                                        ? diseaseList.join(", ")
                                        : diseaseList
                                }\n` +
                                `- Goal: ${goal}\n\n` +
                                `Task:\nReturn ONLY the filtered array of suitable diet items in valid JSON format.`,
                        },
                    ],
                    max_tokens: 800,
                    temperature: 0.3,
                }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("OpenAI API error:", data);
            throw new Error(data.error?.message || "OpenAI API call failed.");
        }
        let filteredArrayString = data.choices[0].message.content.trim();

        // Sanitize any Markdown wrapping
        if (filteredArrayString.startsWith("```")) {
            filteredArrayString = filteredArrayString
                .replace(/```(?:json)?/g, "")
                .replace(/```/g, "")
                .trim();
        }

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
