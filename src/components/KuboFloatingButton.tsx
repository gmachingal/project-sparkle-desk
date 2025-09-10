import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import KuboChatbot from "./KuboChatbot";
import kuboIcon from "@/assets/kubo-icon.png";

const KuboFloatingButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-2xl bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transform hover:scale-110 transition-all duration-200 z-40 border-2 border-white/20 hover:shadow-primary/30 p-2"
            size="sm"
          >
            <img src={kuboIcon} alt="Kubo" className="h-full w-full object-contain" />
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