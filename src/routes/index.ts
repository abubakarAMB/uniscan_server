import express from 'express';

const router = express.Router();
import studentRoutes from './student';
import messRoutes from './mess';
import facilityRoutes from './facility';

router.use('/students', studentRoutes);
router.use('/mess', messRoutes);
router.use('/facilities', facilityRoutes);

export default router;
