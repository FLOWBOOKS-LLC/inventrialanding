
  # Professional Landing Page Design

  This is a code bundle for Professional Landing Page Design. The original project is available at https://www.figma.com/design/vobi49iLbSOgI8edkdyejX/Professional-Landing-Page-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  

## Container / Docker

Build the production image and run it (binds container port 80 to local port 3000):

```bash
docker build -t inventria-landing .
docker run --rm -p 3000:80 inventria-landing
```

Or with Docker Compose:

```bash
docker compose up --build
```

## Backend (Express + Remita)

An Express backend scaffold is available in `backend/` for payment integration.

### Run backend locally

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Default backend URL: `http://localhost:4000`

### Remita endpoints

- `GET /health`
- `GET /api/payments/remita/health`
- `POST /api/payments/remita/initiate`
- `GET /api/payments/remita/verify/:rrr`
- `POST /api/payments/remita/webhook`
