import { Controller, Post, Get, Body, Query, Delete, Patch, Param } from '@nestjs/common';
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

  @Patch(':partnerId')
  async editPartner(
    @Param('partnerId') partnerId: string,
    @Body() updatePartnerDto: any
  ) {
    return this.partnerService.updatePartner(partnerId, updatePartnerDto);
  }

  @Delete(':partnerId')
  async deletePartner(@Param('partnerId') partnerId: string) {
    return this.partnerService.deletePartner(partnerId);
  }
}