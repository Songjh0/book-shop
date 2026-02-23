import express from 'express';
const router = express.Router();
import { allBooks, bookDetail } from '../controller/BookController.js'; // controller 모듈

router.use(express.json());

// (카테고리별) 전체 도서 조회
router.get('/', allBooks);

// 개별 도서 조회
router.get('/:id', bookDetail);

export default router;