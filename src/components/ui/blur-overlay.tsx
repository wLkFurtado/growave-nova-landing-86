import { cn } from "@/lib/utils";

interface BlurOverlayProps {
  position: "top" | "bottom";
  height?: string;
  className?: string;
}

export const BlurOverlay = ({ 
  position, 
  height = position === "top" ? "h-32" : "h-24",
  className 
}: BlurOverlayProps) => {
  const gradientClass = position === "top" 
    ? "bg-gradient-to-b from-black/90 via-black/40 via-black/20 to-transparent" 
    : "bg-gradient-to-t from-black/90 via-black/40 via-black/20 to-transparent";
  
  const positionClass = position === "top" ? "top-0" : "bottom-0";
  
  return (
    <div 
      className={cn(
        "fixed left-0 w-full backdrop-blur-sm pointer-events-none",
        height,
        positionClass,
        gradientClass,
        position === "top" ? "z-40" : "z-30",
        className
      )}
    />
  );
};
