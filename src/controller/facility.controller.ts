import { NextFunction, Request, Response } from 'express';
import { checkIn, checkOut, getAllRequestsForToday, requestOuting, updateRequest, } from '../services/facility.service';

export const createRequestController = async (req: Request, res: Response, next: NextFunction) => {
    try {  
        await requestOuting(req, res, next);
    } catch (error) {
        return next(error);
    }
}

//update request status
export const updateRequestController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateRequest(req, res, next);
    } catch (error) {
        return next(error);
    }
}

//check out student
export const checkOutController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await checkOut(req, res, next);
    } catch (error) {
        return next(error);
    }
}

//check in student
export const checkInController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await checkIn(req, res, next);
    } catch (error) {
        return next(error);
    }
}

//get all requests for today
export const getAllRequestsForTodayController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getAllRequestsForToday(req, res, next);
    } catch (error) {
        return next(error);
    }
}

//get all requests paginated
export const getAllRequestsPaginatedController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getAllRequestsPaginatedController(req, res, next);
    } catch (error) {
        return next(error);
    }
}


//get all requests grouped by status
export const getAllRequestsGroupedController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getAllRequestsGroupedController(req, res, next);
    } catch (error) {
        return next(error);
    }
}