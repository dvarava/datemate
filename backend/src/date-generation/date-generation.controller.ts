import { Controller, Post, Body } from '@nestjs/common';
import { DateGenerationService } from './date-generation.service';
import { DatePlanInput } from '../date-generation/types/datePlan';

@Controller('generate-date')
export class DateGenerationController {
  constructor(private readonly dateGenerationService: DateGenerationService) {}

  @Post()
  async generateDate(@Body() data: DatePlanInput) {
    return await this.dateGenerationService.generateDatePlan(data);
  }
}