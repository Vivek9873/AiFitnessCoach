import { NextResponse } from 'next/server';
import { generateMotivationQuote } from '@/lib/gemini';

export async function GET() {
  try {
    const quote = await generateMotivationQuote();
    return NextResponse.json({ quote });
  } catch (error) {
    console.error('Error generating quote:', error);
    return NextResponse.json(
      { quote: 'The only bad workout is the one that didn\'t happen!' },
      { status: 200 }
    );
  }
}