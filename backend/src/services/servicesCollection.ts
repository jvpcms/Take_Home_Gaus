import { IN8nService, N8nService } from "./n8n/index.ts";

class ServicesCollection {
    n8n: IN8nService;

    constructor(n8n: IN8nService) {
        this.n8n = n8n;
    }
}

const n8nService: IN8nService = new N8nService();
export const servicesCollectionInstance = new ServicesCollection(
    n8nService,
);
