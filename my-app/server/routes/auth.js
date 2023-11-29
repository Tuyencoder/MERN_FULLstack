import express from 'express';
import * as auth from '../controllers/auth.js';
import {requireSignin} from '../middlewares/auth.js'

const router = express.Router();

router.get('/',requireSignin, auth.welcome)
// router.post('/pre-register', auth.run)
router.post('/register', auth.register)

router.post('/login', auth.login)

router.get("/current-user", requireSignin, auth.currentUser);

router.get("/profile/:username", auth.publicProfile);

router.put("/update-password", requireSignin, auth.updatePassword);

router.put("/update-profile", requireSignin, auth.updateProfile);

export default router; 