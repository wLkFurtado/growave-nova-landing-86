
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useInstagramProfile } from "@/hooks/use-instagram-profile";
import ProfileHeader from "./insights/ProfileHeader";
import OverviewSection from "./insights/OverviewSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import QuestionnaireForm from "../questionnaire/QuestionnaireForm";
import { FormValues } from "@/validators/contactFormSchema";

interface InstagramInsightsProps {
  data: any;
  onReset: () => void;
  formValues: FormValues;
  onSubmitQuestionnaire: (data: FormValues) => void;
}

const InstagramInsights = ({ 
  data, 
  onReset, 
  formValues,
  onSubmitQuestionnaire
}: InstagramInsightsProps) => {
  const isMobile = useIsMobile();
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const { profileData, profileAnalysis, clearImages } = useInstagramProfile(data);
  
  // Handler for reset with cleanup
  const handleReset = () => {
    // Limpar o armazenamento de imagens antes de fazer reset
    clearImages();
    // Chamar o reset original
    onReset();
  };

  // Handler to start questionnaire
  const handleStartQuestionnaire = () => {
    setShowQuestionnaire(true);
    window.scrollTo(0, 0);
  };

  // Handler when questionnaire is completed
  const handleQuestionnaireComplete = (updatedFormValues: FormValues) => {
    onSubmitQuestionnaire(updatedFormValues);
  };

  // Handle going back from questionnaire to insights
  const handleBackToInsights = () => {
    setShowQuestionnaire(false);
    window.scrollTo(0, 0);
  };

  if (!profileData || !profileAnalysis) {
    return null;
  }

  if (showQuestionnaire) {
    return (
      <QuestionnaireForm 
        initialValues={formValues} 
        onComplete={handleQuestionnaireComplete}
        onCancel={handleBackToInsights}
      />
    );
  }

  return (
    <div className="text-white flex flex-col items-center justify-center w-full">
      <div className={`w-full max-w-md mx-auto ${isMobile ? 'px-0' : 'px-4 md:px-6'}`}>
        <ProfileHeader username={profileData.username} isMobile={isMobile} />
        
        {isMobile ? (
          <ScrollArea className="max-h-[calc(100vh-70px)] overflow-y-auto">
            <OverviewSection 
              profileData={profileData}
              profileAnalysis={profileAnalysis}
              onReset={handleReset}
              onStartQuestionnaire={handleStartQuestionnaire}
              isMobile={isMobile}
            />
          </ScrollArea>
        ) : (
          <OverviewSection 
            profileData={profileData}
            profileAnalysis={profileAnalysis}
            onReset={handleReset}
            onStartQuestionnaire={handleStartQuestionnaire}
            isMobile={isMobile}
          />
        )}
      </div>
    </div>
  );
};

export default InstagramInsights;
