"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = void 0;
var EventType;
(function (EventType) {
    EventType["Kill"] = "KILL";
    EventType["Ability"] = "ABILITY";
    EventType["PlantStart"] = "PLANT_START";
    EventType["PlantComplete"] = "PLANT_COMPLETE";
    EventType["DefuseStart"] = "DEFUSE_START";
    EventType["DefuseComplete"] = "DEFUSE_COMPLETE";
})(EventType || (exports.EventType = EventType = {}));
