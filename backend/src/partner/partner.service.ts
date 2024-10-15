import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Partner, PartnerDocument } from './schemas/partner.schema';

@Injectable()
export class PartnerService {
  constructor(@InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>) {}

  async createPartner(partnerData: Partial<Partner>): Promise<Partner> {
    const newPartner = new this.partnerModel(partnerData);
    return newPartner.save();
  }

  async findPartnersByUser(userId: string): Promise<Partner[]> {
    return this.partnerModel.find({ userId }).exec();
  }

  async deletePartner(partnerId: string): Promise<any> {
    return this.partnerModel.findByIdAndDelete(partnerId).exec();
  }
}