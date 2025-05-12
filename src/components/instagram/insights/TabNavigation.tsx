
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabNavigationProps {
  isMobile: boolean;
}

const TabNavigation = ({
  isMobile
}: TabNavigationProps) => {
  return (
    <TabsList className={`${isMobile ? 'w-full grid grid-cols-1' : 'flex'}`}>
      <TabsTrigger value="overview" className="text-sm">
        Visão Geral
      </TabsTrigger>
    </TabsList>
  );
};

export default TabNavigation;
