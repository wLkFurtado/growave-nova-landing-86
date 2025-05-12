
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProfileBiographyProps {
  biography: string;
  isMobile?: boolean;
}

const ProfileBiography = ({ biography, isMobile = false }: ProfileBiographyProps) => {
  if (!biography) return null;
  
  return (
    <div className={isMobile ? "mt-2 mb-2" : "mt-6 mb-6"}>
      <h4 className={`text-sm font-medium ${isMobile ? 'mb-1' : 'mb-3'}`}>Biografia</h4>
      <div className="bg-white/5 rounded-lg">
        <ScrollArea className={isMobile ? "max-h-[100px]" : "max-h-[150px]"}>
          <p className={`text-xs text-gray-300 ${isMobile ? 'p-2' : 'p-4'} whitespace-pre-wrap`}>
            {biography}
          </p>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProfileBiography;
