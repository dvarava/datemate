import { Injectable, NotFoundException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { firstValueFrom } from "rxjs";
import { AxiosResponse } from "axios";
import { DatePlanInput } from "./types/datePlan";
import { DatePlan, DatePlanDocument } from "./schemas/date-plan.schema";
import { Activity, ActivityDocument } from "./schemas/activity.schema";
import { Partner } from "src/partner/schemas/partner.schema";

@Injectable()
export class DatePlanService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(DatePlan.name) private datePlanModel: Model<DatePlan>,
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
    @InjectModel(Partner.name) private partnerModel: Model<Partner>
  ) {}

  async createDatePlan(
    data: DatePlanInput
  ): Promise<{ datePlan: DatePlanDocument; activities: ActivityDocument[] }> {
    // Fetch partner details first
    const partner = await this.partnerModel.findById(data.partnerId);
    if (!partner) {
      throw new NotFoundException(
        `Partner not found with id ${data.partnerId}`
      );
    }

    const prompt = this.createPrompt({
      ...data,
      partner: {
        name: partner.name,
        age: partner.age,
        interests: partner.interests,
        personalityType: partner.personalityType,
        dietaryPreferences: partner.dietaryPreferences,
      },
    });
    console.log("OpenAI Prompt:", prompt);

    const response = (await firstValueFrom(
      this.httpService.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      )
    )) as AxiosResponse<any>;

    const generatedMessage = response.data.choices[0].message.content;
    console.log("OpenAI Response:", generatedMessage);

    // Save the date plan and activities
    const savedDatePlan = await this.saveDatePlanAndActivities(
      data,
      generatedMessage
    );
    const activities = await this.activityModel.find({
      datePlanId: savedDatePlan._id,
    });

    return { datePlan: savedDatePlan, activities };
  }

  private async saveDatePlanAndActivities(
    data: DatePlanInput,
    openAiResponse: string
  ) {
    const partner = await this.partnerModel.findById(data.partnerId);
    if (!partner) {
      throw new NotFoundException(
        `Partner not found with id ${data.partnerId}`
      );
    }

    const activities = this.parseActivities(openAiResponse);
    const totalCost = activities.reduce(
      (sum, activity) => sum + (activity.cost || 0),
      0
    );

    const datePlan = new this.datePlanModel({
      partnerId: new Types.ObjectId(data.partnerId),
      partnerName: partner.name,
      numberOfActivities: data.activityAmount,
      location: data.locationAddress,
      budget: data.budget,
      mood: data.moodSelection,
      adjustToWeather: data.adjustToWeather,
      dayTime: data.selectedTime,
      duration: data.duration,
      preferredPlace: data.preference,
      isFavourite: false,
      totalCost: totalCost,
      createdAt: new Date(),
      __v: 0,
    });

    const savedDatePlan = await datePlan.save();

    // Save activities
    for (const activity of activities) {
      const newActivity = new this.activityModel({
        ...activity,
        datePlanId: savedDatePlan._id,
      });
      await newActivity.save();
    }

    return savedDatePlan;
  }

  private parseActivities(openAiResponse: string) {
    const activities = [];
    const activityBlocks = openAiResponse.split("Activity");

    for (const block of activityBlocks) {
      if (!block.trim()) continue;

      const lines = block.split("\n");
      const activity = {
        name: lines
          .find((l) => l.includes("*"))
          ?.replace(/\*/g, "")
          .trim(),
        location: lines
          .find((l) => l.includes("Location:"))
          ?.split("Location:")[1]
          ?.trim(),
        address: lines
          .find((l) => l.includes("Address:"))
          ?.split("Address:")[1]
          ?.trim(),
        cost: parseInt(
          lines
            .find((l) => l.includes("Cost:"))
            ?.split("Cost:")[1]
            ?.replace(/[^\d]/g, "") || "0"
        ),
        description: lines
          .find((l) => l.includes("Brief date description:"))
          ?.split("Brief date description:")[1]
          ?.trim(),
      };

      if (activity.name) {
        activities.push(activity);
      }
    }

    return activities;
  }

  private truncateDescription(description: string, maxLength: number): string {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trimEnd() + "...";
  }

  createPrompt(data: any) {
    const {
      partner,
      activityAmount,
      budget,
      moodSelection,
      adjustToWeather,
      selectedTime,
      duration,
      preference,
      locationAddress,
      locationCoords,
    } = data;

    const partnerDetails = `Partner Details:
    - Name and Age: ${partner.name}, ${partner.age}
    - Interests: ${partner.interests.join(", ")}
    - Personality Type: ${partner.personalityType}
    - Dietary Preference: ${partner.dietaryPreferences.join(", ")}`;

    const dateParameters = `Date Parameters:
    - Number of Activities: ${activityAmount}
    - Budget: $${budget}
    - Mood: ${moodSelection.join(", ")}
    - Adjust to Weather: ${adjustToWeather ? "Yes" : "No"}
    - Preferred Time: ${selectedTime}
    - Duration: ${duration} minutes
    - Setting: ${preference}
    - Location: ${locationAddress}`;

    const briefDescription =
      "Keep the 'Brief date description' under 50 characters.";
    const limitedDescription = this.truncateDescription(briefDescription, 50);

    const initialPrompt = `I'm a boy and wanna take a girl on a date. You will need to generate a perfect date plan for me to satisfy my partner. You will be given details about my partner: her age, her interests, her personality type, her dietary preference. Also you will be given budget for the date, number of activities, location, mood, preferable time of day, setting (indoors/outdoors/mix). I need you to come up with a creative memorable date. Keep it straigh to the point, I dont need overall descriptions. Plan this date in this format:
    
    Activity 1:
    *short name of the date* (Example: Pizza & Sunset)
    Location: *name of the place*
    Address: *address*
    Cost: *calculated cost*
    
    Brief date description: ${limitedDescription}
    
    ${partnerDetails}
    
    ${dateParameters}`;

    return initialPrompt;
  }

  async getDatePlanById(id: string) {
    // Fetch the specific date plan by ID
    const datePlan = await this.datePlanModel.findById(id).exec();
    if (!datePlan) {
      throw new NotFoundException(`Date plan not found with id ${id}`);
    }

    // Fetch the associated partner
    const partner = await this.partnerModel.findById(datePlan.partnerId).exec();

    // Fetch activities for the specific date plan
    const activities = await this.activityModel
      .find({ datePlanId: datePlan._id })
      .exec();

    // Create a date history object for the specific date plan
    const dateHistory = {
      id: datePlan._id,
      dateDescription: activities[0]?.description || "No description available",
      date: datePlan.createdAt.toISOString().split("T")[0],
      isFavorite: datePlan.isFavourite,
    };

    return {
      datePlan,
      activities,
      dateHistory,
    };
  }

  async getDatePlansByPartnerId(partnerId: string) {
    // Get all date plans for the partner, sorted by creation date
    const datePlans = await this.datePlanModel
      .find({ partnerId })
      .sort({ createdAt: -1 })
      .exec();

    if (!datePlans || datePlans.length === 0) {
      throw new NotFoundException(
        `No date plans found for partner ${partnerId}`
      );
    }

    // Fetch the partner details
    const partner = await this.partnerModel.findById(partnerId);
    if (!partner) {
      throw new NotFoundException(`Partner not found with id ${partnerId}`);
    }

    // Get activities for all date plans
    const allActivities = await this.activityModel
      .find({
        datePlanId: { $in: datePlans.map((plan) => plan._id) },
      })
      .exec();

    // Create date histories for all plans
    const dateHistories = datePlans.map((plan) => {
      const planActivities = allActivities.filter(
        (activity) => activity.datePlanId.toString() === plan._id.toString()
      );

      return {
        id: plan._id,
        name: plan.partnerName,
        age: partner.age.toString(),
        dateDescription:
          planActivities[0]?.description || "No description available",
        date: plan.createdAt.toISOString().split("T")[0],
        isFavorite: plan.isFavourite,
        totalCost: plan.totalCost,
      };
    });

    return dateHistories;
  }

  async getAllDatePlans(userId: string) {
    try {
      console.log("Getting plans for userId:", userId);

      const userPartners = await this.partnerModel
        .find({ userId: new Types.ObjectId(userId) })
        .exec();
      console.log("Found partners:", userPartners);

      if (!userPartners || userPartners.length === 0) {
        console.log("No partners found for user");
        return [];
      }

      const partnerIds = userPartners.map((partner) => partner._id);
      console.log("Partner IDs:", partnerIds);

      const datePlans = await this.datePlanModel
        .find({ partnerId: { $in: partnerIds } })
        .sort({ createdAt: -1 })
        .exec();
      console.log("Found date plans:", datePlans);

      if (!datePlans || datePlans.length === 0) {
        console.log("No date plans found for partners");
        return [];
      }

      const allActivities = await this.activityModel
        .find({
          datePlanId: { $in: datePlans.map((plan) => plan._id) },
        })
        .exec();
      console.log("Found activities:", allActivities);

      const partnersMap = new Map(
        userPartners.map((partner) => [partner._id.toString(), partner])
      );

      const dateHistories = datePlans.map((plan) => {
        const planActivities = allActivities.filter(
          (activity) => activity.datePlanId?.toString() === plan._id?.toString()
        );
        const partner = partnersMap.get(plan.partnerId.toString());

        const history = {
          id: plan._id,
          name: plan.partnerName,
          age: partner?.age?.toString() || "N/A",
          dateDescription:
            planActivities[0]?.description || "No description available",
          date: plan.createdAt?.toISOString().split("T")[0] || "N/A",
          isFavorite: plan.isFavourite || false,
          partnerId: plan.partnerId,
        };
        console.log("Created history object:", history);
        return history;
      });

      console.log("Returning date histories:", dateHistories);
      return dateHistories;
    } catch (error) {
      console.error("Error in getAllDatePlans:", error);
      throw new Error(`Failed to get date plans: ${error.message}`);
    }
  }

  async toggleFavorite(id: string) {
    try {
      const datePlan = await this.datePlanModel.findById(id);
      if (!datePlan) {
        throw new NotFoundException(`Date plan not found with id ${id}`);
      }

      const updatedDatePlan = await this.datePlanModel.findByIdAndUpdate(
        id,
        { $set: { isFavourite: !datePlan.isFavourite } },
        { new: true, runValidators: false }
      );

      if (!updatedDatePlan) {
        throw new NotFoundException(`Failed to update date plan with id ${id}`);
      }

      return {
        id: updatedDatePlan._id,
        isFavorite: updatedDatePlan.isFavourite,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new Error(`Failed to toggle favorite: ${error.message}`);
    }
  }
}
