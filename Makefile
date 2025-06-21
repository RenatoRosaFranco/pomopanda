migrate:
	npx prisma migrate dev --name init

generate:
	npx prisma generate

studio:
	npx prisma studio

db-reset:
	npx prisma migrate reset --force

dev:
	npm run dev

build:
	npm run build

start:
	npm run start

lint:
	npm run lint

test-api:
	curl -X GET http://localhost:3000/api/me -H "Authorization: Bearer <TOKEN>"

help:
	@echo "Pomopanda - Usefull Make Commands:"
	@echo ""
	@echo "make migrate       -> Run Prisma Migrations (dev)"
	@echo "make generate      -> Generate Prisma Client"
	@echo "make studio        -> Open Prisma Studio"
	@echo "make db-reset      -> Reset DB (⚠️ Destroys all data)"
	@echo "make dev           -> Run Next.js Dev Server"
	@echo "make build         -> Build Next.js App"
	@echo "make start         -> Start Next.js Production Server"
	@echo "make lint          -> Run ESLint"
	@echo "make test-api      -> Test protected API (Replace TOKEN)"
