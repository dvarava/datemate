import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { DateGenerationService } from './date-generation.service';
import { DatePlanInput } from './types/datePlan';

@Controller('generate-date')
export class DateGenerationController {
  constructor(private readonly dateGenerationService: DateGenerationService) {}

  @Post()
  async generateDate(@Body() data: DatePlanInput) {
    return await this.dateGenerationService.generateDatePlan(data);
  }

  @Get(':partnerId')
  async getDatePlanByPartner(@Param('partnerId') partnerId: string) {
    return await this.dateGenerationService.getDatePlanByPartner(partnerId);
  }
}