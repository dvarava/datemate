import { HttpService } from "@nestjs/axios";
export declare class DateGenerationService {
    private readonly httpService;
    constructor(httpService: HttpService);
    generateDatePlan(data: any): Promise<any>;
    createPrompt(data: any): string;
}
