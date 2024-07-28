import ChatComponent from '@/components/ChatComponent'
import ChatSidebar from '@/components/ChatSidebar'
import PdfViewer from '@/components/PdfViewer'
import { db } from '@/lib/db'
import { chats } from '@/lib/db/schema'
import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import React from 'react'

type Props = {
  params: {
    chatId: string
  }
}

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth()
  const _chatId = parseInt(chatId)

  if (!userId) {
    return redirect("/sign-in")
  }

  const _chats = await db.select().from(chats).where(eq(chats.userId, userId))

  if (!_chats) {
    return redirect("/")
  }
  if (!_chats.find((chat: { id: number }) => chat.id === _chatId)) {
    return redirect("/")
  }

  const currentChat = _chats.find(chat => chat.id === _chatId)

  return (
    <div className="flex max-h-screen overflow-hidden">
      <div className="flex w-full max-h-screen overflow-y-auto">
        <div className="flex-[2] max-w-xs">
          <ChatSidebar chats={_chats} chatId={_chatId} />
        </div>
        <div className="max-h-screen p-4 flex-[5]">
          <PdfViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
        <div className="flex-[3] border-l-4 border-l-slate-200 overflow-x-hidden overflow-y-auto">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  )
}

export default ChatPage