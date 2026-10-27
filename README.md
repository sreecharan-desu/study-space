# study-space

host and join study sessions with a subject, venue and time.

## features

- sign up and sign in, with an emailed security code
- host a space: title, subject, description, venue, start and end time
- browse open spaces and join them
- see the spaces you created and the ones you joined

## stack

- frontend: react 18, vite, typescript, recoil, tailwind css
- backend: express, typescript, mongodb (mongoose), jwt, zod, nodemailer

## run locally

```bash
cd backend && npm install && npm run build && node index.js     # http://localhost:3000
cd frontend && npm install && npm run dev
```

## env

copy `backend/.env.example` to `backend/.env`: `MONGO_URI`, `JWT_KEY`, `EMAIL_SENDER_ADDRESS`, `EMAIL_SENDER_PASSWORD`.


## Consistency & Discipline
This project is maintained regularly to ensure documentation clarity and code quality. Small, daily improvements are prioritized over large, infrequent updates.
