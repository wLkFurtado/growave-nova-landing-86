
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProfileBiographyProps {
  biography: string;
}

const ProfileBiography = ({ biography }: ProfileBiographyProps) => {
  if (!biography) return null;
  
  return (
    <div className="mt-6 mb-6">
      <h4 className="text-sm font-medium mb-3">Biografia</h4>
      <div className="bg-white/5 rounded-lg">
        <ScrollArea className="max-h-[150px]">
          <p className="text-sm text-gray-300 p-4 whitespace-pre-wrap">
            {biography}
          </p>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ProfileBiography;
