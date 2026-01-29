import { X, Mic, Send, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { TypingIndicator } from "./TypingIndicator";
import { useChatbot } from "./chatbot.hook";
import { DataTable } from "@/components/DataTable/DataTable";
import ChatbotImg from "../../assets/images/chatbot.png";
import { cn } from "@/lib/utils";
interface ChatbotProps {
  onClose: () => void;
  view: "dock" | "fullscreen";
  onToggleView: () => void;
}

function DynamicTableFromRows({ rows }: { rows: Record<string, unknown>[] }) {
  if (!rows || rows.length === 0) return null;

  const keys = Object.keys(rows[0]);
  const columns = keys.map((key) => ({
    key: key as keyof (typeof rows)[0],
    label: key,
  }));

  const idKey = keys[0] || "";

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-auto">
      <DataTable
        data={rows}
        columns={columns}
        idKey={idKey}
        searchEnabled={false}
      />
    </div>
  );
}

interface ChatbotProps {
  onClose: () => void;
}

export function Chatbot({ onClose, view, onToggleView }: ChatbotProps) {
  const {
    messages,
    inputValue,
    setInputValue,
    isListening,
    isTyping,
    typingText,
    typingMessageId,
    messagesEndRef,
    handleSend,
    handleMicClick,
    handleKeyPress,
  } = useChatbot();

  console.log(view, "v");

  return (
    // <Card className="fixed inset-0 z-10000 flex w-full min-w-80 flex-col border-0 border-r rounded-none p-0 h-screen">
    <Card
      className={cn(
        "fixed z-[10000] flex flex-col border-0 bg-white transition-all duration-300 p-0",
        view === "fullscreen"
          ? "inset-0 h-screen w-screen rounded-none"
          : "right-0  h-screen w-[380px]  shadow-2xl",
      )}
    >
      {/* Header */}
      <div className="shrink-0 flex items-center justify-between border-b p-4 h-16">
        <h2 className="font-semibold text-foreground">AI Assistant</h2>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleView}
            className="h-6 w-6 p-0"
            title={view === "fullscreen" ? "Minimize" : "Maximize"}
          >
            {view === "fullscreen" ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-6 w-6 p-0"
            title="Close"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 justify-center items-center">
        {/* {messages.length === 1 && ( */}
        <div className="flex flex-col items-center justify-center gap-4">
          <img src={ChatbotImg} alt="chatbot image" />
        </div>
        {/* )} */}

        {/* {messages.length === 1 && ( */}
        <div className="text-sm flex flex-col justify-start items-center">
          <div className="text-xs text-muted-foreground text-left">
            You can talk to me, ask questions and perform tasks with text
            commands.
          </div>
          <ul
            className={cn(
              "list-disc pl-4 text-[#171717] marker:text-[#171717]",
              view === "fullscreen" ? "ml-20" : "ml-0",
            )}
          >
            <li>
              <p className="text-xs text-muted-foreground text-left">
                I can generate dynamic data analytics dashboards customized to
                your needs.
              </p>
            </li>
            <li>
              <p className="text-xs text-muted-foreground text-left">
                I can help you with jobs, queries and any tasks you would like
                to create, execute or assign.
              </p>
            </li>
            <li>
              <p className="text-xs text-muted-foreground text-left">
                I can scan and analyze your data and provide you with all the
                answers .
              </p>
            </li>
          </ul>
        </div>
        {/* )} */}
        {messages.map((message) => (
          <div
            key={message.id}
            // className="flex justify-center items-center flex-col gap-3"
            className={`flex flex-col items-center gap-3 ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={cn(
                "flex w-full",
                view === "fullscreen" && "md:w-[50%]",
              )}
            >
              {message.role === "assistant" && (
                <div className="shrink-0 h-8 w-8 rounded-full bg-linear-to-br from-cyan-400 to-green-400 flex items-center justify-center text-sm">
                  🤖
                </div>
              )}
            </div>
            <div
              className={cn(
                "flex items-end w-full min-w-0",
                message.role === "user" ? "justify-end" : "justify-start",
                view === "fullscreen" && "md:w-[50%]",
              )}
            >
              <div
                className={`rounded-lg px-4 py-2 min-w-0 ${
                  message.role === "user"
                    ? "w-auto bg-primary text-primary-foreground justify-end"
                    : "max-w-full bg-gray-100 text-foreground justify-start"
                }`}
              >
                {typingMessageId === message.id ? (
                  <p className="text-sm whitespace-pre-wrap">{typingText}</p>
                ) : typeof message.content === "object" &&
                  (message.content?.rows ||
                    message.content?.text ||
                    message.content?.reply) ? (
                  <div className="space-y-4 max-w-full overflow-hidden">
                    {/* Reply section */}
                    {(message.content.text || message.content.reply) && (
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content.text ?? message.content.reply}
                      </p>
                    )}

                    {/* Table section with separator */}
                    {message.content.rows && (
                      <>
                        {message.content.rows.length > 0 && (
                          <hr className="border-t border-gray-300 my-4" />
                        )}
                        <DynamicTableFromRows rows={message.content.rows} />
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">
                    {String(message.content)}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="flex justify-center">
          <div className={cn("w-full", view === "fullscreen" && "md:w-[50%]")}>
            {isTyping && <TypingIndicator />}
          </div>
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex justify-center">
        <div
          className={cn(
            "w-full shrink-0 bg-white p-4 space-y-3",
            view === "fullscreen" && "md:w-[50%]",
          )}
        >
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Ask me anything..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              style={{
                backdropFilter: "blur(3.2908897399902344px)",
                WebkitBackdropFilter: "blur(3.2908897399902344px)",
                boxShadow: "0px 0px 20.57px 0px #24956333",
              }}
            />
            <Button
              variant={isListening ? "default" : "outline"}
              size="sm"
              onClick={handleMicClick}
              className="px-3 h-9"
              title="Use microphone"
              style={{
                backdropFilter: "blur(3.2908897399902344px)",
                WebkitBackdropFilter: "blur(3.2908897399902344px)",
                boxShadow: "0px 0px 20.57px 0px #24956333",
              }}
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              size="sm"
              onClick={handleSend}
              title="Send message"
              className="h-9 w-9 px-3 bg-[#249563] hover:bg-[#1f8156] text-white rounded-3xl"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
