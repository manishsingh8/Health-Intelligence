import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/Sidebar";
import { AppSidebar } from "@/layout/AppSidebar";
import { Separator } from "@/components/ui/Separator";
import { Outlet } from "react-router-dom";
import { Chatbot } from "@/components/Chatbot/Chatbot";
import { MessageCircle } from "lucide-react";

type ChatbotView = "dock" | "fullscreen";

export const MainLayout = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(() => {
    const hasSeenChatbot = localStorage.getItem("hasSeenChatbot");
    return !hasSeenChatbot;
  });

  const [chatbotView, setChatbotView] = useState<ChatbotView>("dock");

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleCloseChatbot = () => {
    localStorage.setItem("hasSeenChatbot", "true");
    setIsChatbotOpen(false);
    setChatbotView("dock");
  };

  const handleToggleChatbotView = () => {
    setChatbotView((prev) => (prev === "dock" ? "fullscreen" : "dock"));
  };

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <AppSidebar />

      {isChatbotOpen && (
        <Chatbot
          onClose={handleCloseChatbot}
          view={chatbotView}
          onToggleView={handleToggleChatbotView}
        />
      )}

      {!isChatbotOpen && (
        <button
          onClick={() => {
            setChatbotView("dock");
            setIsChatbotOpen(true);
          }}
          className="fixed bottom-6 right-6 bg-[#249563] text-white w-14 h-14
               rounded-full flex items-center justify-center shadow-lg
               hover:opacity-90 transition z-[9999]"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="flex h-16 items-center gap-2 border-b px-4">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-4" />
        </header>

        <main className="flex-1 overflow-auto min-w-0">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
