import envconfig from "../../envconfig/envconfig";
import type { chat_messages } from "../../database/types/chat_messages";
export interface IN8nService {
    generateChatResponse(messages: chat_messages[]): Promise<string>;
}

export class N8nService implements IN8nService {
    async generateChatResponse(messages: chat_messages[]): Promise<string> {
        const historyDTO = messages.map((message) => ({
            role: message.role,
            message: message.message,
        }));
        console.log("historyDTO", historyDTO);
        const response = await fetch(envconfig.n8nServiceUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messageHistory: historyDTO }),
        });
        const responseJson = await response.json();
        return responseJson.output;
    }
}