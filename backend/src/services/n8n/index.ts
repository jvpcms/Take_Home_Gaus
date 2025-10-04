export interface IN8nService {
    generateChatResponse(message: string): Promise<string>;
}

export class N8nService implements IN8nService {
    async generateChatResponse(message: string): Promise<string> {
        return "mock-response";
    }
}