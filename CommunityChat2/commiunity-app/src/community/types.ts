export interface User {
  id: string
  name: string
  email: string
  avatarUrl?: string
  location: string
  tags: string[]
  joinDate: string
  messageCount: number
}

export interface Reaction {
  userId: string
  emoji: string
}

export interface Message {
  id: string
  userId: string
  content: string
  timestamp: string
  replies: Message[]
  reactions: Reaction[] // Array of reactions with user IDs and emoji type
  imageUrl?: string | null
}

