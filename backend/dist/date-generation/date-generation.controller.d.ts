import { DateGenerationService } from './date-generation.service';
import { DatePlanInput } from '../date-generation/types/datePlan';
export declare class DateGenerationController {
    private readonly dateGenerationService;
    constructor(dateGenerationService: DateGenerationService);
    generateDate(data: DatePlanInput): Promise<any>;
}
