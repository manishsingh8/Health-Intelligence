import { useState, useRef, useEffect } from "react";
import { MOCK_CHAT_RESPONSE, USE_MOCK_DATA } from "@/constants/ChatbotData";
import { CHATBOT_API_ENDPOINTS } from "@/config/api";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  // content can be plain text or a structured payload (e.g. { rows: [...] })
  content: string | any;
}

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const recognitionRef = useRef<any>(null);
  const typingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        window?.SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.onstart = () => setIsListening(true);
        recognitionRef.current.onend = () => setIsListening(false);
        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join("");
          setInputValue((prev) => prev + transcript);
        };
      }
    }

    // initial webhook call
    const initializeChatbot = async () => {
      try {
        setIsTyping(true);
        const payload = { user_id: 2, message: "Hello" };
        const response = await fetch(
          CHATBOT_API_ENDPOINTS.WEBHOOK,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          }
        );
        const data = await response.json();
        if (data) {
          const hasReply = !!data.reply;
          const hasRows = !!data.rows;

          if (hasReply) {
            const messageId = "1";
            setTypingMessageId(messageId);
            setTypingText("");
            setIsTyping(false);

            setMessages([{ id: messageId, role: "assistant", content: "" }]);

            let charIndex = 0;
            const fullText = data.reply;

            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

            typingIntervalRef.current = setInterval(() => {
              if (charIndex <= fullText.length) {
                const partial = fullText.slice(0, charIndex);
                setTypingText(partial);
                setMessages((prev) =>
                  prev.map((m) => (m.id === messageId ? { ...m, content: partial } : m))
                );
                charIndex++;
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
              } else {
                if (typingIntervalRef.current) {
                  clearInterval(typingIntervalRef.current);
                  typingIntervalRef.current = null;
                }
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === messageId
                      ? hasRows
                        ? { id: messageId, role: "assistant", content: { text: fullText, rows: data.rows } }
                        : { id: messageId, role: "assistant", content: fullText }
                      : m
                  )
                );
                setTypingMessageId(null);
              }
            }, 20);
          } else if (hasRows) {
            const messageId = "1";
            setMessages([{ id: messageId, role: "assistant", content: { rows: data.rows } }]);
            setIsTyping(false);
            setTypingMessageId(null);
          }
        }
      } catch (err) {
        console.error("Error calling initial API:", err);
        setIsTyping(false);
      }
    };

    initializeChatbot();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, []);

  const callChatAPIInternal = async (_messageToSend: string) => {
    // Use mock data for testing
    if (USE_MOCK_DATA) {
      return MOCK_CHAT_RESPONSE;
    }

    try {
      const payload = { user_id: 2, message: _messageToSend };
      const response = await fetch(
        CHATBOT_API_ENDPOINTS.CHAT,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error calling chat API:", err);
      throw err;
    }
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMessage]);
    const messageToSend = inputValue;
    setInputValue("");
    setIsTyping(true);

    (async () => {
      try {
        const data = await callChatAPIInternal(messageToSend);
        if (data) {
          const hasReply = !!data.reply;
          const hasRows = !!data.rows;

          if (hasReply) {
            const messageId = (Date.now() + 1).toString();
            setTypingMessageId(messageId);
            setTypingText("");
            setIsTyping(false);

            // append empty assistant bubble and type into it
            setMessages((prev) => [
              ...prev,
              { id: messageId, role: "assistant", content: "" },
            ]);

            let charIndex = 0;
            const fullText = data.reply;

            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

            typingIntervalRef.current = setInterval(() => {
              if (charIndex <= fullText.length) {
                const partial = fullText.slice(0, charIndex);
                setTypingText(partial);
                setMessages((prev) =>
                  prev.map((m) => (m.id === messageId ? { ...m, content: partial } : m))
                );
                charIndex++;
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
              } else {
                if (typingIntervalRef.current) {
                  clearInterval(typingIntervalRef.current);
                  typingIntervalRef.current = null;
                }
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === messageId
                      ? hasRows
                        ? { id: messageId, role: "assistant", content: { text: fullText, rows: data.rows } }
                        : { id: messageId, role: "assistant", content: fullText }
                      : m
                  )
                );
                setTypingMessageId(null);
              }
            }, 20);
          } else if (hasRows) {
            const messageId = (Date.now() + 1).toString();
            setMessages((prev) => [...prev, { id: messageId, role: "assistant", content: { rows: data.rows } }]);
            setIsTyping(false);
            setTypingMessageId(null);
          }
        }
      } catch (err) {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "Sorry, I encountered an error processing your request.",
          },
        ]);
      }
    })();
  };

  const handleMicClick = () => {
    if (recognitionRef.current) {
      if (isListening) recognitionRef.current.stop();
      else recognitionRef.current.start();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return {
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
  } as const;
}
