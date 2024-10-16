export type Partner = {
    _id: string;
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    personalityType: 'Introvert' | 'Extrovert';
    interests: string[];
    dietaryPreferences?: string | null;
    avatarGradient?: string[];
  };
  
  export type PartnerInput = {
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    personalityType: 'Introvert' | 'Extrovert';
    interests: string[];
    dietaryPreferences?: string | null;
    avatarGradient?: string[];
  };