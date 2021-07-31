import express from 'express';
import { getAuthorizeUrl, getTokens, getUserInfo } from '../controllers/auth';

const router = express.Router();

router.get('/spotify', getAuthorizeUrl);

router.get('/spotify/callback', getTokens);

router.get('/spotify/me', getUserInfo);

export default router;
