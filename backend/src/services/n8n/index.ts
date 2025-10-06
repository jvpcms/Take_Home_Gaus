import envconfig from "../../envconfig/envconfig.ts";
export interface IN8nService {
    generateChatResponse(prompt: string): Promise<string>;
}

export class N8nService implements IN8nService {
    async generateChatResponse(prompt: string): Promise<string> {
        const response = await fetch(envconfig.n8nServiceUrl(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });
        const responseJson = await response.json();
        console.log(responseJson);
        return responseJson.output;
    }
}