"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IMPACT_WEIGHTS = void 0;
const role_1 = require("../enums/role");
exports.IMPACT_WEIGHTS = {
    [role_1.Role.Duelist]: {
        entryKill: 1.5,
        entryDeath: -0.5,
        tradeKill: 0.8,
        untradedDeath: -1.0,
    },
    [role_1.Role.Initiator]: {
        utilityAssist: 1.2,
        setupSuccess: 1.0,
        tradeKill: 0.9,
        untradedDeath: -0.8,
    },
    [role_1.Role.Controller]: {
        utilityAssist: 1.3,
        smokesUsed: 0.5,
        untradedDeath: -0.6,
    },
    [role_1.Role.Sentinel]: {
        siteHoldDuration: 1.0,
        retakeKill: 1.2,
        utilityBroken: -0.4,
        untradedDeath: -0.7,
    },
};
