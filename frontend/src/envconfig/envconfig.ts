import { serverErros } from "../utils/customErrors";

class EnvConfig {
    private readonly nodeEnv: boolean;

    constructor() {
        this.nodeEnv = import.meta.env.PROD;
    }

    /**
     * Returns whether the current enviorement is production or not
     *
     * @returns true if the enviorement is production, false otherwise
     */
    public isProd(): boolean {
        return this.nodeEnv;
    }

    /**
     * Reloads enviorement variables and return BACKEND_URL var
     *
     * @returns BACKEND_URL var
     */
    public backendUrl(): string {
        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        if (!backendUrl) {
            throw new serverErros.BackendUrlEnvVarNotDefined();
        }

        return backendUrl;
    }
}

export default new EnvConfig();