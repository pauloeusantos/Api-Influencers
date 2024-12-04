import { ObjectId } from "mongodb";
import influencer from "../model/influencer";

export default class InfluencerService {
    public static validateId(id: string): ObjectId {
        try {
            return new ObjectId(id);
        } catch (error) {
            throw new Error("Id é inválido!");
        }
    }

    public static validate(influencer: influencer) {
        if (!influencer.nome) {
            throw new Error("Nome deve ser preenchido!");
        }

        if (influencer.principalRedeSocial === undefined || influencer.numeroSeguidores === null) {
            throw new Error("Principal rede social e numero de seguidores deve ser preenchido!");
        }

        
    }
}