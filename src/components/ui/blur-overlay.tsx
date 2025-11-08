import { cn } from "@/lib/utils";

interface BlurOverlayProps {
  position: "top" | "bottom";
  height?: string;
  className?: string;
}

export const BlurOverlay = ({ 
  position, 
  height = position === "top" ? "h-40" : "h-32",
  className 
}: BlurOverlayProps) => {
  const gradientClass = position === "top" 
    ? "bg-gradient-to-b from-black via-black/50 to-transparent" 
    : "bg-gradient-to-t from-black via-black/50 to-transparent";
  
  const positionClass = position === "top" ? "top-0" : "bottom-0";
  
  return (
    <div 
      className={cn(
        "fixed left-0 w-full backdrop-blur-md pointer-events-none",
        height,
        positionClass,
        gradientClass,
        position === "top" ? "z-40" : "z-30",
        className
      )}
    />
  );
};
