import FileUpload from "@/components/FileUpload";
import { Positioning } from "@/components/layout/positioning";
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { UserButton, auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { ArrowRight, LogIn } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth()
  const isAuth = !!userId

  let firstChat;
  if (userId) {
    firstChat = await db.select().from(chats).where(eq(chats.userId, userId));
    if (firstChat) {
      firstChat = firstChat[0];
    }
  }

  return (
    <Positioning>
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center">
          <h1 className="mr-3 text-5xl font-semibold">Talk to your PDF</h1>
          <UserButton
            afterSignOutUrl="/"
          />
        </div>
        <div className="flex mt-2">
          {isAuth && firstChat && (
            <>
              <Link href={`/chat/${firstChat.id}`}>
                <Button>
                  Go to Chats <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </>
          )}
        </div>
        <p className="max-w-xl mt-2 text-lg text-slate-800">
          Join million of professionals to instantly get their answers from AI
        </p>
        <div className="w-full mt-4">
          {isAuth ? <FileUpload /> : (
            <Link href="/sign-in">
              <Button>Login to Get Started
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Positioning>
  );
}
