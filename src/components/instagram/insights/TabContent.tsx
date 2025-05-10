
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
      <div className={isMobile ? 'overflow-visible pb-32' : ''}>
        {children}
      </div>
    </TabsContent>
  );
};

export default TabContent;
