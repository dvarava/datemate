import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PartnerService } from './partner.service';
import { Partner, PartnerSchema } from './schemas/partner.schema';
import { PartnerController } from './partner.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Partner.name, schema: PartnerSchema }])],
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {}