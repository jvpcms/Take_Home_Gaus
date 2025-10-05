import envconfig from "@/envconfig/envconfig";
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export const loadMessageHistory = async (): Promise<Message[]> => {
  const response = await fetch(`${envconfig.backendUrl()}/chat-messages`, {
    method: 'GET'
  });
  const responseJson = await response.json();
  const data = responseJson.data;
  return data.map((message: { id: string, role: 'user' | 'assistant', message: string }) => ({
    id: message.id,
    role: message.role,
    content: message.message,
  }));
};

export const clearMessages = async (): Promise<Message[]> => {
  const response = await fetch(`${envconfig.backendUrl()}/chat-messages`, {
    method: 'DELETE'
  });
  const responseJson = await response.json();
  const data = responseJson.data;
  return data.map((message: { id: string, role: 'user' | 'assistant', message: string }) => ({
    id: message.id,
    role: message.role,
    content: message.message,
  }));
};

export const sendMessage = async (message: string): Promise<Message> => {
  const response = await fetch(`${envconfig.backendUrl()}/chat-messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message })
  });
  const responseJson = await response.json();
  const data = responseJson.data;
  return {
    id: data.id,
    role: data.role,
    content: data.message,
  };
};