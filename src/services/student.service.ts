import { NextFunction, Request, Response } from 'express';

import createHttpError, { InternalServerError } from 'http-errors';
import { StudentModel } from '../models/student.model';

//get all students 

export const getStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {    
        const students = await StudentModel.find();
        return res.json(students);
    } catch (error) {
        return next(InternalServerError);
    }
};

//create a student

export const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try { 
        const student = await StudentModel.create({ ...req.body });
        return res.status(201).json(student);
    } catch (error) {
        console.log(error);
        return next(InternalServerError);
    }
};

//get a student by id
export const getStudentById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await StudentModel.findById(req.params.id);
        if (!student) {
            return next(createHttpError(404, 'Student not found'));
        }
        return res.json(student);
    } catch (error) {
        return next(InternalServerError);
    }
}

//update a student by id
export const updateStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await StudentModel.findByIdAndUpdate
            (req.params.id, req.body, { new: true });
        if (!student) {
            return next(createHttpError(404, 'Student not found'));
        }
        return res.json(student);
    } catch (error) {
        return next(InternalServerError);
    }
}

//delete a student by id
export const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const student = await StudentModel.findByIdAndDelete(req.params.id);
        if (!student) {
            return next(createHttpError(404, 'Student not found'));
        }
        return res.json(student);
    } catch (error) {
        return next(InternalServerError);
    }
}