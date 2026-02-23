import conn from '../mariadb.js'; // db 모듈
import StatusCode from 'http-status-codes'; // status code 모듈
import jwt from 'jsonwebtoken'; // jwt 모듈
import crypto from 'crypto'; // crypto 암호화 모듈
import dotenv from 'dotenv';
dotenv.config();

const join = (req, res) => {
  const { email, password } = req.body;

  let sql = 'INSERT INTO users (email, password, salt) VALUES (?, ?, ?)';

  // 비밀번호 암호화
  // 암호화된 비밀번호와 salt 값을 같이 DB에 저장
  const salt = crypto.randomBytes(10).toString('base64');
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 10, 'sha512').toString('base64');

  let values = [email, hashedPassword, salt];
  conn.query(sql, values, 
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCode.BAD_REQUEST).end();
      }
      return res.status(StatusCode.CREATED).json(results);
    });
}

const login = (req, res) => {
  const { email, password } = req.body;

  let sql = 'SELECT * FROM users WHERE email = ?';
  conn.query(sql, email, 
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCode.BAD_REQUEST).end();
      }
      
      const loginUser = results[0];
      
      // salt값을 꺼내서 비밀번호 암호화 해보고 
      const hashPassword = crypto.pbkdf2Sync(password, loginUser.salt, 1000, 10, 'sha512').toString('base64');

      // 디비 비밀번호랑 비교
      if(loginUser && loginUser.password === hashPassword) {
        // token 발행
        const token = jwt.sign({
          email : loginUser.email,
        }, process.env.PRIVATE_KEY, { 
          expiresIn: '5m',
          issuer: 'jeonghwa' 
        });

        // token 쿠키에 담기
        res.cookie("token", token, {
          httpOnly : true
        });
        console.log(token);
      
        return res.status(StatusCode.OK).json(results);
      } else {
        return res.status(StatusCode.UNAUTHORIZED).end(); // 401 : Unauthorized 403 : Forbidden (접근 권한 없음)
      }
    })
};

const PasswordResetRequest = (req, res) => {
  const { email } = req.body;

  let sql = 'SELECT * FROM users WHERE email = ?';
  conn.query(sql, email,
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCode.BAD_REQUEST).end();
      }

      // 이메일로 유저가 있는지 찾아보기!
      const user = results[0];
      if (user) {
        return res.status(StatusCode.OK).json({
          email : email //body로 받은 email 그대로 응답
        });
      } else {
        return res.status(StatusCode.UNAUTHORIZED).end();
      }
    }
  )
};

const PasswordReset = (req, res) => {
  const { password, email } = req.body;

  let sql = 'UPDATE users SET password = ?, salt = ? WHERE email = ?';

  // 암호화된 비밀번호와 salt 값을 같이 DB에 저장
  const salt = crypto.randomBytes(10).toString('base64'); 
  const hashedPassword = crypto.pbkdf2Sync(password, salt, 1000, 10, 'sha512').toString('base64');

  let values = [hashedPassword, salt, email];
  conn.query(sql, values,
    (err, results) => {
      if(err) {
        console.log(err);
        return res.status(StatusCode.BAD_REQUEST).end();
      } 
      
      if(results.affectedRows == 0)
        return res.status(StatusCode.BAD_REQUEST).end();
      else 
        return res.status(StatusCode.OK).json(results);
    }
  )
};

export {
  join,
  login,
  PasswordResetRequest,
  PasswordReset
};