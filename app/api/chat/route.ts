import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Sample hacker database - in a real app, this would come from a database
const hackers = [
  {
    name: "Alex Chen",
    avatar: "/placeholder.svg?height=48&width=48",
    role: "Frontend Developer",
    skills: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
    bio: "CS student at MIT with a passion for building beautiful user interfaces.",
    experience: "Won 2nd place at HackMIT 2023 with a sustainability project.",
    contact: {
      email: "alex.chen@example.com",
      github: "https://github.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen",
    },
  },
  {
    name: "Priya Sharma",
    avatar: "/placeholder.svg?height=48&width=48",
    role: "UI/UX Designer",
    skills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    bio: "Design student with a focus on creating accessible and intuitive interfaces.",
    experience: "Designed the UI for 3 hackathon-winning projects.",
    contact: {
      email: "priya.s@example.com",
      linkedin: "https://linkedin.com/in/priyasharma",
    },
  },
  {
    name: "Marcus Johnson",
    avatar: "/placeholder.svg?height=48&width=48",
    role: "Backend Developer",
    skills: ["Node.js", "Python", "MongoDB", "AWS"],
    bio: "Computer Science major specializing in scalable backend systems.",
    experience: "Built APIs for 5+ hackathon projects.",
    contact: {
      email: "marcus.j@example.com",
      github: "https://github.com/marcusj",
    },
  },
  {
    name: "Sophia Kim",
    avatar: "/placeholder.svg?height=48&width=48",
    role: "ML Engineer",
    skills: ["PyTorch", "TensorFlow", "Computer Vision", "NLP"],
    bio: "PhD candidate in Machine Learning with focus on computer vision applications.",
    experience: "Published research on ML applications in healthcare.",
    contact: {
      email: "sophia.kim@example.com",
      github: "https://github.com/sophiakim",
      linkedin: "https://linkedin.com/in/sophiakim",
    },
  },
  {
    name: "David Rodriguez",
    avatar: "/placeholder.svg?height=48&width=48",
    role: "Full Stack Developer",
    skills: ["JavaScript", "React", "Node.js", "PostgreSQL", "Docker"],
    bio: "Self-taught developer with 3 years of experience building web applications.",
    experience: "Participated in 10+ hackathons, won 3 of them.",
    contact: {
      email: "david.r@example.com",
      github: "https://github.com/davidr",
      linkedin: "https://linkedin.com/in/davidrodriguez",
    },
  },
]

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Create a system prompt that instructs the AI how to respond
  const systemPrompt = `
    You are a helpful hackathon teammate finder assistant. Your job is to help students find teammates for hackathons.
    
    When users ask about finding teammates with specific skills, interests, or for specific roles, respond with:
    1. A helpful message addressing their request
    2. Relevant teammate suggestions from our database
    
    For each suggested teammate, include their information in the following format:
    HACKER_CARD: {
      "name": "Teammate Name",
      "avatar": "/placeholder.svg?height=48&width=48",
      "role": "Their Role",
      "skills": ["Skill 1", "Skill 2"],
      "bio": "Short bio",
      "experience": "Relevant experience",
      "contact": {
        "email": "email@example.com",
        "github": "https://github.com/username",
        "linkedin": "https://linkedin.com/in/username"
      }
    }
    
    The HACKER_CARD: format is critical as our system will parse this to display a visual card in the chat.
    
    Here's our current database of available hackers:
    ${JSON.stringify(hackers, null, 2)}
    
    Only suggest hackers that match the user's request. If there are no matches, apologize and suggest they try different criteria.
  `

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages,
  })

  return result.toDataStreamResponse()
}
