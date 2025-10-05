import dotenv from "dotenv";
import { serverErros } from "../utils/customErrors.ts";

type NodeEnv = "local-dev" | "local-docker" | "production";

class EnvConfig {
    private envPath: string;
    private readonly nodeEnv: NodeEnv;

    constructor() {
        this.envPath = "../.env";

        const nodeEnv = process.env.NODE_ENV ? process.env.NODE_ENV : "production";
        if (
            nodeEnv !== "local-dev" &&
            nodeEnv !== "local-docker" &&
            nodeEnv !== "production"
        ) {
            throw new serverErros.NodeEnvEnvVarInvalid();
        }
        this.nodeEnv = nodeEnv as NodeEnv;
    }

    /**
     * Returns the current enviorement
     *
     * @returns The current enviorement
     */
    public getNodeEnv(): NodeEnv {
        return this.nodeEnv;
    }

    /**
     * Loads enviorement variables from .env file if not in development enviorement
     */
    private loadEnv(): void {
        if (this.nodeEnv === "local-dev") {
            dotenv.config({
                path: this.envPath,
            });
        }
    }

    /**
     * Reloads enviorement variables and return LOGGIN_LEVEL var
     *
     * @returns LOGGIN_LEVEL var
     */
    public loggingLevel(): number {
        this.loadEnv();
        return parseInt(process.env.LOGGING_LEVEL || "4");
    }

    /**
     * Reloads enviorement variables and return HTTP_PORT var
     *
     * @returns HTTP_PORT var
     */
    public httpPort(): number {
        this.loadEnv();
        return parseInt(process.env.HTTP_PORT || "8080");
    }

    /**
     * Reloads enviorement variables and return POSTGRES_USER var
     *
     * @returns POSTGRES_USER var
     */
    public dbUser(): string {
        this.loadEnv();

        if (!process.env.POSTGRES_USER) {
            throw new serverErros.DbUserEnvVarNotDefined();
        }
        return process.env.POSTGRES_USER;
    }

    /**
     * Reloads enviorement variables and return POSTGRES_PORT var
     *
     * @returns POSTGRES_PORT var
     */
    public dbPort(): number {
        this.loadEnv();
        return parseInt(process.env.POSTGRES_PORT || "5432");
    }

    /**
     * Reloads enviorement variables and return POSTGRES_DB var
     *
     * @returns POSTGRES_DB var
     */
    public dbName(): string {
        this.loadEnv();

        if (!process.env.POSTGRES_DB) {
            throw new serverErros.DbNameEnvVarNotDefined();
        }

        return process.env.POSTGRES_DB;
    }

    /**
     * Reloads enviorement variables and return POSTGRES_PASSWORD var
     *
     * @returns POSTGRES_PASSWORD var
     */
    public dbPassword(): string {
        this.loadEnv();

        if (!process.env.POSTGRES_PASSWORD) {
            throw new serverErros.DbPasswordEnvVarNotDefined();
        }

        return process.env.POSTGRES_PASSWORD;
    }

    /**
     * Reloads enviorement variables and return POSTGRES_PASSWORD var
     *
     * @returns POSTGRES_HOST var
     */
    public dbHost(): string {
        this.loadEnv();

        if (!process.env.POSTGRES_HOST) {
            throw new serverErros.DbHostEnvVarNotDefined();
        }

        return process.env.POSTGRES_HOST;
    }

    /**
     * Reloads enviorement variables and return OPENAI_SERVICE_KEY var
     * @returns openai service key
     */
    public openAIServiceKey(): string {
        this.loadEnv();

        if (!process.env.OPENAI_SERVICE_KEY) {
            throw new serverErros.OpenAIServiceKeyNotDefined();
        }

        return process.env.OPENAI_SERVICE_KEY;
    }

    /**
     * Reloads enviorement variables and return N8N_SERVICE_URL var
     * @returns n8n service url
     */
    public n8nServiceUrl(): string {
        this.loadEnv();
        if (!process.env.N8N_SERVICE_URL) {
            throw new serverErros.N8nServiceUrlEnvVarNotDefined();
        }
        return process.env.N8N_SERVICE_URL;
    }
}

export default new EnvConfig();
