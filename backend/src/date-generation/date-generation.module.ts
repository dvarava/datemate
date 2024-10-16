import { Module } from '@nestjs/common';
import { DateGenerationService } from './date-generation.service';
import { DateGenerationController } from './date-generation.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DateGenerationController],
  providers: [DateGenerationService],
})
export class DateGenerationModule {}