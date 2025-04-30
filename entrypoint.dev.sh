set -e 

npm install

npx prisma generate

npx prisma migrate deploy

exec npm run dev