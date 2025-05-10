
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
        <div className="overflow-visible pb-32">
          {children}
        </div>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          {children}
        </ScrollArea>
      )}
    </TabsContent>
  );
};

export default TabContent;
