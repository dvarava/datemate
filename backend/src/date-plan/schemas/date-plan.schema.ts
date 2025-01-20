import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DatePlanDocument = DatePlan & Document;

@Schema()
export class DatePlan {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Partner' })
  partnerId: Types.ObjectId;

  @Prop({ required: true })
  partnerName: string;

  @Prop({ required: true })
  numberOfActivities: number;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  budget: number;

  @Prop({ type: [String], required: true })
  mood: string[];

  @Prop({ required: true })
  adjustToWeather: boolean;

  @Prop({ required: true })
  dayTime: string;

  @Prop({ required: true })
  duration: number;

  @Prop({ required: true })
  preferredPlace: string;

  @Prop({ default: false })
  isFavourite: boolean;

  @Prop({ required: true, default: 0 })
  totalCost: number;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const DatePlanSchema = SchemaFactory.createForClass(DatePlan);
