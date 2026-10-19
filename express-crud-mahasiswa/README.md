# Express CRUD Mahasiswa

Program Express.js untuk CRUD data mahasiswa dengan database PostgreSQL.

## Setup Database

Buat database dan tabel di PostgreSQL:

```sql
CREATE DATABASE mahasiswa;

\c mahasiswa

CREATE TABLE biodata (
    id SERIAL PRIMARY KEY,
    nama VARCHAR(100),
    nim VARCHAR(20),
    kelas VARCHAR(10)
);
```

## Cara Menjalankan

```bash
npm install
npm start
```

Server berjalan di `http://localhost:3000`

## Endpoint

| Method   | Endpoint        | Keterangan              |
| -------- | --------------- | ----------------------- |
| `GET`    | `/biodata`      | Ambil semua data        |
| `POST`   | `/biodata`      | Tambah data baru        |
| `PUT`    | `/biodata/:id`  | Update data by ID       |
| `DELETE` | `/biodata/:id`  | Hapus data by ID        |

### Contoh Body (POST & PUT)

```json
{
  "nama": "Budi Santoso",
  "nim": "2023001",
  "kelas": "TI-3A"
}
```

## Screenshot

### GET /biodata
![GET Screenshot](./screenshot-get.png)
