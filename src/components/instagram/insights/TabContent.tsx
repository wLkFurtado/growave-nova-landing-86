
import { ReactNode } from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TabContentProps {
  value: string;
  children: ReactNode;
  isMobile: boolean;
}

const TabContent = ({ value, children, isMobile }: TabContentProps) => {
  return (
    <TabsContent value={value} className="space-y-6">
      {isMobile ? (
        <div className="overflow-visible">
          {children}
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="pb-6">
            {children}
          </div>
        </ScrollArea>
      )}
    </TabsContent>
  );
};

export default TabContent;
