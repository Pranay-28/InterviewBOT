import Groq from "groq-sdk";

const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

const groq = new Groq({
  apiKey,
  dangerouslyAllowBrowser: true,
});

const MODEL = "llama-3.3-70b-versatile";

// Maintains a chat history for multi-turn conversations
const history = [];

export const chatSession = {
  sendMessage: async (userMessage) => {
    history.push({ role: "user", content: userMessage });

    const completion = await groq.chat.completions.create({
      messages: history,
      model: MODEL,
      temperature: 1,
      max_tokens: 8192,
    });

    const assistantText = completion.choices[0]?.message?.content ?? "";

    history.push({ role: "assistant", content: assistantText });

    // Return a response object that matches the Gemini interface
    return {
      response: {
        text: () => assistantText,
      },
    };
  },
};
