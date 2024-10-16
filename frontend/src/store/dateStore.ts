import { create } from 'zustand';
import axios from 'axios';

interface DateState {
  datePlan: any;
  generateDatePlan: (data: any) => Promise<void>;
}

export const useDateStore = create<DateState>((set) => ({
  datePlan: null,
  generateDatePlan: async (data: any) => {
    try {
      const response = await axios.post('http://localhost:3000/generate-date', data);
      set({ datePlan: response.data });

      // Log the OpenAI response to the console
      console.log('Generated Date Plan:', response.data);
    } catch (error) {
      console.error(error);
    }
  },
}));