import { repositoriesCollectionInstance } from "../repositories/repositoriesCollection.ts";
import { IChatMessagesRepository } from "../repositories/chatMessages.ts";

import { customLoggerInstance, ICustomLogger } from "../utils/customLogger.ts";
import { defaultMessages } from "../utils/messages.ts";

import { servicesCollectionInstance, ServicesCollection } from "../services/servicesCollection.ts";

type ChatMessageDTO = {
    id: string;
    message: string;
    role: "user" | "assistant";
};

export interface IChatController {
    /**
     * Generates a chat response for the given chat
     *
     * @param message The message to generate a response for
     * @returns A string promise that resolves when the chat response is complete
     */
    generateChatResponse(
        message: string,
    ): Promise<ChatMessageDTO>;

    /**
     * Retrieves the chat messages for the given chat
     *
     * @returns A promise that resolves to an array of travel plans
     */
    getChatMessages(): Promise<ChatMessageDTO[]>;

    /**
     * Clears the chat messages for the given chat
     *
     * @returns A fresh conversation history
     */
    clearChatMessages(): Promise<ChatMessageDTO[]>;
}

class ChatController implements IChatController {
    private readonly servicesCollection: ServicesCollection;
    private readonly chatMessagesRepository: IChatMessagesRepository;
    private readonly logger: ICustomLogger;

    constructor(servicesCollection: ServicesCollection, chatMessagesRepository: IChatMessagesRepository, logger: ICustomLogger) {
        this.servicesCollection = servicesCollection;
        this.chatMessagesRepository = chatMessagesRepository;
        this.logger = logger;
    }

    async generateChatResponse(
        message: string,
    ): Promise<ChatMessageDTO> {
        await this.chatMessagesRepository.createChatMessage(message, "user");

        const benchmarkData = await this.servicesCollection.benchmarks.getBenchmarkLastYearReport();
        const prompt = `
            Useful Benchmark Data: ${JSON.stringify(benchmarkData)}

            ------------------------------------------------

            User Request: ${message}
        `;

        const assistantMessage = await this.servicesCollection.n8n.generateChatResponse(prompt);

        const insertedAssistantMessage = await this.chatMessagesRepository.createChatMessage(assistantMessage, "assistant");

        return {
            id: insertedAssistantMessage.id,
            message: insertedAssistantMessage.message,
            role: "assistant",
        };
    }

    async getChatMessages(): Promise<ChatMessageDTO[]> {
        let chatMessages = await this.chatMessagesRepository.getChatMessages();

        if (chatMessages.length === 0) {
            const defaultMessage = await this.chatMessagesRepository.createChatMessage(defaultMessages.defaultChatMessage, "assistant");
            chatMessages.push(defaultMessage);
        }

        return chatMessages.map((chatMessage) => ({
            id: chatMessage.id,
            message: chatMessage.message,
            role: chatMessage.role as "user" | "assistant",
        }));
    }

    async clearChatMessages(): Promise<ChatMessageDTO[]> {
        await this.chatMessagesRepository.clearChatMessages();
        return this.getChatMessages();
    }
}

export class ChatControllerMock implements IChatController {
    async generateChatResponse(
        message: string,
    ): Promise<ChatMessageDTO> {
        return {
            id: "mock-id",
            message: "mock-response",
            role: "assistant",
        };
    }

    async getChatMessages(): Promise<ChatMessageDTO[]> {
        return [{
            id: "mock-id",
            message: "mock-response",
            role: "assistant",
        }];
    }

    async clearChatMessages(): Promise<ChatMessageDTO[]> {
        return [{
            id: "mock-id",
            message: "mock-response",
            role: "assistant",
        }];
    }
}

export const chatControllerInstance = new ChatController(
    servicesCollectionInstance,
    repositoriesCollectionInstance.chatMessages,
    customLoggerInstance,
);
