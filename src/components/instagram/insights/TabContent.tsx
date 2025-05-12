
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
        // Removido height fixo e garantido overflow visível com padding adequado
        <div className="overflow-visible pb-28">
          {children}
        </div>
      ) : (
        // Implementação de desktop com altura máxima mais flexível
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
          {children}
        </div>
      )}
    </TabsContent>
  );
};

export default TabContent;
