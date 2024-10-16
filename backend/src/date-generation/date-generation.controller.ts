import { Controller, Post, Body } from '@nestjs/common';
import { DateGenerationService } from './date-generation.service';

@Controller('generate-date')
export class DateGenerationController {
  constructor(private readonly dateGenerationService: DateGenerationService) {}

  @Post()
  async generateDate(@Body() data: any) {
    return await this.dateGenerationService.generateDatePlan(data);
  }
}