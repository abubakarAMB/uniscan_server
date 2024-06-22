
import express from 'express';
import { createStudentController, deleteStudentController, getStudentByIdController, getStudentsController, updateStudentController } from '../controller/student.controller';

const router = express.Router();

router.get('/', getStudentsController);
router.post('/', createStudentController);
router.get('/:id', getStudentByIdController);
router.put('/:id', updateStudentController);
router.delete('/:id', deleteStudentController);

export default router;
