export const successMessages = {
    chatMessageGenerated: "Chat message generated",
    chatMessagesRetrieved: "Chat messages retrieved",
};

export const errorMessages = {
    unauthorized: "Unauthorized",
    invalidRequestBody: "Invalid request body",
    internalServerError: "Internal server error",
    invalidRequestQuery: "Invalid request query",
    postgreUserEnvVarNotDefined: "POSTGRES_USER is not defined in .env file",
    postgrePasswordEnvVarNotDefined:
        "POSTGRES_PASSWORD is not defined in .env file",
    postgrePortEnvVarNotDefined: "POSTGRES_PORT is not defined in .env file",
    postgreDatabaseEnvVarNotDefined: "POSTGRES_DB is not defined in .env file",
    postgreHostEnvVarNotDefined: "POSTGRES_HOST is not defined in .env file",
    nodeEnvEnvVarInvalid: "NODE_ENV enviroment variable is invalid",
    openAIServiceKeyNotDefined: "OPENAI_SERVICE_KEY is not defined in .env file",
    n8nServiceKeyNotDefined: "N8N_SERVICE_KEY is not defined in .env file",
};

export const serviceMessages = {
    n8nServiceFailed: "N8n service failed",
};
