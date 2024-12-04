"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class MongoConnection {
    static getInstance() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.conn) {
                this.conn = yield this.openConnection();
            }
            return this.conn;
        });
    }
    static openConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = new mongodb_1.MongoClient(this.URI);
            const conn = yield client.connect();
            console.log("Conexão com o banco de dados aberta com sucesso!");
            const close = () => __awaiter(this, void 0, void 0, function* () {
                this.conn.close();
                console.log("Conexão com o banco de dados encerrada com sucesso!");
                process.exit();
            });
            process.on("SIGINT", close);
            process.on("SIGTERM", close);
            return conn;
        });
    }
}
MongoConnection.URI = "mongodb://127.0.0.1:27017/";
exports.default = MongoConnection;
