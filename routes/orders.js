import express from 'express';
const router = express.Router();

router.use(express.json());

// 결제
router.post('/orders', (req, res) => {
  res.json('결제');
});

// 주문 목록(내역) 조회
router.get('/orders', (req, res) => {
  res.json('주문 목록(내역) 조회');
});

export default router;