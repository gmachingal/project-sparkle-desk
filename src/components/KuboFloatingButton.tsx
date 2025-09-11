import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import KuboChatbot from "./KuboChatbot";
const kuboLogo = "/lovable-uploads/9eec875c-3ab9-4fe6-a0a5-e3fc81400d0d.png";

const KuboFloatingButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-transparent hover:bg-transparent transform hover:scale-110 transition-all duration-200 z-40 border-0 hover:shadow-primary/30 p-0 overflow-hidden"
            size="sm"
          >
            <img src={kuboLogo} alt="Kubo" className="h-full w-full object-cover rounded-full scale-105" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="mr-4">
          <p>Chat with Kubo</p>
        </TooltipContent>
      </Tooltip>

      <KuboChatbot 
        isOpen={isChatOpen} 
        onClose={() => setIsChatOpen(false)} 
      />
    </>
  );
};

export default KuboFloatingButton;