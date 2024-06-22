
import express from 'express';
import { checkInController, checkOutController, createRequestController,getAllRequestsForTodayController, getAllRequestsPaginatedController, updateRequestController } from '../controller/facility.controller';

const router = express.Router();
router.post('/', createRequestController);
router.get('/', getAllRequestsForTodayController);
router.put('/:id', updateRequestController);
router.get('/check-out/:id', checkOutController);
router.get('/check-in/:id', checkInController);
router.get('/paginated', getAllRequestsPaginatedController);

export default router;
