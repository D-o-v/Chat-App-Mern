import express from 'express';
import protectRoute from '../middleware/protectRoute.js';
import { getUserFriend, setUserFriend } from '../controllers/friends.controllers.js';

const router =express.Router();

router.get('/',protectRoute,getUserFriend)
router.post('/',protectRoute,setUserFriend)


export default router