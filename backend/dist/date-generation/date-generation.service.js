"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateGenerationService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let DateGenerationService = class DateGenerationService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async generateDatePlan(data) {
        const prompt = this.createPrompt(data);
        console.log("OpenAI Prompt:", prompt);
        const response = (await (0, rxjs_1.firstValueFrom)(this.httpService.post("https://api.openai.com/v1/chat/completions", {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a helpful assistant." },
                { role: "user", content: prompt },
            ],
        }, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer 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`,
            },
        })));
        const generatedMessage = response.data.choices[0].message.content;
        console.log("OpenAI Response:", generatedMessage);
        return response.data;
    }
    createPrompt(data) {
        const { partner, activityAmount, budget, moodSelection, adjustToWeather, selectedTime, duration, preference, locationAddress, locationCoords, } = data;
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
};
exports.DateGenerationService = DateGenerationService;
exports.DateGenerationService = DateGenerationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], DateGenerationService);
//# sourceMappingURL=date-generation.service.js.map