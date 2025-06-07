import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ValidationBadgeProps {
  accuracy: number
  className?: string
}

export function ValidationBadge({ accuracy, className }: ValidationBadgeProps) {
  const getColor = (accuracy: number) => {
    if (accuracy >= 90) return "bg-green-500/20 text-green-500 hover:bg-green-500/30"
    if (accuracy >= 80) return "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
    return "bg-red-500/20 text-red-500 hover:bg-red-500/30"
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className={`${getColor(accuracy)} ${className}`}>
            <div className="w-2 h-2 rounded-full bg-current mr-1.5"></div>
            <span>{accuracy}% Validated</span>
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs max-w-[200px]">
            This prediction has been validated against real-world optimization outcomes from Axle's portfolio of
            distributed energy resources.
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
