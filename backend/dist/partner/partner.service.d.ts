import { Model } from 'mongoose';
import { Partner, PartnerDocument } from './schemas/partner.schema';
export declare class PartnerService {
    private partnerModel;
    constructor(partnerModel: Model<PartnerDocument>);
    createPartner(partnerData: Partial<Partner>): Promise<Partner>;
    findPartnersByUser(userId: string): Promise<Partner[]>;
    deletePartner(partnerId: string): Promise<any>;
}
