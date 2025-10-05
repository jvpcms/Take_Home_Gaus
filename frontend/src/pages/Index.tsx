import { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '@/components/ChatMessage';
import { ChatInput } from '@/components/ChatInput';
import { ThinkingIndicator } from '@/components/ThinkingIndicator';
import { LoadingIndicator } from '@/components/LoadingIndicator';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { sendMessage, loadMessageHistory, clearMessages, type Message } from '@/services/chatApi';

type ChatState = 'loading' | 'idle' | 'thinking';

const Index = () => {
  const [state, setState] = useState<ChatState>('loading');
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, state]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await loadMessageHistory();
        setMessages(history);
      } catch (error) {
        console.error('Error loading message history:', error);
      } finally {
        setState('idle');
      }
    };

    loadHistory();
  }, []);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    setMessages((prev) => [...prev, userMessage]);
    setState('thinking');

    try {
      const response = await sendMessage(content);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setState('idle');
    }
  };

  const handleClearMessages = async () => {
    try {
      await clearMessages();
      const history = await loadMessageHistory();
      setMessages(history);
    } catch (error) {
      console.error('Error clearing messages:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[image:var(--gradient-bg)] flex flex-col">
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            AI Chat Assistant
          </h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearMessages}
            disabled={state !== 'idle' || messages.length === 0}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-6 space-y-2">
          {state === 'loading' ? (
            <LoadingIndicator />
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage key={message.id} role={message.role} content={message.content} />
              ))}

              {state === 'thinking' && <ThinkingIndicator />}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        <div className="sticky bottom-0 bg-background/80 backdrop-blur-sm border-t border-border pt-4 -mx-4 px-4">
          <ChatInput onSend={handleSendMessage} disabled={state !== 'idle'} />
        </div>
      </main>
    </div>
  );
};

export default Index;