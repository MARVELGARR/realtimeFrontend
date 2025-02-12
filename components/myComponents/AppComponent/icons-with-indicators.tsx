import type React from "react"

interface IconWithIndicatorProps {
  icon: React.ComponentType<{ className?: string }>
  count?: number
  color?: "green" | "red"
  className?: string
}

export const IconWithIndicator: React.FC<IconWithIndicatorProps> = ({ icon: Icon, count, color, className }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <Icon className="w-full h-full" />
      {count !== undefined && count > 0 && (
        <span
          className={`absolute -top-1 -right-1 bg-${color}-500 text-white rounded-full text-xs px-1 min-w-[1.25rem] h-5 flex items-center justify-center`}
        >
          {count}
        </span>
      )}
    </div>
  )
}

