import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { firstValueFrom } from "rxjs";
import { AxiosResponse } from "axios";
import { DatePlanInput } from "./types/datePlan";
import * as dotenv from 'dotenv';

@Injectable()
export class DateGenerationService {
  constructor(private readonly httpService: HttpService) {}

  async generateDatePlan(data: DatePlanInput) {
    const prompt = this.createPrompt(data);

    // Log the prompt to the console
    console.log("OpenAI Prompt:", prompt);

    const response = (await firstValueFrom(
      this.httpService.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
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

    // Extract the generated message from the OpenAI response
    const generatedMessage = response.data.choices[0].message.content;

    // Log the full generated response
    console.log("OpenAI Response:", generatedMessage);

    return response.data;
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
  
    const initialPrompt = `I’m a boy and wanna take a girl on a date. You will need to generate a perfect date plan for me to satisfy my partner. You will be given details about my partner: her age, her interests, her personality type, her dietary preference. Also you will be given budget for the date, number of activities, location, mood, preferable time of day, setting (indoors/outdoors/mix). I need you to come up with a creative memorable date. Plan this date in this format:
  
  Activity 1:
  *short name of the date* (Example: Pizza & Sunset)
  Location: *name of the place*
  Address: *address*
  Cost: *calculated cost*
  
  Brief date description: *explaining the date, why it will satisfy the partner*
  
  ${partnerDetails}
  
  ${dateParameters}`;
  
    return initialPrompt;
  }
  
}
