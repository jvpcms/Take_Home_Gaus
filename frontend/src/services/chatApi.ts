// Mock API service for chat

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const loadMessageHistory = async (): Promise<Message[]> => {
  // Simulate API delay for loading history
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Mock initial message history
  return [
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. How can I help you today?'
    }
  ];
};

export const clearMessages = async (): Promise<void> => {
  // Simulate API delay for clearing messages
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real implementation, this would clear the conversation on the backend
};

export const sendMessage = async (message: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock response with markdown
  return `Thank you for your message! You said: **"${message}"**

Here's a sample markdown response:

- This is a **mock API** response
- The real backend will be integrated later
- Markdown rendering is working ✓

\`\`\`typescript
const example = "code block";
console.log(example);
\`\`\`

> This is a quote to demonstrate markdown formatting.`;
};