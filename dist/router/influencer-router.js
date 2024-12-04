"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const influencer_controller_1 = __importDefault(require("../controller/influencer-controller"));
const influencerRouter = express_1.default.Router();
influencerRouter.get("/influencers", influencer_controller_1.default.getAllInfluencer);
influencerRouter.post("/influencers", influencer_controller_1.default.createInfluencer);
influencerRouter.put("/influencers/:id", influencer_controller_1.default.updateInfluencer);
influencerRouter.delete("/influencers/:id", influencer_controller_1.default.deleteInfluencer);
exports.default = influencerRouter;
