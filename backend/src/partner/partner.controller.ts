import { Controller, Post, Get, Body, Query, Delete, Param, Patch, BadRequestException, UseGuards, UnauthorizedException } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { Types } from 'mongoose';
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('partners')
@UseGuards(JwtAuthGuard)

export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Post()
  async createPartner(@Body() createPartnerDto: any) {
    return this.partnerService.createPartner(createPartnerDto);
  }

  @Get()
  async getPartners(@CurrentUser() user) {
    if (!user || !user.userId) {
      throw new UnauthorizedException("User not properly authenticated");
    }
    return this.partnerService.findPartnersByUser(user.userId);
  }

  @Delete(':partnerId')
  async deletePartner(@Param('partnerId') partnerId: string) {
    return this.partnerService.deletePartner(partnerId);
  }

  @Patch(':partnerId')
  async editPartner(
    @Param('partnerId') partnerId: string,
    @Body() partnerData: any,
  ) {
    if (!Types.ObjectId.isValid(partnerId)) {
      throw new BadRequestException('Invalid partner ID');
    }
    return this.partnerService.editPartner(partnerId, partnerData);
  }
}