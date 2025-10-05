import { v4 } from "uuid";

import type { chat_messages } from "../database/types/chat_messages.ts";
import { IDatabase, getDatabase } from "../database/database.ts";
import { getTimestamp } from "../utils/timestamp.ts";

export interface IChatMessagesRepository {
    /**
     * Creates a new AI message with the given details.
     *
     * @param message The message details as a string.
     * @param role The role of the message.
     * @returns A promise that resolves to the created message.
     */
    createChatMessage(
        message: string,
        role: string,
    ): Promise<chat_messages>;

    /**
     * Retrieves all messages on the chat.
     *
     * @returns A promise that resolves to an array of messages.
     */
    getChatMessages(): Promise<chat_messages[]>;
}

export class ChatMessagesRepositoryMock implements IChatMessagesRepository {
    private chatMessages: chat_messages[] = [];

    async createChatMessage(
        message: string,
        role: string,
    ): Promise<chat_messages> {
        const newChatMessage: chat_messages = {
            id: v4(),
            message,
            role,
            created_at: getTimestamp().toString(),
        };
        this.chatMessages.push(newChatMessage);
        return newChatMessage;
    }

    async getChatMessages(): Promise<chat_messages[]> {
        return this.chatMessages;
    }
}

export class ChatMessagesRepository implements IChatMessagesRepository {
    private db: IDatabase;

    constructor() {
        this.db = getDatabase();
    }

    async createChatMessage(
        message: string,
        role: string,
    ): Promise<chat_messages> {
        const newChatMessage: chat_messages = {
            id: v4(),
            message,
            role,
            created_at: getTimestamp().toString(),
        };
        await this.db.insert("chat_messages", newChatMessage);
        return newChatMessage;
    }

    async getChatMessages(): Promise<chat_messages[]> {
        return this.db.select("chat_messages", {});
    }
}
