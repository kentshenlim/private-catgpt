import { type Message } from "@/lib/schema";

export const fakeConversation: Message[] = [
  { role: "user", content: "Hey, how's it going?" },
  { role: "system", content: "Hey! Pretty good. How about you?" },
  {
    role: "user",
    content: "Not bad! Just working on my chat app and testing the UI.",
  },
  {
    role: "system",
    content:
      "That sounds interesting! What are you focusing on right now? UI design, state management, or backend integration?",
  },
  {
    role: "user",
    content: "Mainly state management and rendering messages properly.",
  },
  {
    role: "system",
    content:
      "That's a great place to start! Are you using React Context for managing state, or something else?",
  },
  {
    role: "user",
    content:
      "Yeah, I'm using the Context API to store conversations and update messages dynamically.",
  },
  {
    role: "system",
    content:
      "Nice! That should keep your state centralized. Are you also persisting messages, or just keeping them in memory for now?",
  },
  {
    role: "user",
    content:
      "Just in memory for now. I'll add local storage or a backend later.",
  },
  {
    role: "system",
    content:
      "That makes sense. Keeping things simple at first is always a good idea. Do you plan to support real-time messaging?",
  },
  {
    role: "user",
    content:
      "Yeah, but that will come later. I'm thinking of using WebSockets for that.",
  },
  {
    role: "system",
    content:
      "WebSockets are great for real-time communication! But they do come with challenges like reconnection handling and scaling.",
  },
  {
    role: "user",
    content:
      "Exactly! I've read about using a message queue like Redis to help with scaling.",
  },
  {
    role: "system",
    content:
      "That's a solid approach! If you plan to support multiple users chatting in real-time, Redis Pub/Sub can help distribute messages efficiently.",
  },
  {
    role: "user",
    content:
      "I'll look into it more. Right now, just getting the basics right.",
  },
  {
    role: "system",
    content:
      "Good plan. Are you handling things like message timestamps and sender details in your UI?",
  },
  {
    role: "user",
    content: "Not yet, but I should probably add timestamps soon.",
  },
  {
    role: "system",
    content:
      "Definitely! Even a simple timestamp can improve the user experience a lot. You could format them with libraries like `date-fns` or `dayjs`.",
  },
  {
    role: "user",
    content:
      "I've used `dayjs` before. It's pretty lightweight and easy to use.",
  },
  {
    role: "system",
    content:
      "Yep! It's a good choice. Are you planning to allow message editing or deletion?",
  },
  {
    role: "user",
    content:
      "Hmm, I haven't thought about that yet. Probably later, after the main features are working.",
  },
  {
    role: "system",
    content:
      "That's fair! Message editing adds complexity, especially when considering real-time synchronization across users.",
  },
  {
    role: "user",
    content: "Yeah, I don't want to overcomplicate things too soon.",
  },
  {
    role: "system",
    content:
      "That's a great mindset. Start small, iterate, and improve over time!",
  },
  {
    role: "user",
    content: "Thanks! This chat is helping me organize my thoughts.",
  },
  {
    role: "system",
    content:
      "Glad to hear that! Keep going, and let me know if you need more help!",
  },
  { role: "user", content: "Will do! Time to code. 😃" },
  { role: "system", content: "Happy coding! 🚀" },
];
