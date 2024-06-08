import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUserFriend, setUserFriend,getRecentConversations } from '../controllers/friends.controllers.js';

const router =express.Router();

router.get('/',protectRoute,getUserFriend)
router.post('/',protectRoute,setUserFriend)
router.get('/recent-conversations', protectRoute, getRecentConversations);


export default router