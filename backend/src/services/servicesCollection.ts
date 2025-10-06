import { IN8nService, N8nService } from "./n8n/index.ts";
import { IBenchmarkService, BenchmarkService } from "./benchmarks/index.ts";

export class ServicesCollection {
    n8n: IN8nService;
    benchmarks: IBenchmarkService;

    constructor(n8n: IN8nService, benchmarks: IBenchmarkService) {
        this.n8n = n8n;
        this.benchmarks = benchmarks;
    }
}

const n8nService: IN8nService = new N8nService();
const benchmarks: IBenchmarkService = new BenchmarkService();
export const servicesCollectionInstance = new ServicesCollection(
    n8nService,
    benchmarks,
);
