import express from 'express';
const router = express.Router();
import { addToCart, getCartItems, removeCartItem } from "../controller/CartController.js";

router.use(express.json());

router.post('/', addToCart); // 장바구니 담기
router.get('/', getCartItems); // 장바구니 조회
router.delete('/:id', removeCartItem); // 장바구니 삭제

// (장바구니에서 선택한) 주문 예상 상품 목록 조회
// router.get('/', (req, res) => {
//   res.json('주문 예상 상품 목록 조회');
// });

export default router;