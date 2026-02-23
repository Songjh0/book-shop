import express from 'express'; // express 모듈
const router = express.Router(); 
import conn from '../mariadb.js'; // db 모듈
import { join, login, PasswordResetRequest, PasswordReset } from '../controller/UserController.js'; // controller 모듈

router.use(express.json());


router.post('/join', join); // 회원가입
router.post('/login', login); // 로그인
router.post('/reset', PasswordResetRequest); // 비밀번호 초기화 요청
router.put('/reset', PasswordReset); // 비밀번호  초기화

export default router;