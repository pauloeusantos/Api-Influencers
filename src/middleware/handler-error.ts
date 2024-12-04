import { NextFunction, Request, Response } from "express";

export default function handleError() {
    return (err: any, req: Request, res: Response, next: NextFunction) => {
        const status = err.status;
        res.status(status).json({
            status,
            message: err.message
        });
    }
}