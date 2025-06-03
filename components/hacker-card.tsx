import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"

export interface HackerProps {
  name: string
  avatar?: string
  role: string
  skills: string[]
  bio: string
  experience?: string
  contact: {
    email?: string
    github?: string
    linkedin?: string
  }
}

export function HackerCard({ hacker }: { hacker: HackerProps }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 border">
            <AvatarFallback>{hacker.name.charAt(0)}</AvatarFallback>
            <AvatarImage src={hacker.avatar || `/placeholder.svg?height=48&width=48`} />
          </Avatar>
          <div>
            <h3 className="font-semibold text-lg">{hacker.name}</h3>
            <p className="text-sm text-muted-foreground">{hacker.role}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-3">
          <p className="text-sm">{hacker.bio}</p>
        </div>

        {hacker.experience && (
          <div className="mb-3">
            <p className="text-xs font-medium text-muted-foreground mb-1">Experience</p>
            <p className="text-sm">{hacker.experience}</p>
          </div>
        )}

        <div>
          <p className="text-xs font-medium text-muted-foreground mb-1">Skills</p>
          <div className="flex flex-wrap gap-1">
            {hacker.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        {hacker.contact.email && (
          <Button variant="outline" size="icon" asChild>
            <a href={`mailto:${hacker.contact.email}`} title="Email">
              <Mail className="h-4 w-4" />
            </a>
          </Button>
        )}
        {hacker.contact.github && (
          <Button variant="outline" size="icon" asChild>
            <a href={hacker.contact.github} target="_blank" rel="noopener noreferrer" title="GitHub">
              <Github className="h-4 w-4" />
            </a>
          </Button>
        )}
        {hacker.contact.linkedin && (
          <Button variant="outline" size="icon" asChild>
            <a href={hacker.contact.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </a>
          </Button>
        )}
        <Button className="ml-auto">Connect</Button>
      </CardFooter>
    </Card>
  )
}
