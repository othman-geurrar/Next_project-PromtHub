import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/database";

export async function GET(request) {
  try {
    await connectDB();
    const prompt = await Prompt.find({}).populate("creator");
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.error("Failed to connect to the database", err);
    return new Response("failed to get promt", { status: 500 });
  }
}
