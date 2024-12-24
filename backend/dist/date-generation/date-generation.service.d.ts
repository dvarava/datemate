import { HttpService } from "@nestjs/axios";
import { DatePlanInput } from "./types/datePlan";
export declare class DateGenerationService {
    private readonly httpService;
    constructor(httpService: HttpService);
    generateDatePlan(data: DatePlanInput): Promise<any>;
    createPrompt(data: any): string;
}
