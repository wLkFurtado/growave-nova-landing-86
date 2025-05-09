
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { fetchAndStoreImage, getStoredImage } from "./utils/imageStorage";

interface InstagramProfileImageProps {
  profileUrl: string;
  username: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const InstagramProfileImage = ({
  profileUrl,
  username,
  size = "md",
  className = "",
}: InstagramProfileImageProps) => {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Size mapping
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  useEffect(() => {
    const loadImage = async () => {
      if (!profileUrl) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      
      // Primeiro tentar pegar do armazenamento local
      const cachedImage = getStoredImage(profileUrl);
      
      if (cachedImage) {
        setImgSrc(cachedImage);
        setIsLoading(false);
        return;
      }
      
      // Se não estiver no cache, buscar e armazenar
      try {
        const base64Image = await fetchAndStoreImage(profileUrl);
        setImgSrc(base64Image);
      } catch (error) {
        console.error("Erro ao carregar imagem de perfil:", error);
        setImgSrc(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadImage();
  }, [profileUrl]);

  return (
    <Avatar 
      className={`${sizeClasses[size]} border-2 border-growave-green/30 ${className}`}
    >
      {imgSrc && !isLoading ? (
        <AvatarImage 
          src={imgSrc} 
          alt={`@${username}`} 
          className="object-cover"
        />
      ) : (
        <AvatarFallback className="bg-growave-green/20 text-growave-green flex items-center justify-center">
          {isLoading ? (
            <span className="animate-pulse">...</span>
          ) : username ? (
            username.substring(0, 2).toUpperCase()
          ) : (
            <User className="h-1/2 w-1/2" />
          )}
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default InstagramProfileImage;
