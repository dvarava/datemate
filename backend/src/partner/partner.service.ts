import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Partner, PartnerDocument } from "./schemas/partner.schema";
import { DatePlan, DatePlanDocument } from "../date-plan/schemas/date-plan.schema";
import { Activity, ActivityDocument } from "../date-plan/schemas/activity.schema";

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>,
    @InjectModel(DatePlan.name) private datePlanModel: Model<DatePlanDocument>,
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>
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

  async deletePartner(partnerId: string): Promise<Partner> {
    if (!Types.ObjectId.isValid(partnerId)) {
      throw new BadRequestException('Invalid partner ID format');
    }

    console.log('Starting deletion process for partner:', partnerId);

    const session = await this.partnerModel.startSession();
    session.startTransaction();

    try {
      const partnerObjectId = new Types.ObjectId(partnerId);

      // First find the partner to verify it exists
      const partner = await this.partnerModel.findById(partnerObjectId);
      if (!partner) {
        throw new NotFoundException('Partner not found');
      }
      console.log('Found partner:', partner);

      // Find date plans before deletion to verify they exist
      const datePlans = await this.datePlanModel.find({ partnerId: partnerObjectId });
      console.log('Found date plans:', datePlans.length);
      
      const datePlanIds = datePlans.map(plan => plan._id);
      console.log('Date plan IDs:', datePlanIds);

      if (datePlanIds.length > 0) {
        // Find activities before deletion to verify they exist
        const activities = await this.activityModel.find({ datePlanId: { $in: datePlanIds } });
        console.log('Found activities:', activities.length);

        // Delete activities
        const deletedActivities = await this.activityModel.deleteMany(
          { datePlanId: { $in: datePlanIds } }
        ).exec();
        console.log('Deleted activities result:', deletedActivities);

        // Delete date plans
        const deletedDatePlans = await this.datePlanModel.deleteMany(
          { partnerId: partnerObjectId }
        ).exec();
        console.log('Deleted date plans result:', deletedDatePlans);
      }

      // Delete partner
      const deletedPartner = await this.partnerModel.findByIdAndDelete(partnerObjectId);
      console.log('Deleted partner result:', deletedPartner);

      await session.commitTransaction();
      return deletedPartner;

    } catch (error) {
      console.error('Error during deletion:', error);
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
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