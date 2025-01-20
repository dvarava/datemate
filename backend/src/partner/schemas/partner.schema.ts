import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type PartnerDocument = Partner & Document;

@Schema()
export class Partner {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  gender: "Male" | "Female";

  @Prop({ required: true })
  personalityType: "Introvert" | "Extrovert";

  @Prop({ required: true })
  interests: string[];

  @Prop({ type: [String], default: null })
  dietaryPreferences?: string[] | null;

  @Prop({ type: [String], required: true })
  avatarGradient: string[];

  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;
}

export const PartnerSchema = SchemaFactory.createForClass(Partner);