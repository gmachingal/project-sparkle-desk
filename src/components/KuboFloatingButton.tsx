import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import KuboChatbot from "./KuboChatbot";

const KuboFloatingButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary transform hover:scale-110 transition-all duration-200 z-40"
            size="sm"
          >
            <Bot className="h-6 w-6" />
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