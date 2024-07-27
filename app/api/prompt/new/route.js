import Prompt from '@/models/prompt';
import { connectDB } from '@/utils/database';

export async function POST(request) {
  try {
    // Parse JSON body
    const { userId, prompt, tag } = await request.json();

    // Validate the request body
    if (!userId || !prompt || !tag) {
      return new Response(JSON.stringify({ message: 'Missing required fields' }), { status: 400 });
    }

    // Connect to the database
    await connectDB();

    // Create a new prompt document
    const newPrompt = new Prompt({ creator: userId, prompt, tag });

    // Save the document to the database
    await newPrompt.save();

    // Return a success response
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error creating prompt:', error);

    // Return an error response
    return new Response(JSON.stringify({ message: 'Failed to create a new prompt', error: error.message }), { status: 500 });
  }
}
