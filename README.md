# Portfolio CMS

Saat ini yang sudah dieksekusi adalah fondasi backend untuk fase 1 sesuai plan di folder `plan`.

## Backend

Lokasi: `backend/`

Perintah utama:

```bash
cd backend
npm install
npm run seed
npm run dev
```

Endpoint yang sudah aktif:

- `GET /` → `{"message":"API running"}`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`
- `GET /api/v1/auth/logout`

## Next phase

Fase berikutnya dari plan adalah melanjutkan CRUD backend, lalu frontend public dan admin panel.
