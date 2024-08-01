import { NextResponse } from 'next/server';
import { questions } from '../../../questions';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // Pick a random set of questions
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selectedQuestions = questions[randomIndex];

    return NextResponse.json({ questions: selectedQuestions });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: 'Failed to fetch questions' }, { status: 500 });
  }
}
