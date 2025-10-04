import { v4 } from "uuid";

import type { chat_messages } from "../database/types/chat_messages.ts";
import { IDatabase, getDatabase } from "../database/database.ts";
import { getTimestamp } from "../utils/timestamp.ts";

export interface IChatMessagesRepository {
    /**
     * Creates a new AI message with the given details.
     *
     * @param chatId The ID of the chat creating the message.
     * @param message The message details as a string.
     * @param role The role of the message.
     * @returns A promise that resolves to the created message.
     */
    createChatMessage(
        chatId: string,
        message: string,
        role: string,
    ): Promise<chat_messages>;

    /**
     * Retrieves all messages for a given chat.
     *
     * @param chatId The ID of the chat whose messages are to be retrieved.
     * @returns A promise that resolves to an array of messages.
     */
    getChatMessagesByChatId(chatId: string): Promise<chat_messages[]>;
}

export class ChatMessagesRepositoryMock implements IChatMessagesRepository {
    private chatMessages: chat_messages[] = [];

    async createChatMessage(
        chatId: string,
        message: string,
        role: string,
    ): Promise<chat_messages> {
        const newChatMessage: chat_messages = {
            id: v4(),
            chat_id: chatId,
            message,
            role,
            created_at: getTimestamp().toString(),
        };
        this.chatMessages.push(newChatMessage);
        return newChatMessage;
    }

    async getChatMessagesByChatId(chatId: string): Promise<chat_messages[]> {
        return this.chatMessages.filter((chatMessage) => chatMessage.chat_id === chatId);
    }
}

export class ChatMessagesRepository implements IChatMessagesRepository {
    private db: IDatabase;

    constructor() {
        this.db = getDatabase();
    }

    async createChatMessage(
        chatId: string,
        message: string,
        role: string,
    ): Promise<chat_messages> {
        const newChatMessage: chat_messages = {
            id: v4(),
            chat_id: chatId,
            message,
            role,
            created_at: getTimestamp().toString(),
        };
        await this.db.insert("chat_messages", newChatMessage);
        return newChatMessage;
    }

    async getChatMessagesByChatId(chatId: string): Promise<chat_messages[]> {
        return this.db.select("chat_messages", { chat_id: chatId });
    }
}
