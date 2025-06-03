## Docker Setup

### Development

Use the following files:

- `docker-compose.yml`
- `Dockerfile.dev`

Start the development environment:

```bash
docker-compose down
or
docker-compose down -v
docker-compose up --build
```

---

### Production

Use the following files:

- `docker-compose.prod.yml`
- `Dockerfile`

Start the production environment:

```bash
docker-compose -f docker-compose.prod.yml up --build -d
docker-compose -f docker-compose.prod.yml ps
```

http://localhost:3000/
