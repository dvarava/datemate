import { Injectable, NotFoundException } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { firstValueFrom } from "rxjs";
import { AxiosResponse } from "axios";
import { DatePlanInput } from "./types/datePlan";
import { DatePlan, DatePlanDocument } from './schemas/date-plan.schema';
import { Activity, ActivityDocument } from './schemas/activity.schema';
import { Partner } from "src/partner/schemas/partner.schema";
import * as dotenv from 'dotenv';

@Injectable()
export class DateGenerationService {
  constructor(
    private readonly httpService: HttpService,
    @InjectModel(DatePlan.name) private datePlanModel: Model<DatePlan>,
    @InjectModel(Activity.name) private activityModel: Model<Activity>,
    @InjectModel(Partner.name) private partnerModel: Model<Partner>,
  ) {}

  async generateDatePlan(data: DatePlanInput): Promise<{ datePlan: DatePlanDocument; activities: ActivityDocument[] }> {
    // Fetch partner details first
    const partner = await this.partnerModel.findById(data.partnerId);
    if (!partner) {
      throw new NotFoundException(`Partner not found with id ${data.partnerId}`);
    }

    const prompt = this.createPrompt({
      ...data,
      partner: {
        name: partner.name,
        age: partner.age,
        interests: partner.interests,
        personalityType: partner.personalityType,
        dietaryPreferences: partner.dietaryPreferences,
      }
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
    const savedDatePlan = await this.saveDatePlanAndActivities(data, generatedMessage);
    const activities = await this.activityModel.find({ datePlanId: savedDatePlan._id });

    return { datePlan: savedDatePlan, activities };
  }

  private async saveDatePlanAndActivities(data: DatePlanInput, openAiResponse: string) {
    const partner = await this.partnerModel.findById(data.partnerId);
    if (!partner) {
      throw new NotFoundException(`Partner not found with id ${data.partnerId}`);
    }

    const datePlan = new this.datePlanModel({
      partnerId: data.partnerId,
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
      createdAt: new Date(),
      __v: 0
    });

    const savedDatePlan = await datePlan.save();

    // Parse and save activities
    const activities = this.parseActivities(openAiResponse);
    for (const activity of activities) {
      const newActivity = new this.activityModel({
        ...activity,
        datePlanId: savedDatePlan._id
      });
      await newActivity.save();
    }

    return savedDatePlan;
  }

  private parseActivities(openAiResponse: string) {
    const activities = [];
    const activityBlocks = openAiResponse.split('Activity');

    for (const block of activityBlocks) {
      if (!block.trim()) continue;

      const lines = block.split('\n');
      const activity = {
        name: lines.find(l => l.includes('*'))?.replace(/\*/g, '').trim(),
        location: lines.find(l => l.includes('Location:'))?.split('Location:')[1]?.trim(),
        address: lines.find(l => l.includes('Address:'))?.split('Address:')[1]?.trim(),
        cost: parseInt(lines.find(l => l.includes('Cost:'))?.split('Cost:')[1]?.replace('$', '').trim() || '0'),
        description: lines.find(l => l.includes('Brief date description:'))?.split('Brief date description:')[1]?.trim(),
      };

      if (activity.name) {
        activities.push(activity);
      }
    }

    return activities;
  }

  private truncateDescription(description: string, maxLength: number): string {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength).trimEnd() + '...';
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
  
    const briefDescription = "Keep the 'Brief date description' under 50 characters.";
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

  async getDatePlanByPartner(partnerId: string) {
    const datePlan = await this.datePlanModel
      .findOne({ partnerId })
      .sort({ createdAt: -1 })
      .exec();
  
    if (!datePlan) {
      throw new NotFoundException(`Date plan not found for partner ${partnerId}`);
    }
  
    const partner = await this.partnerModel.findById(partnerId);
    if (!partner) {
      throw new NotFoundException(`Partner not found with id ${partnerId}`);
    }
  
    const activities = await this.activityModel
      .find({ datePlanId: datePlan._id })
      .exec();
  
    const dateHistory = activities.length > 0 ? {
      id: datePlan._id,
      name: datePlan.partnerName,
      age: partner.age.toString(), // Add age here
      dateDescription: activities[0].description,
      date: datePlan.createdAt.toISOString().split('T')[0],
      isFavorite: datePlan.isFavourite,
      avatarGradient: ["#ff0262", "#ffffff"]
    } : null;
  
    return { datePlan, activities, dateHistory };
  }
}