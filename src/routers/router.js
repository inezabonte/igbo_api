import express from 'express';
import rateLimit from 'express-rate-limit';
import { getWords, getWord } from '../controllers/words';
import { getExamples, getExample } from '../controllers/examples';
import { postDeveloper } from '../controllers/developers';
import { getStats } from '../controllers/stats';
import validId from '../middleware/validId';
import validateDeveloperBody from '../middleware/validateDeveloperBody';
import validateApiKey from '../middleware/validateApiKey';
import validateAdminApiKey from '../middleware/validateAdminApiKey';
import analytics from '../middleware/analytics';

const router = express.Router();

const FIFTEEN_MINUTES = 15 * 60 * 1000;
const REQUESTS_PER_MS = 20;
const createDeveloperLimiter = rateLimit({
  windowMs: FIFTEEN_MINUTES,
  max: REQUESTS_PER_MS,
});

// Google Analytics
router.use(analytics);

router.get('/words', validateApiKey, getWords);
router.get('/words/:id', validateApiKey, validId, getWord);
router.get('/examples', validateApiKey, getExamples);
router.get('/examples/:id', validateApiKey, validId, getExample);

router.post('/developers', createDeveloperLimiter, validateDeveloperBody, postDeveloper);

router.get('/stats', validateAdminApiKey, getStats);

export default router;
