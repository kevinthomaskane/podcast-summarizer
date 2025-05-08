import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { supabase } from '@/app/lib/supabase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { transcript, id } = await request.json();

    if (!transcript || !id) {
      return NextResponse.json(
        { error: 'Transcript and ID are required' },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates concise, informative summaries of podcast transcripts. Format the summary as a bulleted list of key points."
        },
        {
          role: "user",
          content: `Please summarize this podcast transcript in bullet points, highlighting the main topics, key insights, and important takeaways:\n\n${transcript}`
        }
      ],
      temperature: 0.7,
      max_completion_tokens: 1000,
    });

    const summary = completion.choices[0].message.content;

    // Update the record in Supabase
    const { error } = await supabase
      .from('transcripts')
      .update({ summary })
      .eq('id', id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      summary,
    });
  } catch (error) {
    console.error('Summary generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    );
  }
} 