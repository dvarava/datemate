"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateGenerationModule = void 0;
const common_1 = require("@nestjs/common");
const date_generation_service_1 = require("./date-generation.service");
const date_generation_controller_1 = require("./date-generation.controller");
const axios_1 = require("@nestjs/axios");
let DateGenerationModule = class DateGenerationModule {
};
exports.DateGenerationModule = DateGenerationModule;
exports.DateGenerationModule = DateGenerationModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [date_generation_controller_1.DateGenerationController],
        providers: [date_generation_service_1.DateGenerationService],
    })
], DateGenerationModule);
//# sourceMappingURL=date-generation.module.js.map