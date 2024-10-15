import { PartnerService } from './partner.service';
export declare class PartnerController {
    private readonly partnerService;
    constructor(partnerService: PartnerService);
    createPartner(createPartnerDto: any): Promise<import("./schemas/partner.schema").Partner>;
    getPartners(userId: string): Promise<import("./schemas/partner.schema").Partner[]>;
    deletePartner(partnerId: string): Promise<any>;
}
