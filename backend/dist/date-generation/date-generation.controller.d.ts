import { DateGenerationService } from './date-generation.service';
export declare class DateGenerationController {
    private readonly dateGenerationService;
    constructor(dateGenerationService: DateGenerationService);
    generateDate(data: any): Promise<any>;
}
