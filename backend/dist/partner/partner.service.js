"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const partner_schema_1 = require("./schemas/partner.schema");
let PartnerService = class PartnerService {
    constructor(partnerModel) {
        this.partnerModel = partnerModel;
    }
    async createPartner(partnerData) {
        const newPartner = new this.partnerModel(partnerData);
        const result = await newPartner.save();
        return result;
    }
    async findPartnersByUser(userId) {
        const partners = await this.partnerModel.find({ userId }).exec();
        return partners;
    }
    async deletePartner(partnerId) {
        try {
            const result = await this.partnerModel.findByIdAndDelete(partnerId).exec();
            if (!result) {
                throw new Error('Partner not found or already deleted');
            }
            return result;
        }
        catch (error) {
            console.error('Error deleting partner:', error);
            throw new Error('Failed to delete partner');
        }
    }
    async editPartner(partnerId, partnerData) {
        const updatedPartner = await this.partnerModel.findByIdAndUpdate(partnerId, { $set: partnerData }, { new: true }).exec();
        if (!updatedPartner) {
            throw new common_1.NotFoundException('Partner not found');
        }
        return updatedPartner;
    }
};
exports.PartnerService = PartnerService;
exports.PartnerService = PartnerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(partner_schema_1.Partner.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PartnerService);
//# sourceMappingURL=partner.service.js.map