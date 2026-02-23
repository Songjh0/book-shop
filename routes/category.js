import express from 'express';
const router = express.Router();
import { allCategory } from '../controller/CategoryController.js'; // controller 모듈

router.use(express.json());

router.get('/', allCategory); // 카테고리별 전체 목록 조회

export default router;