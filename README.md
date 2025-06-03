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

### Best Practices to push in dockerhub

```bash
# ensure login successfully
docker login
# check docker images list
docker images
# tagging
docker tag nextjs-prisma-mongo-blog-app:latest anikxponent/nextjs-prisma-mongo-blog-app:latest
# push
docker push anikxponent/nextjs-prisma-mongo-blog-app:latest
```

### Sharing with Others

Others can now use your image by:

```bash
# Pulling it:
docker pull your-dockerhub-username/nextjs-prisma-mongo-blog:latest
```

```bash
#Running it:
docker-compose -f docker-compose.prod.yml up -d
```
