import React from "react"
import { Message } from "ai/react"
import { cn } from "@/lib/utils"

type Props = {
  messages: Message[],
  isLoading: boolean,
  queryFetchLoading: boolean
}


const LoadingMessage = ({ msg }: { msg: string }) => {
  return <p className="text-xs mt-1 py-1 px-3 text-gray-400">{msg}</p>
}

const MessageList = ({ messages, isLoading, queryFetchLoading }: Props) => {
  if (!messages) return <></>

  if (queryFetchLoading) {
    return <LoadingMessage msg="Loading previous chat" />
  }

  return (
    <div className="flex flex-col flex-1 gap-2 px-4 pb-3">
      {messages.map(message => (
        <div
          key={message.id}
          className={cn("flex", {
            'justify-end pl-10': message.role === "user",
            'justify-start pr-10': message.role === "assistant"
          })}
        >
          <div className={cn("rounded-lg py-1 px-3 text-sm shadow-md ring-gray-900/10", {
            "bg-blue-600 text-white": message.role === "user"
          })}>
            <p>{message.content}</p>
          </div>
        </div>
      ))}
      {isLoading && <LoadingMessage msg="Response is being generated" />}
    </div>
  )
}

export default MessageList