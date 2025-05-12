
import { useState } from "react";

export const useInstagramTabs = (isMobile: boolean) => {
  const [activeTab, setActiveTab] = useState("overview");

  // Handler for tab change to ensure scroll to top when switching tabs on mobile
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (isMobile) {
      // Scroll to top of tab content when switching tabs on mobile
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return {
    activeTab,
    handleTabChange
  };
};
