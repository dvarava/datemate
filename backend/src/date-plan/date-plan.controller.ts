import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  UseGuards,
  UnauthorizedException,
} from "@nestjs/common";
import { DatePlanService } from "./date-plan.service";
import { DatePlanInput } from "./types/datePlan";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Controller("date-plans")
@UseGuards(JwtAuthGuard)
export class DatePlanController {
  constructor(private readonly datePlanService: DatePlanService) {}

  @Post()
  async createDatePlan(@Body() data: DatePlanInput) {
    return await this.datePlanService.createDatePlan(data);
  }

  @Get()
  async getAllDatePlans(@CurrentUser() user) {
    console.log("DatePlanController - Received User:", user);
    if (!user || !user.userId) {
      throw new UnauthorizedException("User not properly authenticated");
    }
    return await this.datePlanService.getAllDatePlans(user.userId);
  }

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
