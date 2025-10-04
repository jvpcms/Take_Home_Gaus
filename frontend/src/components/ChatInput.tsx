import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
}

export const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={disabled ? "AI is thinking..." : "Type your message..."}
        disabled={disabled}
        className="min-h-[60px] max-h-[200px] resize-none bg-background border-border focus-visible:ring-ring transition-all"
        rows={1}
      />
      <Button
        type="submit"
        disabled={disabled || !message.trim()}
        className="h-[60px] w-[60px] rounded-2xl bg-gradient-to-br from-primary to-accent hover:opacity-90 transition-all disabled:opacity-50"
      >
        <Send className="h-5 w-5" />
      </Button>
    </form>
  );
};
