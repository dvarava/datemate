export interface DatePlanInput {
    activityAmount: number;
    budget: number;
    moodSelection: string[];
    adjustToWeather: boolean | null;
    selectedTime: string | null;
    duration: number;
    preference: string;
    selectedLocation: string;
    locationCoords: { latitude: number; longitude: number } | null;
    locationAddress: string | null;
    partner: {
      name: string;
      age: number;
      interests: string[];
      personalityType: string;
      dietaryPreferences: string[] | null;
    };
  }