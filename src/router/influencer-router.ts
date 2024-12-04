import express from "express"
import influencerController from "../controller/influencer-controller";

const influencerRouter = express.Router();

influencerRouter.get("/influencers", influencerController.getAllInfluencer);
influencerRouter.post("/influencers", influencerController.createInfluencer);
influencerRouter.put("/influencers/:id", influencerController.updateInfluencer);
influencerRouter.delete("/influencers/:id", influencerController.deleteInfluencer);

export default influencerRouter;