import { cn } from "@/lib/utils"
import { FC, PropsWithChildren, ReactElement } from "react"

interface Props {
  bgColor?: string | null
}

export const Positioning: FC<PropsWithChildren<Props>> = ({ children, bgColor = null }): ReactElement => {
  const bg = bgColor ? bgColor : "bg-gradient-to-r from-indigo-300 to-purple-400"

  return (
    <div className={cn("relative w-screen min-h-screen", bg)}>

      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        {children}
      </div>
    </div>
  )
}