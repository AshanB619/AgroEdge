import type { User } from "./types"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MessageSquare, Clock } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface UserProfileProps {
  user: User
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <>
      <div className="p-6 text-center flex-shrink-0 border-b border-border">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <img src={user.avatarUrl || "/placeholder.svg?height=96&width=96"} alt={user.name} className="object-cover" />
        </Avatar>
        <h2 className="text-xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground">{user.location}</p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {user.tags.map((tag) => (
            <Badge key={tag} className="bg-[#DCFCE7] text-[#22C55E] hover:bg-[#DCFCE7]/80 border-[#22C55E]/20">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-grow overflow-auto">
        <div className="p-6">
          <h3 className="font-medium mb-4">Farmer Information</h3>

          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{user.email}</span>
            </div>

            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{user.phone}</span>
            </div>

            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">{user.messageCount} messages</span>
            </div>

            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              <span className="text-sm">Member since {new Date(user.joinDate).toLocaleDateString()}</span>
            </div>
          </div>

          {user.bio && (
            <>
              <h3 className="font-medium mt-6 mb-2">About</h3>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </>
          )}
        </div>
      </ScrollArea>

      <div className="p-6 border-t border-border flex-shrink-0">
        <Button className="w-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white">Message</Button>
      </div>
    </>
  )
}

