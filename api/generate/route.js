import { NextResponse } from "next/server";
import Together from "together-ai";

const systemPrompt = `
Objective: Generate flashcards that are clear, concise, and educational, tailored to the subject matter provided. Each flashcard should focus on a single concept, question, or term.

Instructions:

Topic Identification: Identify the key concepts, terms, or questions related to the subject matter provided by the user.

Flashcard Format: Create each flashcard with a "Question/Term" on one side and the "Answer/Explanation" on the other.

Clarity: Ensure that the information is presented in a clear and concise manner, suitable for quick review.

Depth: Provide enough detail in the answer to convey the concept thoroughly without overwhelming the user.

Language Simplicity: Use simple, straightforward language. Avoid jargon unless it's a critical part of the concept.

Only generate 10 flashcards

Return in the following JSON format
{
    "flashcards": [
        {
            "front": str,
            "back": str
        }
    ]
}
`;

export async function POST(req) {
    const together = new Together({
        baseURL: "https://api.together.xyz/v1",
        apiKey: process.env.TOGETHER_API_KEY,
        defaultHeaders: {
            "HTTP-Referer": 'http://localhost:3000/', 
            "X-Title": 'ChatterAI',
        }
    });

    try {
        const data = await req.text();

        const completion = await together.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: data },
            ],
            model: "meta-llama/Meta-Llama-3.1-405B-Instruct-Turbo",
        });

        // Extract the JSON part from the response
        const messageContent = completion.choices[0].message.content;
        const jsonStartIndex = messageContent.indexOf('{');
        const jsonEndIndex = messageContent.lastIndexOf('}') + 1;

        if (jsonStartIndex === -1 || jsonEndIndex === -1) {
            throw new Error("No JSON found in the response");
        }

        const jsonString = messageContent.slice(jsonStartIndex, jsonEndIndex);

        let flashcards;
        try {
            flashcards = JSON.parse(jsonString);
        } catch (error) {
            console.error("Invalid JSON:", jsonString);
            return NextResponse.json({ error: "Invalid JSON response from Together API" });
        }

        return NextResponse.json(flashcards.flashcards);
    } catch (error) {
        console.error("Error during Together API request:", error);
        return NextResponse.json({ error: "Failed to generate flashcards" }, { status: 500 });
    }
}
