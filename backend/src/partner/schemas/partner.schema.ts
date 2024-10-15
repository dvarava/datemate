import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PartnerDocument = Partner & Document;

@Schema()
export class Partner {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  gender: 'Male' | 'Female';

  @Prop({ required: true })
  personalityType: 'Introvert' | 'Extrovert';

  @Prop({ required: true })
  interests: string[];

  @Prop({ required: false })
  dietaryPreferences?: string[] | null;

  @Prop({ required: true })
  userId: string;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);