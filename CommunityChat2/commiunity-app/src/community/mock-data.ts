import type { User, Message, Reaction } from "./types"

export const mockUsers: User[] = [
  {
    id: "user1",
    name: "John Farmer",
    email: "john@farmconnect.com",
    avatarUrl: "https://images.unsplash.com/photo-1520052203542-d3095f1b6cf0?q=80&w=200&h=200&auto=format&fit=crop",
    location: "Iowa, USA",
    tags: ["Corn", "Soybeans", "Sustainable", "Organic"],
    joinDate: "2022-01-15",
    messageCount: 42,
  },
  {
    id: "user2",
    name: "Maria Rodriguez",
    email: "maria@farmconnect.com",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&h=200&auto=format&fit=crop",
    location: "California, USA",
    tags: ["Organic", "Vegetables", "Local", "Greenhouse"],
    joinDate: "2022-03-22",
    messageCount: 28,
  },
  {
    id: "user3",
    name: "Robert Johnson",
    email: "robert@farmconnect.com",
    avatarUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&h=200&auto=format&fit=crop",
    location: "Texas, USA",
    tags: ["Cattle", "Regenerative", "Grazing", "Livestock"],
    joinDate: "2022-02-10",
    messageCount: 35,
  },
  {
    id: "user4",
    name: "Sarah Williams",
    email: "sarah@farmconnect.com",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&h=200&auto=format&fit=crop",
    location: "Georgia, USA",
    tags: ["Poultry", "Education", "Technology", "Free-range"],
    joinDate: "2022-04-05",
    messageCount: 19,
  },
  {
    id: "user5",
    name: "David Chen",
    email: "david@farmconnect.com",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&h=200&auto=format&fit=crop",
    location: "Washington, USA",
    tags: ["Berries", "Precision Ag", "Technology", "Irrigation"],
    joinDate: "2022-05-18",
    messageCount: 23,
  },
]

// Convert old reactions format to new format
const convertReactions = (userIds: string[]): Reaction[] => {
  return userIds.map((userId) => ({
    userId,
    emoji: "👍", // Default to thumbs up for existing reactions
  }))
}

// Add some variety to reactions
const createMixedReactions = (userIds: string[]): Reaction[] => {
  const emojis = ["👍", "❤️", "😂", "😮", "👏"]
  return userIds.map((userId, index) => ({
    userId,
    emoji: emojis[index % emojis.length],
  }))
}

export const mockMessages: Message[] = [
  {
    id: "msg1",
    userId: "user2",
    content:
      "Has anyone dealt with tomato blight this season? I'm seeing early signs in my greenhouse and looking for organic solutions that won't harm beneficial insects.",
    timestamp: "2023-06-15T10:30:00Z",
    replies: [
      {
        id: "reply1",
        userId: "user4",
        content:
          "I've had good results with a copper fungicide spray. Make sure to apply early morning and improve air circulation in your greenhouse. Also, remove affected leaves immediately.",
        timestamp: "2023-06-15T11:15:00Z",
        replies: [],
        reactions: [
          { userId: "user2", emoji: "👍" },
          { userId: "user3", emoji: "❤️" },
        ],
      },
      {
        id: "reply2",
        userId: "user1",
        content:
          "Try a baking soda solution - 1 tablespoon baking soda, 1 tablespoon vegetable oil, and a drop of dish soap in a gallon of water. Spray weekly as a preventative. I've been using this for years with good results.",
        timestamp: "2023-06-15T12:05:00Z",
        replies: [],
        reactions: [{ userId: "user2", emoji: "🙏" }],
      },
    ],
    reactions: createMixedReactions(["user1", "user3", "user4"]),
    imageUrl: "https://images.unsplash.com/photo-1592982573971-2c0d1a2c3143?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "msg2",
    userId: "user3",
    content:
      "Looking for recommendations on drought-resistant feed crops for cattle. Our rainfall has been below average for the third year in a row, and I need to plan for next season.",
    timestamp: "2023-06-14T15:45:00Z",
    replies: [
      {
        id: "reply3",
        userId: "user1",
        content:
          "Sorghum-sudangrass hybrids have worked well for me in dry conditions. Deep root systems and good regrowth after grazing. I can share my seed supplier info if you're interested.",
        timestamp: "2023-06-14T16:20:00Z",
        replies: [],
        reactions: [{ userId: "user3", emoji: "👍" }],
      },
      {
        id: "reply5",
        userId: "user5",
        content:
          "Consider pearl millet as well. It's very drought tolerant and provides good nutrition for cattle. We've been using it as a summer annual when our cool-season pastures slow down.",
        timestamp: "2023-06-14T17:05:00Z",
        replies: [],
        reactions: [
          { userId: "user3", emoji: "👍" },
          { userId: "user1", emoji: "❤️" },
        ],
      },
    ],
    reactions: createMixedReactions(["user1", "user4", "user5"]),
    imageUrl: "https://images.unsplash.com/photo-1500595046743-cd271d694e30?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "msg3",
    userId: "user1",
    content:
      "Just installed a new precision planting system for my corn fields. Happy to share my experience if anyone is considering an upgrade this year. The yield improvement has been significant!",
    timestamp: "2023-06-13T09:10:00Z",
    replies: [
      {
        id: "reply6",
        userId: "user5",
        content:
          "Which system did you go with? I've been looking at the John Deere ExactEmerge but haven't pulled the trigger yet. What kind of ROI are you seeing?",
        timestamp: "2023-06-13T10:25:00Z",
        replies: [],
        reactions: [{ userId: "user1", emoji: "👍" }],
      },
    ],
    reactions: [
      { userId: "user3", emoji: "👏" },
      { userId: "user5", emoji: "😮" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "msg4",
    userId: "user4",
    content:
      "Does anyone have experience with mobile chicken coops for pasture rotation? Looking at building one this summer to improve our egg production and soil health.",
    timestamp: "2023-06-12T14:25:00Z",
    replies: [
      {
        id: "reply4",
        userId: "user2",
        content:
          "I built one last year using an old trailer frame. Works great! I can share some photos of my design if you're interested. We move it every 3 days and the pasture recovery has been amazing.",
        timestamp: "2023-06-12T15:30:00Z",
        replies: [],
        reactions: [{ userId: "user4", emoji: "🙏" }],
      },
    ],
    reactions: [
      { userId: "user2", emoji: "👍" },
      { userId: "user5", emoji: "❤️" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "msg5",
    userId: "user5",
    content:
      "Has anyone implemented drip irrigation for berries? I'm expanding my blueberry operation and want to maximize water efficiency. Looking for recommendations on equipment and setup.",
    timestamp: "2023-06-11T11:20:00Z",
    replies: [
      {
        id: "reply7",
        userId: "user2",
        content:
          "We use drip irrigation for all our vegetables including berries. I recommend pressure-compensating emitters if your land has any slope. Also, consider adding a fertigation system - it's been a game changer for us.",
        timestamp: "2023-06-11T12:45:00Z",
        replies: [],
        reactions: [
          { userId: "user5", emoji: "👍" },
          { userId: "user1", emoji: "👏" },
        ],
      },
    ],
    reactions: [
      { userId: "user2", emoji: "👍" },
      { userId: "user1", emoji: "❤️" },
    ],
    imageUrl: "https://images.unsplash.com/photo-1626920369764-17b9c9fe449a?q=80&w=600&auto=format&fit=crop",
  },
]

