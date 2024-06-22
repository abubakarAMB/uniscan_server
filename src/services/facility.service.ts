import { Request, Response, NextFunction } from "express";
import createHttpError, { InternalServerError } from "http-errors";
import { FacilityModel } from "../models/facility.schema";

//swipe function if a student swipes the card a record is created in the mess collection a student can swipe the card for breakfast, lunch, or dinner only once a day
export const requestOuting = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { rollNumber, ...rest } = req.body;
    const newRequest = await FacilityModel.create({ rollNumber, ...rest });
    return res.status(201).json(newRequest);
  } catch (error) {
    console.log(error);
    return next(InternalServerError);
  }
};

//Approve or reject the request
export const updateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedRequest = await FacilityModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updatedRequest) {
      return next(createHttpError(404, "Request not found"));
    }
    return res.status(200).json(updatedRequest);
  } catch (error) {
    console.log(error);
    return next(InternalServerError);
  }
};

//admin student if request is approved
export const checkOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;  
    //check if request is approved
    const request = await FacilityModel.findOne({rollNumber: id, status: "APPROVED"});
    if (!request) {
      return next(createHttpError(404, "Request not found"));
    }

    if (request.status !== "APPROVED") {
      return next(createHttpError(400, "Request is not approved"));
    }

    const updatedRequest = await FacilityModel.findOneAndUpdate(
      {rollNumber: id, status: "APPROVED"},
      { inDateTime: new Date(), status: "OUT"},
      { new: true }
    );
    if (!updatedRequest) {
      return next(createHttpError(404, "Request not found"));
    }
    return res.status(200).json(updatedRequest);
  } catch (error) {
    console.log(error);
    return next(InternalServerError);
  }
};

//check in student if request if request is OUT

export const checkIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updatedRequest = await FacilityModel.findOneAndUpdate(
      {rollNumber: id, status: "OUT"},
      { inDateTime: new Date(), status: "IN"},
      { new: true }
    );
    if (!updatedRequest) {
      return next(createHttpError(404, "Request not found"));
    }
    return res.status(200).json(updatedRequest);
  } catch (error) {
    console.log(error);
    return next(InternalServerError);
  }
};

//get all reqests for today
export const getAllRequestsForToday = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // order by most recent
    const requests = await FacilityModel.find({
      createdAt: { $gte: today },
    }).sort({ createdAt: -1 });
    return res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    return next(InternalServerError);
  }
};

//get all requests paginated
export const getAllRequests = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const requests = await FacilityModel.find()
      .skip((parseInt(page.toString()) - 1) * parseInt(limit.toString()))
      .limit(parseInt(limit.toString()));
    return res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    return next(InternalServerError);
  }
};

//get all requests count grouped by status
export const getAllRequestsCount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const requests = await FacilityModel.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);
    return res.status(200).json(requests);
  } catch (error) {
    console.log(error);
    return next(InternalServerError);
  }
};
