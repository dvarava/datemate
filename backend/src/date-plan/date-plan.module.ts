import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { HttpModule } from "@nestjs/axios";
import { DatePlanController } from "./date-plan.controller";
import { DatePlanService } from "./date-plan.service";
import { DatePlan, DatePlanSchema } from "./schemas/date-plan.schema";
import { Activity, ActivitySchema } from "./schemas/activity.schema";
import { Partner, PartnerSchema } from "../partner/schemas/partner.schema";

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: DatePlan.name, schema: DatePlanSchema },
      { name: Activity.name, schema: ActivitySchema },
      { name: Partner.name, schema: PartnerSchema },
    ]),
  ],
  controllers: [DatePlanController],
  providers: [DatePlanService],
})
export class DatePlanModule {}
