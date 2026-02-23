import conn from '../mariadb.js'; // db 모듈
import StatusCode from 'http-status-codes'; // status code 모듈

// limit : page 당 도서 수 ex.3
  // currentPage : 현재 페이지 ex.1, 2, 3 ...
  // offset : 
  
const allBooks = (req, res) => {
  // 카테고리별, 신간 여부) 전체 도서 목록 조회
  let { category_id, news } = req.query;

  let sql = "SELECT * FROM books";
  let values = [];
  if (category_id && news) {
    sql += " WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values = [category_id, news];
  } else if (category_id) {
    sql += " WHERE category_id = ?";
    values = category_id;
  } else if (news) {
    sql += " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values = news;
  }

  conn.query(sql, values, 
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCode.BAD_REQUEST).end();
      }

      if(results.length)
        return res.status(StatusCode.OK).json(results);
      else
        return res.status(StatusCode.NOT_FOUND).end();
    })
};

const bookDetail = (req, res) => {
  let {id} = req.params;

  let sql = `SELECT * FROM books LEFT JOIN category
              ON books.category_id = category.id WHERE books.id = ?`;
  conn.query(sql, id, 
    (err, results) => {
      if (err) {
        console.log(err);
        return res.status(StatusCode.BAD_REQUEST).end();
      }

      if(results[0])
        return res.status(StatusCode.OK).json(results[0]);
      else
        return res.status(StatusCode.NOT_FOUND).end();

    })
};

export {
  allBooks,
  bookDetail
};