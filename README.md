
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
