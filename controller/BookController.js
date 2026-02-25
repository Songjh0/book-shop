import conn from '../mariadb.js';
import StatusCode from 'http-status-codes'; 
  
const allBooks = (req, res) => {
  // 카테고리별, 신간 여부) 전체 도서 목록 조회
  let { category_id, news, limit, currentPage } = req.query;

  // limit : page 당 도서 수 ex.3
  // currentPage : 현재 페이지 ex.1, 2, 3 ...
  // offset : 0부터 시작 ex.0, 3, 6, 9, 12 .....
  // offset 계산방법 -> limit * (currentPage-1)
  limit = parseInt(limit)
  currentPage = parseInt(currentPage)

  let offset = limit * (currentPage-1);

  let sql = "SELECT * FROM books";
  let values = [];
  if (category_id && news) { 
    sql += " WHERE category_id = ? AND pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
    values = [category_id];
  } else if (category_id) {
    sql += " WHERE category_id = ?";
    values = [category_id];
  } else if (news) {
    sql += " WHERE pub_date BETWEEN DATE_SUB(NOW(), INTERVAL 1 MONTH) AND NOW()";
  }

  sql += "LIMIT ? OFFSET ? "
  values.push(limit, offset);

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