# mini-express (tiny clone)

This folder contains a tiny, minimal implementation of an Express-like framework and a small example app.

Files:
- `mini-express.js` — minimal framework (app factory, `use`, `get`, `listen`, basic middleware dispatch, error handlers).
- `mini-example.js` — example server demonstrating usage.

Run:

```bash
node mini-example.js
```

Try:

```bash
curl http://localhost:3000/
curl http://localhost:3000/json
curl http://localhost:3000/admin
curl "http://localhost:3000/admin?token=secret"
curl http://localhost:3000/boom
```

Notes:
- This is intentionally minimal: no `path-to-regexp`, no `req.params` parsing, no body parsing. It's a good starting point to incrementally add features (param parsing, Router, mounting, `next('route')`, etc.).
