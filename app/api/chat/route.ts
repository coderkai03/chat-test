import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()
  try {
    const result = await streamText({
      model: openai("gpt-4o-mini"),
      messages: messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in streamText:", error)
    return Response.json({ error: "Failed to generate suggestions" }, { status: 500 })
  }
}