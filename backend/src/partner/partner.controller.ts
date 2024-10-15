import { Controller, Post, Get, Body, Query, Delete } from '@nestjs/common';
import { PartnerService } from './partner.service';

@Controller('partners')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async createPartner(@Body() createPartnerDto: any) {
    return this.partnerService.createPartner(createPartnerDto);
  }

  @Get()
  async getPartners(@Query('userId') userId: string) {
    return this.partnerService.findPartnersByUser(userId);
  }

  @Delete()
  async deletePartner(@Query('partnerId') partnerId: string) {
    return this.partnerService.deletePartner(partnerId);
  }
}