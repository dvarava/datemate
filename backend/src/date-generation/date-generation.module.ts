import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { DateGenerationController } from './date-generation.controller';
import { DateGenerationService } from './date-generation.service';
import { DatePlan, DatePlanSchema } from './schemas/date-plan.schema';
import { Activity, ActivitySchema } from './schemas/activity.schema';
import { Partner, PartnerSchema } from '../partner/schemas/partner.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: DatePlan.name, schema: DatePlanSchema },
      { name: Activity.name, schema: ActivitySchema },
      { name: Partner.name, schema: PartnerSchema }
    ])
  ],
  controllers: [DateGenerationController],
  providers: [DateGenerationService],
})
export class DateGenerationModule {}