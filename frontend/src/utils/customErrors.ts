import { errorMessages } from "./messages";

export class CustomError extends Error {
    message: string;

    constructor(message: string) {
        super(message);
        this.message = message;
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}

class NodeEnvEnvVarInvalid extends CustomError {
    constructor() {
        super(errorMessages.nodeEnvEnvVarInvalid);
    }
}

class BackendUrlEnvVarNotDefined extends CustomError {
    constructor() {
        super(errorMessages.backendUrlEnvVarNotDefined);
    }
}

export const serverErros = {
    NodeEnvEnvVarInvalid,
    BackendUrlEnvVarNotDefined,
};