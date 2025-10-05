import { repositoriesCollectionInstance } from "../repositories/repositoriesCollection.ts";
import { IChatMessagesRepository } from "../repositories/chatMessages.ts";

import { customLoggerInstance, ICustomLogger } from "../utils/customLogger.ts";
import { defaultMessages } from "../utils/messages.ts";

import { servicesCollectionInstance } from "../services/servicesCollection.ts";
import { IN8nService } from "../services/n8n/index.ts";

import { v4 } from "uuid";

type ChatMessageDTO = {
    message: string;
    role: "user" | "assistant";
};

export interface IChatController {
    /**
     * Creates a new chat, adds a default message to the chat, returns the chat id
     *
     * @returns A promise that resolves to the created chat
     */
    createChat(): Promise<string>;

    /**
     * Generates a chat response for the given chat
     *
     * @param chatId The ID of the chat
     * @param message The message to generate a response for
     * @returns A string promise that resolves when the chat response is complete
     */
    generateChatResponse(
        chatId: string,
        message: string,
    ): Promise<ChatMessageDTO>;

    /**
     * Retrieves the chat messages for the given chat
     *
     * @param chatId The ID of the chat whose messages are to be retrieved
     * @returns A promise that resolves to an array of travel plans
     */
    getChatMessagesByChatId(chatId: string): Promise<ChatMessageDTO[]>;
}

class ChatController implements IChatController {
    private readonly n8nService: IN8nService;
    private readonly chatMessagesRepository: IChatMessagesRepository;
    private readonly logger: ICustomLogger;

    constructor(n8nService: IN8nService, chatMessagesRepository: IChatMessagesRepository, logger: ICustomLogger) {
        this.n8nService = n8nService;
        this.chatMessagesRepository = chatMessagesRepository;
        this.logger = logger;
    }

    async createChat(): Promise<string> {
        const chatId = v4();
        await this.chatMessagesRepository.createChatMessage(chatId, defaultMessages.defaultChatMessage, "assistant");
        return chatId;
    }

    async generateChatResponse(
        chatId: string,
        message: string,
    ): Promise<ChatMessageDTO> {
        const chatMessage = await this.chatMessagesRepository.createChatMessage(chatId, message, "user");

        const assistantMessage = await servicesCollectionInstance.n8n.generateChatResponse(chatMessage.message);

        await this.chatMessagesRepository.createChatMessage(chatId, assistantMessage, "assistant");

        return {
            message: assistantMessage,
            role: "assistant",
        };
    }

    async getChatMessagesByChatId(chatId: string): Promise<ChatMessageDTO[]> {
        const chatMessages = await this.chatMessagesRepository.getChatMessagesByChatId(chatId);
        return chatMessages.map((chatMessage) => ({
            message: chatMessage.message,
            role: chatMessage.role as "user" | "assistant",
        }));
    }
}

export class ChatControllerMock implements IChatController {
    async createChat(): Promise<string> {
        return "mock-chat-id";
    }

    async generateChatResponse(
        chatId: string,
        message: string,
    ): Promise<ChatMessageDTO> {
        return {
            message: "mock-response",
            role: "assistant",
        };
    }

    async getChatMessagesByChatId(chatId: string): Promise<ChatMessageDTO[]> {
        return [{
            message: "mock-response",
            role: "assistant",
        }];
    }

}

export const chatControllerInstance = new ChatController(
    servicesCollectionInstance.n8n,
    repositoriesCollectionInstance.chatMessages,
    customLoggerInstance,
);
