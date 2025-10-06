import { spData, nasdaqData, vixData } from "./data.ts";

export interface IBenchmarkService {
    getBenchmarkLastYearReport(): Promise<Record<string, any>>;
}

export class BenchmarkService implements IBenchmarkService {
    async getBenchmarkLastYearReport(): Promise<Record<string, any>> {

        return {
            sp: spData,
            nasdaq: nasdaqData,
        }
    }
}