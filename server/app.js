// Express serverio instaliavimas
const express = require("express");
const app = express();
const port = 3003;

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Nodedemon atnaujina serveri
// SQL tiltas tarp serverio ir mysql
const mysql = require("mysql");

const con = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "egzaminas",
  password: "root",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

// Cors kad teisingus headerius issiustu
const cors = require("cors");
app.use(cors());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Routeris - nusakomas kelias kas turi ivykti kai narsykle kreipsis ir ka serveris atsakys

// app.get("/labas/:id", (req, res) => {
//   res.send(`labas tau ${req.params.id} `);
// });
// app.get("/test", (req, res) => {
//   res.send(JSON.stringify({ test: "OK" }));
// });
//   -------------------------------------------------------------------------------

// Read node
app.get("/books", (req, res) => {
  const sql = `
    SELECT *
    FROM books
    `;
  con.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send(results);
  });
});

//Delete node
app.delete("/books/:id", (req, res) => {
  const sql = `
        DELETE FROM books
        WHERE id = ?
        `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// Edit Node
app.put("/books/:id", (req, res) => {
  const sql = `
      UPDATE books
      SET title = ?, price = ?, discount_price = ?, sale = ?
      WHERE id = ?
  `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.price,
      req.body.discount_price,
      req.body.sale,
      req.params.id,
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

// Create node
app.post("/books", (req, res) => {
  const sql = `
      INSERT INTO books
      (title, price, discount_price, sale)
      VALUES (?, ?, ?, ?)
  `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.price,
      req.body.discount_price,
      req.body.sale,
    ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.send(results);
    }
  );
});

// Bendra statistika
app.get('/stats', (req, res) => {
  const sql = `
SELECT COUNT(id) as count, SUM(price) as price, AVG(price) as average
FROM books
`;
  // console.log(req.query.s);
  con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
      if (err) {
          throw err;
      }
      res.send(results);
  })
})

// // Grupine statistika
// app.get('/group-stats', (req, res) => {
//   const sql = `
// SELECT COUNT(id) as count, title
// FROM books
// GROUP BY title
// ORDER BY title desc
// `;
//   // console.log(req.query.s);
//   con.query(sql, ['%' + req.query.s + '%'], (err, results) => {
//       if (err) {
//           throw err;
//       }
//       res.send(results);
//   })
// })
