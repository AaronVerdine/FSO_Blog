const express = require("express");
const router = express.Router();
const pool = require("./db");

/*
    POSTS ROUTES SECTION
*/

router.get("/api/get/allposts", (req, res, next) => {
  pool.query(
    `SELECT * FROM posts ORDER BY date_created DESC`,
    (q_err, q_res) => {
      res.json(q_res.rows);
    }
  );
});

router.get("/api/get/post", (req, res, next) => {
  const post_id = req.query.post_id;

  pool.query(`SELECT * FROM posts WHERE pid=$1`, [post_id], (q_err, q_res) => {
    res.json(q_res.rows);
  });
});

router.post("api/post/posttodb", (req, res, next) => {
  const values = [
    req.body.title,
    req.body.body,
    req.body.uid,
    req.body.pid,
    req.body.username,
  ];

  pool.query(
    `UPDATE posts SET title= $1, body=$2, user_id=$3, author=$5, date_created=NOW() WHERE pid = $4`,
    values,
    (q_err, q_res) => {
      console.log(q_res);
      console.log(q_err);
    }
  );
});

router.delete("api/delete/postcomments", (req, res, next) => {
  const post_id = req.body.post_id;

  pool.query(
    `DELETE FROM comments WHERE pid = $1`,
    [post_id],
    (q_err, q_res) => {
      res.json(q_res.rows);
      console.log(q_err);
    }
  );
});

router.delete("api/delete/post", (req, res, next) => {
  const post_id = req.body.post_id;

  pool.query(`DELETE FROM posts WHERE pid = $1`, [post_id], (q_err, q_res) => {
    res.json(q_res.rows);
    console.log(q_err);
  });
});

router.put("/api/put/likes", (req, res, next) => {
  const uid = [req.body.uid];
  const post_id = String(req.body.post_id);

  const values = [uid, post_id];
  console.log(values);

  pool.query(
    `UPDATE posts SET like_user = like_user_id || $1, likes = likes + 1 
              WHERE NOT (like_user_id @> $1 
              AND pid = ($2)`,
    values,
    (q_err, q_res) => {
      if (q_err) return next(q_err);
      console.log(q_res);
      res.json(q_res.rows);
    }
  );
});

module.exports = router;
