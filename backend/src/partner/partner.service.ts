import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Partner, PartnerDocument } from "./schemas/partner.schema";

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>
  ) {}

  async createPartner(partnerData: Partial<Partner>): Promise<Partner> {
    const newPartner = new this.partnerModel(partnerData);
    const result = await newPartner.save();
    return result;
  }

  async findPartnersByUser(userId: string): Promise<Partner[]> {
    const partners = await this.partnerModel.find({ userId }).exec();
    return partners;
  }

  async deletePartner(partnerId: string): Promise<any> {
    try {
      const result = await this.partnerModel
        .findByIdAndDelete(partnerId)
        .exec();

      if (!result) {
        throw new Error("Partner not found or already deleted");
      }
      return result;
    } catch (error) {
      console.error("Error deleting partner:", error);
      throw new Error("Failed to delete partner");
    }
  }
  async editPartner(partnerId: string, partnerData: any): Promise<Partner> {
    const updatedPartner = await this.partnerModel
      .findByIdAndUpdate(partnerId, { $set: partnerData }, { new: true })
      .exec();

    if (!updatedPartner) {
      throw new NotFoundException("Partner not found");
    }

    return updatedPartner;
  }
}
