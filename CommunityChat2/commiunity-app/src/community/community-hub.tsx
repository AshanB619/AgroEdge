"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Send, Plus, MessageSquareReply, ImageIcon, ArrowLeft, PaperclipIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import MessageList from "./message-list"
import UserProfile from "./user-profile"
import ReactionPicker from "./reaction-picker"
import type { Message, User } from "./types"
import { mockMessages, mockUsers } from "./mock-data"

export default function CommunityHub() {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // In a real app, you would fetch the current user from your auth system
    setCurrentUser(mockUsers[0])
  }, [])

  const handleSendMessage = () => {
    if (!newMessage.trim() && !selectedImage) return

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      userId: currentUser?.id || "unknown",
      content: newMessage,
      timestamp: new Date().toISOString(),
      replies: [],
      reactions: [],
      imageUrl: imagePreview,
    }

    if (selectedMessage) {
      // Add as a reply
      const updatedMessages = messages.map((msg) => {
        if (msg.id === selectedMessage.id) {
          return {
            ...msg,
            replies: [...msg.replies, newMsg],
          }
        }
        return msg
      })
      setMessages(updatedMessages)
      setSelectedMessage(null)
    } else {
      // Add as a new message
      setMessages([newMsg, ...messages])
    }

    setNewMessage("")
    setSelectedImage(null)
    setImagePreview(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleReaction = (messageId: string, userId: string, emoji: string) => {
    setMessages(
      messages.map((msg) => {
        if (msg.id === messageId) {
          // Check if user already reacted with this emoji
          const existingReactionIndex = msg.reactions.findIndex((r) => r.userId === userId && r.emoji === emoji)

          if (existingReactionIndex >= 0) {
            // Remove the reaction if it exists
            return {
              ...msg,
              reactions: [
                ...msg.reactions.slice(0, existingReactionIndex),
                ...msg.reactions.slice(existingReactionIndex + 1),
              ],
            }
          } else {
            // Add the new reaction
            return {
              ...msg,
              reactions: [...msg.reactions, { userId, emoji }],
            }
          }
        }
        return msg
      }),
    )
  }

  const filteredMessages = messages.filter((msg) => msg.content.toLowerCase().includes(searchQuery.toLowerCase()))

  if (!currentUser) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      {/* Left Sidebar - Message List */}
      <div className="w-80 border-r border-border flex flex-col h-full overflow-hidden bg-white">
        <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-auto">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2024-12-16_12-10-17.jpg-sqX5JjjAB0MybjJE7vyGzBVF0OPvNv.jpeg"
                alt="Agro Edge Logo"
                className="h-full w-auto object-contain"
              />
            </div>
          </div>
          <Avatar className="h-8 w-8">
            <img src={currentUser?.avatarUrl || "/placeholder.svg?height=32&width=32"} alt={currentUser?.name} />
          </Avatar>
        </div>

        <div className="p-4 border-b border-border flex-shrink-0">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search Messages"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-grow overflow-auto">
          <MessageList
            messages={filteredMessages}
            users={users}
            onSelectMessage={setSelectedMessage}
            selectedMessageId={selectedMessage?.id}
          />
        </ScrollArea>

        <div className="p-4 border-t border-border flex-shrink-0">
          <Button className="w-full" onClick={() => setSelectedMessage(null)}>
            <Plus className="mr-2 h-4 w-4" /> New Message
          </Button>
        </div>
      </div>

      {/* Main Content - Chat */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="p-4 border-b border-border flex-shrink-0 bg-white">
          <div className="flex items-center">
            {selectedMessage && (
              <Button
                variant="ghost"
                size="icon"
                className="mr-2"
                onClick={() => setSelectedMessage(null)}
                aria-label="Back to community hub"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedMessage
                ? `${users.find((u) => u.id === selectedMessage.userId)?.name}'s message`
                : "Farmers Community Hub"}
            </h2>
          </div>
        </div>

        <ScrollArea className="flex-grow overflow-auto">
          <div className="p-4">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-gray-900">Farmers Community Hub</h2>
              <p className="text-gray-600">Share your farming experiences and get advice from other farmers</p>
              <div className="mt-2 flex justify-center">
                <div className="h-1 w-16 bg-[#22C55E] rounded-full"></div>
              </div>
            </div>
            {selectedMessage ? (
              <div className="space-y-4">
                <div className={`flex ${selectedMessage.userId === currentUser.id ? "justify-end" : "justify-start"}`}>
                  <div className="flex items-start max-w-[70%]">
                    {selectedMessage.userId !== currentUser.id && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                        <img
                          src={
                            users.find((u) => u.id === selectedMessage.userId)?.avatarUrl ||
                            "/placeholder.svg?height=32&width=32" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={users.find((u) => u.id === selectedMessage.userId)?.name}
                        />
                      </Avatar>
                    )}
                    <div
                      className={`rounded-lg p-3 ${
                        selectedMessage.userId === currentUser.id ? "bg-[#22C55E] text-white" : "bg-gray-100"
                      }`}
                    >
                      <p>{selectedMessage.content}</p>
                      {selectedMessage.imageUrl && (
                        <div className="mt-2">
                          <img
                            src={selectedMessage.imageUrl || "/placeholder.svg"}
                            alt="Attached image"
                            className="rounded-md max-h-60 w-auto"
                          />
                        </div>
                      )}
                      <div className="text-xs mt-1 opacity-70">
                        {new Date(selectedMessage.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                    {selectedMessage.userId === currentUser.id && (
                      <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                        <img
                          src={currentUser.avatarUrl || "/placeholder.svg?height=32&width=32"}
                          alt={currentUser.name}
                        />
                      </Avatar>
                    )}
                  </div>
                </div>

                <div className="ml-10">
                  <ReactionPicker
                    messageId={selectedMessage.id}
                    currentUserId={currentUser.id}
                    reactions={selectedMessage.reactions}
                    onReact={handleReaction}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground">Replies</h3>
                  {selectedMessage.replies.length > 0 ? (
                    selectedMessage.replies.map((reply) => (
                      <div key={reply.id} className="space-y-2">
                        <div className={`flex ${reply.userId === currentUser.id ? "justify-end" : "justify-start"}`}>
                          <div className="flex items-start max-w-[70%]">
                            {reply.userId !== currentUser.id && (
                              <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                                <img
                                  src={
                                    users.find((u) => u.id === reply.userId)?.avatarUrl ||
                                    "/placeholder.svg?height=32&width=32" ||
                                    "/placeholder.svg" ||
                                    "/placeholder.svg" ||
                                    "/placeholder.svg"
                                  }
                                  alt={users.find((u) => u.id === reply.userId)?.name}
                                />
                              </Avatar>
                            )}
                            <div
                              className={`rounded-lg p-3 ${
                                reply.userId === currentUser.id ? "bg-[#22C55E] text-white" : "bg-gray-100"
                              }`}
                            >
                              <p>{reply.content}</p>
                              {reply.imageUrl && (
                                <div className="mt-2">
                                  <img
                                    src={reply.imageUrl || "/placeholder.svg"}
                                    alt="Attached image"
                                    className="rounded-md max-h-60 w-auto"
                                  />
                                </div>
                              )}
                              <div className="text-xs mt-1 opacity-70">
                                {new Date(reply.timestamp).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                            {reply.userId === currentUser.id && (
                              <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                                <img
                                  src={currentUser.avatarUrl || "/placeholder.svg?height=32&width=32"}
                                  alt={currentUser.name}
                                />
                              </Avatar>
                            )}
                          </div>
                        </div>
                        <div className="ml-10">
                          <ReactionPicker
                            messageId={reply.id}
                            currentUserId={currentUser.id}
                            reactions={reply.reactions}
                            onReact={(replyId, userId, emoji) => {
                              setMessages(
                                messages.map((msg) => {
                                  if (msg.id === selectedMessage?.id) {
                                    return {
                                      ...msg,
                                      replies: msg.replies.map((r) => {
                                        if (r.id === replyId) {
                                          const existingReactionIndex = r.reactions.findIndex(
                                            (reaction) => reaction.userId === userId && reaction.emoji === emoji,
                                          )

                                          if (existingReactionIndex >= 0) {
                                            return {
                                              ...r,
                                              reactions: [
                                                ...r.reactions.slice(0, existingReactionIndex),
                                                ...r.reactions.slice(existingReactionIndex + 1),
                                              ],
                                            }
                                          } else {
                                            return {
                                              ...r,
                                              reactions: [...r.reactions, { userId, emoji }],
                                            }
                                          }
                                        }
                                        return r
                                      }),
                                    }
                                  }
                                  return msg
                                }),
                              )
                            }}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No replies yet. Be the first to reply!</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredMessages.map((message) => (
                  <div key={message.id} className="space-y-2">
                    <div className={`flex ${message.userId === currentUser.id ? "justify-end" : "justify-start"}`}>
                      <div className="flex items-start max-w-[70%]">
                        {message.userId !== currentUser.id && (
                          <Avatar className="h-8 w-8 mr-2 mt-1 flex-shrink-0">
                            <img
                              src={
                                users.find((u) => u.id === message.userId)?.avatarUrl ||
                                "/placeholder.svg?height=32&width=32" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg" ||
                                "/placeholder.svg"
                              }
                              alt={users.find((u) => u.id === message.userId)?.name}
                            />
                          </Avatar>
                        )}
                        <div
                          className={`rounded-lg p-3 ${
                            message.userId === currentUser.id ? "bg-[#22C55E] text-white" : "bg-gray-100"
                          }`}
                        >
                          <p>{message.content}</p>
                          {message.imageUrl && (
                            <div className="mt-2">
                              <img
                                src={message.imageUrl || "/placeholder.svg"}
                                alt="Attached image"
                                className="rounded-md max-h-60 w-auto"
                              />
                            </div>
                          )}
                          <div className="text-xs mt-1 opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                        {message.userId === currentUser.id && (
                          <Avatar className="h-8 w-8 ml-2 mt-1 flex-shrink-0">
                            <img
                              src={currentUser.avatarUrl || "/placeholder.svg?height=32&width=32"}
                              alt={currentUser.name}
                            />
                          </Avatar>
                        )}
                      </div>
                    </div>

                    <div className="ml-10">
                      <ReactionPicker
                        messageId={message.id}
                        currentUserId={currentUser.id}
                        reactions={message.reactions}
                        onReact={handleReaction}
                      />
                    </div>

                    <div className="flex items-center space-x-2 ml-10">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 px-2 text-muted-foreground"
                        onClick={() => setSelectedMessage(message)}
                      >
                        <MessageSquareReply className="h-4 w-4 mr-1" />
                        {message.replies.length > 0 && message.replies.length}
                      </Button>
                    </div>

                    {message.replies.length > 0 && (
                      <div className="ml-12 pl-4 border-l-2 border-muted">
                        <Button
                          variant="link"
                          size="sm"
                          className="h-6 p-0 text-muted-foreground"
                          onClick={() => setSelectedMessage(message)}
                        >
                          View {message.replies.length} {message.replies.length === 1 ? "reply" : "replies"}
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-border flex-shrink-0">
          <div className="flex items-center space-x-2 bg-[#DCFCE7]/50 rounded-lg p-2">
            <Textarea
              placeholder={
                selectedMessage
                  ? `Reply to ${users.find((u) => u.id === selectedMessage.userId)?.name}...`
                  : "Type your message..."
              }
              className="min-h-[20px] max-h-[200px] bg-transparent border-0 focus-visible:ring-0 resize-none p-2"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => document.getElementById("image-upload")?.click()}
              >
                <ImageIcon className="h-5 w-5 text-muted-foreground" />
                <input type="file" id="image-upload" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-full"
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <PaperclipIcon className="h-5 w-5 text-muted-foreground" />
                <input type="file" id="file-upload" className="hidden" onChange={handleImageUpload} />
              </Button>
              <Button
                size="icon"
                className="h-9 w-9 rounded-full bg-[#22C55E] hover:bg-[#22C55E]/90 text-white"
                onClick={handleSendMessage}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
          {imagePreview && (
            <div className="mt-2 relative inline-block">
              <img src={imagePreview || "/placeholder.svg"} alt="Preview" className="h-20 w-auto rounded-md" />
              <Button
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full"
                onClick={() => {
                  setSelectedImage(null)
                  setImagePreview(null)
                }}
              >
                &times;
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - User Profile */}
      <div className="w-80 border-l border-border hidden lg:flex flex-col h-full overflow-hidden bg-white">
        <UserProfile
          user={selectedMessage ? users.find((u) => u.id === selectedMessage.userId) || currentUser : currentUser}
        />
      </div>
    </div>
  )
}

