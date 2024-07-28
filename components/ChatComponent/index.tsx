'use client'
import React, { useEffect } from 'react'
import { Input } from '../ui/input'
import { useChat } from "ai/react"
import { Button } from '../ui/button'
import { Send } from 'lucide-react'
import MessageList from '../MessageList'
import { useQuery } from '@tanstack/react-query'
import { Message } from 'ai'
import axios from 'axios'

type Props = { chatId: number }

const ChatComponent = ({ chatId }: Props) => {
  const { data, isLoading: queryFetchLoading } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const response: any = await axios.post<Message>("/api/get-messages", { chatId })
      return response.data
    }
  })
  const { input, handleInputChange, handleSubmit, messages, isLoading } = useChat({
    api: '/api/chat',
    body: {
      chatId
    },
    initialMessages: data || []
  })

  useEffect(() => {
    const messageContainer = document.getElementById('message-container')
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])

  return (
    <div className="relative max-h-screen h-full flex flex-col" id="message-container">
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      <MessageList
        messages={messages}
        isLoading={isLoading}
        queryFetchLoading={queryFetchLoading}
      />

      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white flex"
      >
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask any question..."
          className="w-full"
        />
        <Button className="bg-blue-600 ml-2">
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}

export default ChatComponent