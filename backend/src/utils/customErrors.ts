import { errorMessages } from "./messages.ts";

export class CustomError extends Error {
    message: string;

    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

class InvalidRequestBody extends CustomError {
    constructor() {
        super(errorMessages.invalidRequestBody);
    }
}

class InternalServerError extends CustomError {
    constructor() {
        super(errorMessages.internalServerError);
    }
}

class NodeEnvEnvVarInvalid extends CustomError {
    constructor() {
        super(errorMessages.nodeEnvEnvVarInvalid);
    }
}

class OpenAIServiceKeyNotDefined extends CustomError {
    constructor() {
        super(errorMessages.openAIServiceKeyNotDefined);
    }
}

class N8nServiceKeyNotDefined extends CustomError {
    constructor() {
        super(errorMessages.n8nServiceKeyNotDefined);
    }
}

class DbUserEnvVarNotDefined extends CustomError {
    constructor() {
        super(errorMessages.postgreUserEnvVarNotDefined);
    }
}

class DbNameEnvVarNotDefined extends CustomError {
    constructor() {
        super(errorMessages.postgreDatabaseEnvVarNotDefined);
    }
}

class DbHostEnvVarNotDefined extends CustomError {
    constructor() {
        super(errorMessages.postgreHostEnvVarNotDefined);
    }
}

class DbPasswordEnvVarNotDefined extends CustomError {
    constructor() {
        super(errorMessages.postgrePasswordEnvVarNotDefined);
    }
}

export const httpErros = {
    InvalidRequestBody,
};

export const serverErros = {
    InternalServerError,
    NodeEnvEnvVarInvalid,
    DbUserEnvVarNotDefined,
    DbHostEnvVarNotDefined,
    DbNameEnvVarNotDefined,
    DbPasswordEnvVarNotDefined,
    OpenAIServiceKeyNotDefined,
    N8nServiceKeyNotDefined,
};
