import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  @Prop({ type: Types.ObjectId, ref: 'DatePlan', required: true })
  datePlanId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  cost: number;

  @Prop({ required: true })
  description: string;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);