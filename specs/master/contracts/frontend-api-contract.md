# Frontend API Contract

## Scope
This contract documents backend API expectations consumed by the frontend through modules in `src/api/` and `axiosClient`.

## Base Configuration
- Base URL: `REACT_APP_API_BASE_URL`
- Default headers:
  - `Content-Type: application/json`
- Authentication:
  - If `localStorage.token` exists, requests include `Authorization: Bearer <token>`.

## Contract: Authentication
### Login
- Method: `POST`
- Path: `/auth/login` (representative; final path follows backend agreement)
- Request body:
  - `email` (string, required)
  - `password` (string, required)
- Success response:
  - `token` (string)
  - `user` (object)
- Failure response:
  - `message` (string)
  - `code` (string, optional)

## Contract: Products
### List products
- Method: `GET`
- Path: `/products` (representative; final path follows backend agreement)
- Query params (optional):
  - `page` (number)
  - `limit` (number)
  - `category` (string)
- Success response:
  - `items` (array of Product)
  - `total` (number, optional)

### Product shape
- `id`: string | number (required)
- `name`: string (required)
- `price`: number (required)
- `description`: string (optional)
- `imageUrl`: string (optional)
- `category`: string (optional)

## Error Contract (All endpoints)
- Non-2xx responses return JSON with at least:
  - `message` (string)
- Optional fields:
  - `code` (string)
  - `details` (object | array)

## Notes
- Exact endpoint paths should be aligned with backend API specification when available.
- This repository enforces request configuration via shared `axiosClient`.
