
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  isMobile: boolean;
}

const TabNavigation = ({ isMobile }: TabNavigationProps) => {
  return (
    <TabsList className={`w-full grid grid-cols-3 mb-4 ${isMobile ? 'sticky top-0 z-20 bg-black' : ''}`}>
      <TabsTrigger value="overview">Resumo</TabsTrigger>
      <TabsTrigger value="engagement">Engajamento</TabsTrigger>
      <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
