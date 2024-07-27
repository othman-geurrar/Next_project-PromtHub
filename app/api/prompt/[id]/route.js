import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/database";

// Get 

export async function GET(request , {params}) {
  try {
    await connectDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    return new Response("failed to get promt", { status: 500 });
  }
}



//Patch

export async function PATCH(request, { params }) {
    const { prompt , tag } = await request.json();
  try {
    await connectDB();
    const exictingPromt = await Prompt.findById(params.id);
   
    if (!exictingPromt) {
      return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 404 });
    }
    exictingPromt.prompt = prompt;
    exictingPromt.tag = tag;
    await exictingPromt.save();
    return new Response(JSON.stringify(exictingPromt), { status: 200 });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    return new Response("failed to update promt", { status: 500 });
  }
}



// Delete

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const prompt = await Prompt.findByIdAndDelete(params.id);
    if (!prompt) {
      return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    return new Response("failed to delete promt", { status: 500 });
  }
}