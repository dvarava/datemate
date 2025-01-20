import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerService } from './partner.service';
import { Partner, PartnerSchema } from './schemas/partner.schema';
import { PartnerController } from './partner.controller';
import { DatePlan, DatePlanSchema } from '../date-plan/schemas/date-plan.schema';
import { Activity, ActivitySchema } from '../date-plan/schemas/activity.schema';

@Module({
  imports: [MongooseModule.forFeature([
        { name: DatePlan.name, schema: DatePlanSchema },
        { name: Activity.name, schema: ActivitySchema },
        { name: Partner.name, schema: PartnerSchema },
      ]),],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {}