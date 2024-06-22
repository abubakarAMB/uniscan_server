import { MessModel } from "../models/mess.model";
import { Request, Response, NextFunction } from 'express';
import createHttpError, { InternalServerError } from 'http-errors';

//swipe function if a student swipes the card a record is created in the mess collection a student can swipe the card for breakfast, lunch, or dinner only once a day
export const swipe = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { rollNumber, meal } = req.body;
        //check if the student exists in the mess collection for today check with createdAt date
        const student = await MessModel.findOne({ studentId: rollNumber, meal, createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } });
        if (student) {
            return res.status(400).json({ message: 'You have already swiped for today' });
        }
        //create a record in the mess collection
        const newMess = await MessModel.create({ studentId: rollNumber, meal });
        return res.status(201).json(newMess);
    } catch (error) {
        console.log(error);
        
        return next(InternalServerError);
    }
}

//get all the swipes of a student grouped by meal
export const getSwipes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        //group by meal and count
        const swipes = await MessModel.aggregate([
            { $group: { _id: '$meal', count: { $sum: 1 } } }
        ]);
        return res.json(swipes);
    } catch (error) {
        return next(InternalServerError);
    }
}

//get all mess records for today
export const getMessToday = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const mess = await MessModel.find({ createdAt: { $gte: new Date().setHours(0, 0, 0, 0) } });
        return res.json(mess);
    } catch (error) {
        return next(InternalServerError);
    }
}
