import { Router as ExpressRouter } from "express";
import generateChatResponseRouter from "./chat-messages/generateChatResponse.ts";
import getPreviousMessagesRouter from "./chat-messages/getPreviousMessages.ts";
import type { Application as ExpressApplication } from "express";

function setupTravelPlanRoutes(app: ExpressApplication) {
    const chatMessagesRouter = ExpressRouter();
    chatMessagesRouter.use(generateChatResponseRouter);
    chatMessagesRouter.use(getPreviousMessagesRouter);
    app.use("/chat-messages", chatMessagesRouter);
}

export function setupRoutes(app: ExpressApplication) {
    setupTravelPlanRoutes(app);
}
