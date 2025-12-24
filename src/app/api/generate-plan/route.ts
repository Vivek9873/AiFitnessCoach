import { NextRequest, NextResponse } from 'next/server';
import { generateFitnessPlan } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const userDetails = await request.json();

    // Validate required fields
    if (!userDetails.name || !userDetails.age || !userDetails.height || !userDetails.weight) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const plan = await generateFitnessPlan(userDetails);

    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error generating fitness plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate fitness plan' },
      { status: 500 }
    );
  }
}