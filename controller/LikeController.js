import conn from '../mariadb.js'; // db 모듈
import StatusCode from 'http-status-codes'; // status code 모듈

const addLike = (req, res) => {
  //좋아요 추가
  const {id} = req.params;
  const {user_id} = req.body;

  let sql = "INSERT INTO likes (user_id, liked_book_id) VALUES (?, ?)";
  let values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if(err) {
      console.log(err);
      return res.status(StatusCode.BAD_REQUEST).end();
    }

    return res.status(StatusCode.OK).json(results);
  })
}

const removeLike = (req, res) => {
  // 좋아요 제거(취소)
  const {id} = req.params; //book_id
  const {user_id} = req.body;

  let sql = "DELETE FROM likes WHERE user_id = ? AND liked_book_id = ?";
  let values = [user_id, id];
  conn.query(sql, values, (err, results) => {
    if(err) {
      console.log(err);
      return res.status(StatusCode.BAD_REQUEST).end();
    }

    return res.status(StatusCode.OK).json(results);
  })
}

export {
  addLike,
  removeLike
};