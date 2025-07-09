// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "https://wasif-buildtech.onrender.com", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
// Serve static frontend files from root directory
app.use(express.static(path.join(__dirname, '..')));

// Import Routes
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');

// Use Routes
app.use('/api/contact', contactRoutes); // contact form submits
app.use('/api/admin', adminRoutes);     // employee + message mgmt
app.use('/api/auth', authRoutes);       // admin login
// Handle frontend routes only (excluding API paths)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});

