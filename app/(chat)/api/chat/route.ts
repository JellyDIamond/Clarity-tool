import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = await req.json();
  console.log("🛠️ Incoming messages:", messages); // Add this

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      stream: true,
      messages,
    });

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (err) {
    console.error("❌ OpenAI Error:", err); // Add this
    return new Response('AI Error', { status: 500 });
  }
}


  return Response.json(deletedChat, { status: 200 });
}
