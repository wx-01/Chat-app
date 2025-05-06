import express from 'express';
import { protectRouter } from '../middleware/auth.middleware.js';
import { getMessages, getUserForSidebar, sendMessages } from '../controllers/message.controller.js';

const router = express.Router();

router.get('/users',protectRouter,getUserForSidebar); //get all users for sidebar
router.get('/:id',protectRouter,getMessages);
router.post('/send/:id',protectRouter,sendMessages);



export default router;