import {
    IChatMessagesRepository,
    ChatMessagesRepository,
    ChatMessagesRepositoryMock,
} from "./chatMessages.ts";

class RepositoriesCollection {
    chatMessages: IChatMessagesRepository;

    constructor(
        chatMessages: IChatMessagesRepository,
    ) {
        this.chatMessages = chatMessages;
    }
}

const chatMessagesRepository: IChatMessagesRepository = new ChatMessagesRepository();
export const repositoriesCollectionInstance = new RepositoriesCollection(
    chatMessagesRepository,
);
