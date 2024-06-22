
import express from 'express';
import { swipesMessController, getSwipesController,getMessTodayController } from '../controller/mess.controller';

const router = express.Router();
router.get('/swipe', getSwipesController);
router.get('/today', getMessTodayController);
router.post('/swipe', swipesMessController);

export default router;
