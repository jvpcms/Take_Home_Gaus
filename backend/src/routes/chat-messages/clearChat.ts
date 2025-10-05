import { Router } from 'express';
import { chatControllerInstance } from '../../controllers/chatController.ts';
import { httpResponseOk, httpResponseBadRequest, httpResponseInternalServerError, httpResponseUnauthorized } from '../../utils/httpResponse.ts';
import { successMessages, errorMessages } from '../../utils/messages.ts';
import { CustomError } from '../../utils/customErrors.ts';
import type { Request, Response } from 'express';

const router = Router();

router.delete('/', async (req: Request, res: Response) => {

    try {
        const chatMessages = await chatControllerInstance.clearChatMessages();
        return httpResponseOk(successMessages.chatMessagesCleared, chatMessages, res);
    } catch (err) {
        if (err instanceof CustomError) {
            return httpResponseBadRequest(err.message, null, res);
        }
        return httpResponseInternalServerError(errorMessages.internalServerError, null, res);
    }
});

export default router;