
import { ReactNode } from "react";
import { TabsContent } from "@/components/ui/tabs";

interface TabContentProps {
  value: string;
  children: ReactNode;
  isMobile: boolean;
}

const TabContent = ({ value, children, isMobile }: TabContentProps) => {
  return (
    <TabsContent value={value} className="space-y-6">
      <div className={isMobile 
        ? "w-full max-w-[375px] mx-auto overflow-y-auto box-border pb-28" 
        : "max-h-[calc(100vh-200px)] overflow-y-auto pr-2"
      }>
        {children}
      </div>
    </TabsContent>
  );
};

export default TabContent;
