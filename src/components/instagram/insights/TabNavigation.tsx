
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  isMobile: boolean;
}

const TabNavigation = ({ isMobile }: TabNavigationProps) => {
  return (
    <TabsList className={`w-full max-w-[375px] mx-auto mb-4 ${isMobile ? 'sticky top-0 z-20 bg-black/95 backdrop-blur-sm px-2 box-border' : ''}`}>
      <TabsTrigger value="overview" className="text-sm w-full">Resumo</TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
