import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { DatePlanService } from "./date-plan.service";
import { DatePlanInput } from "./types/datePlan";

@Controller("date-plans")
export class DatePlanController {
  constructor(private readonly datePlanService: DatePlanService) {}

  @Post()
  async createDatePlan(@Body() data: DatePlanInput) {
    return await this.datePlanService.createDatePlan(data);
  }

  // @Get()
  // @UseGuards(AuthGuard) // Assuming you have an auth guard
  // async getAllDatePlans(@Request() req) {
  //   try {
  //     const userId = req.user.id; // Get userId from the authenticated request
  //     const datePlans = await this.datePlanService.getAllDatePlans(userId);
  //     return { datePlans };
  //   } catch (error) {
  //     if (error instanceof NotFoundException) {
  //       throw new NotFoundException(error.message);
  //     }
  //     throw error;
  //   }
  // }

  @Post(":id/toggle-favorite")
  async toggleFavorite(@Param("id") id: string) {
    try {
      const result = await this.datePlanService.toggleFavorite(id);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get(":id")
  async getDatePlanById(@Param("id") id: string) {
    try {
      const result = await this.datePlanService.getDatePlanById(id);
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }

  @Get("partners/:partnerId")
  async getDatePlansByPartnerId(@Param("partnerId") partnerId: string) {
    try {
      const datePlans =
        await this.datePlanService.getDatePlansByPartnerId(partnerId);
      return { datePlans };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}
