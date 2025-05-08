const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const dotenv = require('dotenv').config();
const cors = require('cors');
const { sendEta } = require('./service');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 5001;

let busLocations = {}; 

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.render('index'); 
});

app.get('/login', (req, res) => {
  res.render('login'); 
});

app.post('/dashboard', (req, res) => {
  const busNumber = req.body.busNumber;
  res.render('dashboard', { busNumber });
});

app.get('/studentdashboard', (req, res) => {
  res.render('student_dashboard');
});

// Estimated Time of Arrival (ETA) generator
const generateEta = () => {
  const minutes = Math.floor(Math.random() * 10) + 1; // Random ETA between 1-10 minutes
  return `Your bus will arrive in ${minutes} minutes.`;
};

app.post("/send", async (req, res) => {
  const { email } = req.body;
  if (!email) {
      return res.status(400).json({ msg: "Email is required" });
  }
  const etaMessage = generateEta();
  try {
      await sendEta(email, etaMessage);
      return res.status(200).json({ msg: "Mail sent" });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Failed to send mail" });
  }
});


// Socket.IO connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.on('locationUpdate', (data) => {
    busLocations[data.busNumber] = { lat: data.lat, lon: data.lon };
    io.emit('updateMap', busLocations); 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
