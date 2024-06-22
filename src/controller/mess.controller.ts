import { NextFunction, Request, Response } from 'express';
import { getSwipes, swipe, getMessToday } from '../services/mess.service';

export const swipesMessController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await swipe(req, res, next);
    } catch (error) {
        return next(error);
    }
}

export const getSwipesController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getSwipes(req, res, next);
    } catch (error) {
        return next(error);
    }
}

export const getMessTodayController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getMessToday(req, res, next);
    } catch (error) {
        return next(error);
    }
}
