"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class InfluencerService {
    static validateId(id) {
        try {
            return new mongodb_1.ObjectId(id);
        }
        catch (error) {
            throw new Error("Id é inválido!");
        }
    }
    static validate(influencer) {
        if (!influencer.nome) {
            throw new Error("Nome deve ser preenchido!");
        }
        if (influencer.principalRedeSocial === undefined || influencer.numeroSeguidores === null) {
            throw new Error("Principal rede social e numero de seguidores deve ser preenchido!");
        }
    }
}
exports.default = InfluencerService;
