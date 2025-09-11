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
          <div
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-110 transition-all duration-200 z-40 cursor-pointer overflow-hidden"
          >
            <img src={kuboLogo} alt="Kubo" className="h-full w-full object-cover scale-110" />
          </div>
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