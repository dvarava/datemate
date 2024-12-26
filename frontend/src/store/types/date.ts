export interface Activity {
    name: string;
    location: string;
    address: string;
    cost: number;
    description: string;
  }
  
export interface DatePlan {
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
  }

export interface DateHistory {
  id: string;
  name: string;
  age: string;
  dateDescription: string;
  date: string;
  isFavorite: boolean;
  avatarGradient: string[];
}