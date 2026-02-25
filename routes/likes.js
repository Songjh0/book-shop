import express from 'express';
const router = express.Router();
import { addLike, removeLike } from '../controller/LikeController.js'; // controller 모듈

router.use(express.json());

router.post('/:id', addLike); // 좋아요 추가
router.delete('/:id', removeLike); // 좋아요 삭제


export default router;