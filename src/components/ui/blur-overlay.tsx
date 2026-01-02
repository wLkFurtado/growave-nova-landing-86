import { cn } from "@/lib/utils";

interface BlurOverlayProps {
  position: "top" | "bottom";
  height?: string;
  className?: string;
}

export const BlurOverlay = ({ 
  position, 
  height = position === "top" ? "h-48" : "h-40",
  className 
}: BlurOverlayProps) => {
  // Gradiente mais suave com múltiplas paradas para transição gradual
  const gradientClass = position === "top" 
    ? "bg-gradient-to-b from-black via-black/70 via-40% via-black/30 via-70% to-transparent" 
    : "bg-gradient-to-t from-black via-black/70 via-40% via-black/30 via-70% to-transparent";
  
  const positionClass = position === "top" ? "top-0" : "bottom-0";
  
  return (
    <div 
      className={cn(
        "fixed left-0 w-full pointer-events-none",
        height,
        positionClass,
        gradientClass,
        position === "top" ? "z-40" : "z-30",
        className
      )}
    />
  );
};
