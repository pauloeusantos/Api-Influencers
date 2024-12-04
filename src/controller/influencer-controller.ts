import { NextFunction, Request, Response } from "express";
import MongoConnection from "../db/mongo-connection";
import createError from "http-errors";
import { ObjectId } from "mongodb";
import InfluencerService from "../service/influencer-service";
import Influencer from "../model/influencer";

export default class influencerController {

    public static async getAllInfluencer(req: Request, res: Response, next: NextFunction) {
        try {
            const conn = await MongoConnection.getInstance();
            const db = conn.db("devweb");
            const influencers = db.collection("influencers");
            res.status(200).json(await influencers.find().toArray());
        } catch (error) {
            next(createError[500]((error as Error).message));
        }
    }

    public static async createInfluencer(req: Request, res: Response, next: NextFunction) {
        const influencer: Influencer = req.body;

        try {
            InfluencerService.validate(influencer);
        } catch (error) {
            next(createError[400]((error as Error).message));
            return;
        }

        try {
            const conn = await MongoConnection.getInstance();
            const db = conn.db("devweb");
            const influencers = db.collection("influencers");
            await influencers.insertOne(influencer);
            res.status(201).json(influencer);
        } catch (error) {
            next(createError[500]((error as Error).message));
        }
    }

    public static async updateInfluencer(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const influencer: Influencer = req.body;

        let objectId: ObjectId;

        try {
            objectId = InfluencerService.validateId(id);
        } catch (error) {
            next(createError[400]((error as Error).message));
            return;
        }

        try {
            const conn = await MongoConnection.getInstance();
            const db = conn.db("devweb");
            const influencers = db.collection("influencers");
            const influencerExists = await influencers.findOne({ _id: objectId }) != null;

            if (!influencerExists) {
                next(createError[404]("influencer com esse id não está cadastrada!"));
                return;
            }

            try {
                InfluencerService.validate(influencer);
            } catch (error) {
                next(createError[400]((error as Error).message));
                return;
            }

            await influencers.updateOne({ _id: objectId }, { $set: influencer });
            res.status(200).json(await influencers.findOne({ _id: objectId }));
        } catch (error) {
            next(createError[500]((error as Error).message));
        }
    }

    public static async deleteInfluencer(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        let objectId: ObjectId;

        try {
            objectId = InfluencerService.validateId(id);
        } catch (error) {
            next(createError[400]((error as Error).message));
            return;
        }

        try {
            const conn = await MongoConnection.getInstance();
            const db = conn.db("devweb");
            const influencers = db.collection("influencers");
            const influencer = await influencers.findOne({ _id: objectId });

            if (!influencer) {
                next(createError[404]("influencer com esse id não está cadastrada!"));
                return;
            }

            await influencers.deleteOne({ _id: objectId });
            res.status(204).send("");
        } catch (error) {
            next(createError[500]((error as Error).message));
        }
    }
}