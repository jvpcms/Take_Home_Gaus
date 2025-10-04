import { repositoriesCollectionInstance } from "../repositories/repositoriesCollection.ts";
import { IChatMessagesRepository } from "../repositories/chatMessages.ts";

import { serverErros, CustomError } from "../utils/customErrors.ts";
import { customLoggerInstance, ICustomLogger } from "../utils/customLogger.ts";

import { servicesCollectionInstance } from "../services/servicesCollection.ts";
import { IN8nService } from "../services/n8n/index.ts";

import type { chat_messages } from "../database/types/chat_messages.ts";

type ChatMessageDTO = {
    message: string;
    role: "user" | "assistant";
};

export interface IChatMessagesController {
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

class ChatMessagesController implements IChatMessagesController {
    private readonly chatMessagesRepository: IChatMessagesRepository;
    private readonly logger: ICustomLogger;

    constructor(chatMessagesRepository: IChatMessagesRepository, logger: ICustomLogger) {
        this.chatMessagesRepository = chatMessagesRepository;
        this.logger = logger;
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

export class ChatMessagesControllerMock implements IChatMessagesController {
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

export const chatMessagesControllerInstance = new ChatMessagesController(
    repositoriesCollectionInstance.chatMessages,
    customLoggerInstance,
);
