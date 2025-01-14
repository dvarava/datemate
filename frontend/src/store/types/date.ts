export interface Activity {
    _id: string;
    datePlanID: string;
    name: string;
    location: string;
    address: string;
    cost: number;
    description: string;
  }
  
export interface DatePlan {
    _id: string;
    partnerId: string;
    partnerName: string;
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
    totalCost: number;
  }

export interface DateHistory {
  id: string;
  name: string;
  age: string;
  dateDescription: string;
  date: string;
  isFavorite: boolean;
  avatarGradient: string[];
  shortDescription: string;
}