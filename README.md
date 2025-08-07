
# MERN DevOps Demo

A simple MERN stack application designed for DevOps learning and deployment.  
This project connects a React frontend with an Express backend and MongoDB Atlas.

---

## **Features**
- **Frontend**: React application that fetches backend `/api/health` endpoint.
- **Backend**: Express server connected to MongoDB Atlas.
- **Database**: MongoDB Atlas cloud database.
- **Environment Variables**: `.env` files for both frontend and backend.
- **Docker Ready**: Ready for containerization and deployment.

---

## **Folder Structure**
```
mern-app/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   ├── package.json
│   └── .env
├── docker-compose.yml
└── README.md
```

---

## **Backend Setup**
1. Navigate to backend folder:
```bash
cd backend
npm install
```
2. Create `.env` file:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mydb
PORT=5000
```
3. Run backend:
```bash
npm start
```

---

## **Frontend Setup**
1. Navigate to frontend folder:
```bash
cd frontend
npm install
```
2. Create `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```
3. Run frontend:
```bash
npm start
```

---

## **Test Locally**
- Backend: [http://localhost:5000/api/health](http://localhost:5000/api/health)  
- Frontend: [http://localhost:3000](http://localhost:3000)

---

## **Dockerization**
Backend Dockerfile (`backend/Dockerfile`):
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

Frontend Dockerfile (`frontend/Dockerfile`):
```dockerfile
FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
```

Docker Compose (`docker-compose.yml`):
```yaml
version: "3.8"
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    env_file: ./backend/.env
    networks:
      - mern-net

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    env_file: ./frontend/.env
    depends_on:
      - backend
    networks:
      - mern-net

networks:
  mern-net:
```

Run locally:
```bash
docker-compose up --build
```

---

## **Deployment**
- Push images to Docker Hub.
- Deploy containers to AWS EC2, ECS, or Kubernetes.
- Store secrets in AWS SSM or Secrets Manager.



Development
  React (npm start, localhost:3000)
    → /api → localhost:5000 (Node.js)
    → Local or Dev MongoDB Atlas

Staging
  React (built, served by Nginx at staging.lauv.in)
    → /api → backend container on EC2
    → Staging MongoDB Atlas

Production
  React (built, 
  +d by Nginx at lauv.in)
    → /api → backend container on EC2
    → Production MongoDB Atlas
