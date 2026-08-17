export * from "./schemas.js";
import express from 'express';
import cors from 'cors'; // Import cors

const app = express();

// Enable CORS for your Vercel frontend and local development
app.use(cors({
  origin: [
    'https://groundwater-xi.vercel.app', 
    'http://localhost:5173'
  ],
  credentials: true
}));

app.use(express.json());

// ... your existing routes go here