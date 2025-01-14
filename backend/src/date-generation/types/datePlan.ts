export interface DatePlanInput {
  partnerId: string;
  activityAmount: number;
  budget: number;
  moodSelection: string[];
  adjustToWeather: boolean;
  selectedTime: string;
  duration: number;
  preference: string;
  locationAddress: string;
}

export interface DatePlanResponse {
  datePlan: {
    _id: string;
    partner: string;
    numberOfActivities: number;
    location: string;
    budget: number;
    mood: string[];
    adjustToWeather: boolean;
    dayTime: string;
    duration: number;
    preferredPlace: string;
    isFavourite: boolean;
    createdAt: Date;
    shortDescription: string;

  };
  activities: {
    _id: string;
    datePlanId: string;
    name: string;
    location: string;
    address: string;
    cost: number;
    description: string;
  }[];
}