async function ChatGptDiet(dietList, disease, height, weight, goal) {
 
    try {
        const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Correct interpolation of env variable
                    Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini", // GPT-4o or gpt-4 — double check model name; gpt-4o-mini does not exist
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a nutritionist AI. You will filter an array of diet items based on specific health conditions, body measurements, and goals. First, you MUST analyze each item. Then, return ONLY the filtered array in **valid JSON** format. No extra text or explanation.",
                        },
                        {
                            role: "user",
                            content: `Here is an array of diet items:\n${JSON.stringify(
                                dietList
                            )}\n\nEvaluate each item carefully for the following individual:\nWeight: ${weight} kg\nHeight: ${height} cm\nHealth Conditions: ${disease.join(
                                ", "
                            )}\nGoal: ${goal}\n\nReturn ONLY the filtered array in valid JSON format. Do not exclude suitable items. Double-check for missing items.`,
                        },
                    ],
                }),
            }
        );

        const data = await response.json();

        // Defensive parsing - handle common GPT quirks like wrapping in markdown or adding text
        let filteredArrayString = data.choices[0].message.content.trim();

        // Remove markdown code block markers if present
        if (filteredArrayString.startsWith("```")) {
            filteredArrayString = filteredArrayString
                .replace(/```(?:json)?/g, "")
                .replace(/```/g, "")
                .trim();
        }

        const filteredDiet = JSON.parse(filteredArrayString);
        return filteredDiet;
    } catch (error) {
        console.error("Error filtering diet with AI:", error);
        throw new Error("Failed to filter diet using AI.");
    }
}

export default ChatGptDiet;
