import conn from '../mariadb.js'; // db 모듈
import StatusCode from 'http-status-codes'; // status code 모듈

const allCategory = (req, res) => {
    // 카테고리 전체 목록 리스트
    let sql = 'SELECT * FROM category';
    conn.query(sql, (err, results) => {
        if (err) {
          console.log(err);
          return res.status(StatusCode.BAD_REQUEST).end();
        }
        return res.status(StatusCode.OK).json(results);
  })
};

export {
  allCategory
};