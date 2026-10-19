import express from "express";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "mahasiswa",
  password: "84769572",
  port: 5432,
});

const app = express();
app.use(express.json());

// GET - ambil semua data
app.get("/biodata", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM biodata ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// POST - tambah data baru
app.post("/biodata", async (req, res) => {
  try {
    const { nama, nim, kelas } = req.body;
    const result = await pool.query(
      "INSERT INTO biodata (nama, nim, kelas) VALUES ($1, $2, $3) RETURNING *",
      [nama, nim, kelas]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// PUT - update data berdasarkan id
app.put("/biodata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, nim, kelas } = req.body;
    const result = await pool.query(
      "UPDATE biodata SET nama = $1, nim = $2, kelas = $3 WHERE id = $4 RETURNING *",
      [nama, nim, kelas, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: "Data tidak ditemukan" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE - hapus data berdasarkan id
app.delete("/biodata/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM biodata WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Data tidak ditemukan" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});
