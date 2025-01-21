import { Types } from "mongoose";
import { BadRequestException } from "@nestjs/common";

export function toObjectId(id: string): Types.ObjectId {
  if (!Types.ObjectId.isValid(id)) {
    throw new BadRequestException(`Invalid ID format: ${id}`);
  }
  return new Types.ObjectId(id);
}