
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

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
  const [imgSrc, setImgSrc] = useState<string | null>(profileUrl);
  const [imgError, setImgError] = useState(false);

  // Size mapping
  const sizeClasses = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-24 w-24",
  };

  useEffect(() => {
    // Reset state when URL changes
    setImgSrc(profileUrl);
    setImgError(false);
  }, [profileUrl]);

  // Handle image error by setting error state
  const handleImageError = () => {
    console.log("Image failed to load:", profileUrl);
    setImgError(true);
    setImgSrc(null);
  };

  // Try to use a proxy if direct image fails
  useEffect(() => {
    if (imgError && profileUrl) {
      // If the original URL failed, try with a CORS proxy as a fallback
      // Note: This is a public CORS proxy for testing - in production you'd want your own solution
      const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(profileUrl)}`;
      console.log("Trying proxy URL:", proxyUrl);
      setImgSrc(proxyUrl);
      setImgError(false); // Reset error to try the new URL
    }
  }, [imgError, profileUrl]);

  return (
    <Avatar 
      className={`${sizeClasses[size]} border-2 border-growave-green/30 ${className}`}
    >
      {imgSrc && !imgError ? (
        <AvatarImage 
          src={imgSrc} 
          alt={`@${username}`} 
          className="object-cover"
          onError={handleImageError}
        />
      ) : (
        <AvatarFallback className="bg-growave-green/20 text-growave-green flex items-center justify-center">
          {username ? (
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
