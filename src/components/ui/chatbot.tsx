import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendIcon } from 'lucide-react'

interface Message {
  text: string
  isUser: boolean
}

export default function Component() {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I assist you today?", isUser: false }
  ])
  const [inputText, setInputText] = useState("")

  const handleSendMessage = () => {
    if (inputText.trim() !== "") {
      setMessages([...messages, { text: inputText, isUser: true }])
      // Simulate bot response (replace with actual bot logic)
      setTimeout(() => {
        setMessages(prev => [...prev, { text: "I'm a demo bot. I don't have real responses yet!", isUser: false }])
      }, 1000)
      setInputText("")
    }
  }

  return (
    <div className="flex flex-col h-[500px] max-w-md mx-auto border rounded-lg overflow-hidden">
      <ScrollArea className="flex-grow p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} mb-4`}
          >
            <div
              className={`max-w-[70%] p-3 rounded-lg ${
                message.isUser
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </ScrollArea>
      <div className="border-t p-4 flex gap-2">
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          className="flex-grow"
        />
        <Button onClick={handleSendMessage} size="icon">
          <SendIcon className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
    </div>
  )
}