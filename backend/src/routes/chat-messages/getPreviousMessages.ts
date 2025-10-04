import { Router } from 'express';
import { chatMessagesControllerInstance } from '../../controllers/chatMessageController.ts';
import { httpResponseOk, httpResponseBadRequest, httpResponseInternalServerError, httpResponseUnauthorized } from '../../utils/httpResponse.ts';
import { successMessages, errorMessages } from '../../utils/messages.ts';
import { CustomError } from '../../utils/customErrors.ts';
import type { Request, Response } from 'express';

const router = Router();

router.get('/:chatId', async (req: Request, res: Response) => {
    const { chatId } = req.params;

    if (!chatId) {
        return httpResponseBadRequest(errorMessages.invalidRequestQuery, null, res);
    }

    try {
        const chatMessages = await chatMessagesControllerInstance.getChatMessagesByChatId(chatId);
        return httpResponseOk(successMessages.chatMessagesRetrieved, chatMessages, res);
    } catch (err) {
        if (err instanceof CustomError) {
            return httpResponseBadRequest(err.message, null, res);
        }
        return httpResponseInternalServerError(errorMessages.internalServerError, null, res);
    }
});

export default router;