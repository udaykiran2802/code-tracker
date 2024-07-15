require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./utils/db');
const authRouter = require('./routes/auth-route');
const problemRouter = require('./routes/problem-routes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS options
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Mount the routers
app.use('/api/auth', authRouter);
app.use('/api/problems', problemRouter);

// Start the server after connecting to the database
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to the database', err);
});
