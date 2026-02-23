// Get the client
import mysql from 'mysql2'

// Create the connection to database
const connection = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  database: 'BookShop',
});

// A simple SELECT query
// connection.query(
//   'SELECT * FROM `users`',
//   function (err, results, fields) {
//     if (err) {
//       console.log(err);
//       return;
//     }

//     if (results && results.length > 0) {
//       var { id, email, name, created_at } = results[0];

//       console.log(id); // results contains rows returned by server
//       console.log(email);
//       console.log(name);
//       console.log(created_at);
//     } else {
//       console.log("조회된 데이터가 없습니다.");
//     }

//     // console.log(fields); // meta data 확인 시 사용
//   }
// );

export default connection;