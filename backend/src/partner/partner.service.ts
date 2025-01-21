import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { Partner, PartnerDocument } from "./schemas/partner.schema";
import {
  DatePlan,
  DatePlanDocument,
} from "../date-plan/schemas/date-plan.schema";
import {
  Activity,
  ActivityDocument,
} from "../date-plan/schemas/activity.schema";
import { toObjectId } from "../util/object-id.util";

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>,
    @InjectModel(DatePlan.name) private datePlanModel: Model<DatePlanDocument>,
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>
  ) {}

  async createPartner(partnerData: Partial<Partner>): Promise<Partner> {
    if (partnerData.userId && typeof partnerData.userId === "string") {
      partnerData.userId = toObjectId(partnerData.userId);
    }

    const newPartner = new this.partnerModel(partnerData);
    const result = await newPartner.save();
    return result;
  }

  async findPartnersByUser(userId: string): Promise<Partner[]> {
    const userObjectId = toObjectId(userId);
    const partners = await this.partnerModel
      .find({ userId: userObjectId })
      .exec();
    return partners;
  }

  async deletePartner(partnerId: string): Promise<Partner> {
    const partnerObjectId = toObjectId(partnerId);

    const session = await this.partnerModel.startSession();
    session.startTransaction();

    try {
      // Verify partner exists
      const partner = await this.partnerModel.findById(partnerObjectId);
      if (!partner) {
        throw new NotFoundException("Partner not found");
      }

      // Find date plans associated with the partner
      const datePlans = await this.datePlanModel.find({
        partnerId: partnerObjectId,
      });
      const datePlanIds = datePlans.map((plan) => plan._id);

      if (datePlanIds.length > 0) {
        // Delete activities associated with the date plans
        await this.activityModel
          .deleteMany({ datePlanId: { $in: datePlanIds } })
          .exec();

        // Delete date plans
        await this.datePlanModel
          .deleteMany({ partnerId: partnerObjectId })
          .exec();
      }

      // Delete partner
      const deletedPartner =
        await this.partnerModel.findByIdAndDelete(partnerObjectId);
      await session.commitTransaction();
      return deletedPartner;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }

  async editPartner(partnerId: string, partnerData: any): Promise<Partner> {
    const partnerObjectId = toObjectId(partnerId);

    const updatedPartner = await this.partnerModel
      .findByIdAndUpdate(partnerObjectId, { $set: partnerData }, { new: true })
      .exec();

    if (!updatedPartner) {
      throw new NotFoundException("Partner not found");
    }

    return updatedPartner;
  }
}