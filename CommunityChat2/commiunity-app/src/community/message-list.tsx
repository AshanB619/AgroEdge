"use client"

import { Avatar } from "@/components/ui/avatar"
import type { Message, User } from "./types"

interface MessageListProps {
  messages: Message[]
  users: User[]
  onSelectMessage: (message: Message) => void
  selectedMessageId?: string
}

export default function MessageList({ messages, users, onSelectMessage, selectedMessageId }: MessageListProps) {
  // Group reactions by emoji for display
  const getReactionSummary = (reactions: Message["reactions"]) => {
    const emojiCounts = reactions.reduce(
      (acc, reaction) => {
        acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    return Object.entries(emojiCounts)
      .slice(0, 2) // Show only first 2 emoji types
      .map(([emoji, count]) => `${emoji} ${count}`)
      .join(" ")
  }

  return (
    <div className="space-y-1 p-2">
      {messages.map((message) => {
        const user = users.find((u) => u.id === message.userId)
        return (
          <div
            key={message.id}
            className={`flex items-start p-3 rounded-md cursor-pointer hover:bg-[#DCFCE7]/50 ${
              selectedMessageId === message.id ? "bg-[#DCFCE7]/50" : ""
            }`}
            onClick={() => onSelectMessage(message)}
          >
            <Avatar className="h-10 w-10 mr-3 flex-shrink-0">
              <img src={user?.avatarUrl || "/placeholder.svg?height=40&width=40"} alt={user?.name || "User"} />
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm truncate">{user?.name || "Unknown User"}</h3>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{message.content}</p>
              {(message.replies.length > 0 || message.reactions.length > 0) && (
                <div className="flex items-center mt-1 space-x-2">
                  {message.reactions.length > 0 && (
                    <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">
                      {getReactionSummary(message.reactions)}
                    </span>
                  )}
                  {message.replies.length > 0 && (
                    <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">💬 {message.replies.length}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )
      })}
      {messages.length === 0 && (
        <div className="p-4 text-center text-muted-foreground">No messages found. Start a conversation!</div>
      )}
    </div>
  )
}

