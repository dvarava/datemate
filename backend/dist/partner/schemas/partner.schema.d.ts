import { Document } from 'mongoose';
export type PartnerDocument = Partner & Document;
export declare class Partner {
    name: string;
    age: number;
    gender: 'Male' | 'Female';
    personalityType: 'Introvert' | 'Extrovert';
    interests: string[];
    dietaryPreferences?: string[] | null;
    userId: string;
}
export declare const PartnerSchema: import("mongoose").Schema<Partner, import("mongoose").Model<Partner, any, any, any, Document<unknown, any, Partner> & Partner & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Partner, Document<unknown, {}, import("mongoose").FlatRecord<Partner>> & import("mongoose").FlatRecord<Partner> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
