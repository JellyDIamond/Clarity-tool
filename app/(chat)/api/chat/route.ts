// app/api/chat/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, message } = body;

    // Build conversation history (for MVP, just one message + system prompt)
    const messages = [
      {
        role: 'system',
        content: `You are The Inner Strategist. Speak with clarity. Ask sharp questions. Cut through mental fog.`,
      },
      {
        role: 'user',
        content: message,
      },
    ];

    const completion = await openai.createChatCompletion({
      model: 'gpt-4-1106-preview', // GPT-4.1
      messages: messages,
      stream: false // <-- make sure this is set to false
    });

    const reply = completion.data.choices[0].message.content;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('API Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
