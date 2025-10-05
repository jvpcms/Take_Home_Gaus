import { Router as ExpressRouter } from 'express';

import { z } from 'zod';

import { httpResponseBadRequest, httpResponseOk, httpResponseInternalServerError, httpResponseUnauthorized } from '../../utils/httpResponse.ts';
import { successMessages, errorMessages } from '../../utils/messages.ts';

import { chatControllerInstance } from '../../controllers/chatController.ts';

import { CustomError } from '../../utils/customErrors.ts';

import type { Request as ExpressRequest, Response as ExpressResponse } from 'express';

const router = ExpressRouter();

router.post('/', async (req: ExpressRequest, res: ExpressResponse) => {

    const ExpectedSchema = z.object({
        message: z.string(),
    });

    type ExpectedBodyType = z.infer<typeof ExpectedSchema>;

    if (!ExpectedSchema.safeParse(req.body).success) {
        return httpResponseBadRequest(errorMessages.invalidRequestBody, null, res);
    }

    try {
        const body = req.body as ExpectedBodyType;
        const chatMessage = await chatControllerInstance.generateChatResponse(body.message);
        return httpResponseOk(successMessages.chatMessageGenerated, chatMessage, res);
    } catch (err) {

        if (err instanceof CustomError) {
            return httpResponseBadRequest(err.message, null, res);
        } else {
            return httpResponseInternalServerError(errorMessages.internalServerError, null, res);
        }

    }
});

export default router;