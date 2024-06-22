import { NextFunction, Request, Response } from 'express';
import {getStudents, createStudent, updateStudent, getStudentById, deleteStudent } from "../services/student.service";

export const getStudentsController = async (req: Request, res: Response, next: NextFunction) => {
    try {  
        await getStudents(req, res, next);
    } catch (error) {
        return next(error);
    }
}

export const createStudentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await createStudent(req, res, next);
    } catch (error) {
        return next(error);
    }
}

export const getStudentByIdController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await getStudentById(req, res, next);
    } catch (error) {
        return next(error);
    }
}

export const updateStudentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await updateStudent(req, res, next);
    } catch (error) {
        return next(error);
    }
}

export const deleteStudentController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteStudent(req, res, next);
    }catch (error) {
        return next(error);
    }
}


