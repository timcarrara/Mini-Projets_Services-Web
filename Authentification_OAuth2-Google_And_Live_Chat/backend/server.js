require('dotenv').config({ path: __dirname + '/.env' });
console.log('=== DÉMARRAGE DU SERVEUR ===');
console.log('Environment Variables:', {
  GOOGLE_CLIENT_ID: !!process.env.GOOGLE_CLIENT_ID,
  REDIS_URL: !!process.env.REDIS_URL,
  FRONTEND_URL: !!process.env.FRONTEND_URL,
  PORT: process.env.PORT || 3000
});

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const connectDB = require('./config/db');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Message = require('./models/Message');

// Initialisation de l'application
const app = express();
const httpServer = createServer(app);

const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

// Configuration Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log(`Nouvel utilisateur connecté: ${socket.id}`);

  socket.join('general');

  socket.on('sendMessage', async (data) => {
    try {
      const message = new Message({
        content: data.content,
        sender: data.userId,
        timestamp: new Date()
      });
      await message.save();

      io.to('general').emit('newMessage', {
        _id: message._id,
        content: message.content,
        sender: {
          _id: data.userId,
          displayName: data.displayName,
          avatar: data.avatar
        },
        timestamp: message.timestamp
      });
    } catch (err) {
      console.error('Erreur sauvegarde message:', err);
    }
  });


  socket.on('disconnect', () => {
    console.log(`Utilisateur déconnecté: ${socket.id}`);
  });
});

async function setupSessionStore() {
  try {
    const { createClient } = require('redis');
    const RedisStore = require('connect-redis').default;
    
    const redisClient = createClient({
      url: process.env.REDIS_URL || 'redis://localhost:6379'
    });

    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    await redisClient.connect();
    console.log('Connected to Redis');

    return new RedisStore({
      client: redisClient,
      prefix: 'session:'
    });
  } catch (err) {
    console.log('Using memory store - Redis unavailable:', err.message);
    return new session.MemoryStore();
  }
}

async function startServer() {
  await connectDB();

  require('./config/passport');

  const redisStore = await setupSessionStore();

  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
  }));
  app.use(express.json());

  app.use(session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/ping', (req, res) => {
    console.log('Ping reçu !');
    res.json({ 
      status: 'ok',
      session: req.sessionID,
      user: req.user || 'non authentifié'
    });
  });

  const cacheTestRoutes = require('./routes/cacheTest');
  app.use('/api/cache', cacheTestRoutes);

  const authRoutes = require('./routes/authRoutes');
  app.use('/auth', authRoutes);
  
  const PORT = process.env.PORT || 3000;
  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`
    ======================
    🚀 Server running on:
    http://localhost:${PORT}
    ======================
    `);
    console.log('Endpoints disponibles:');
    console.log(`- http://localhost:${PORT}/ping`);
    console.log(`- http://localhost:${PORT}/auth/google`);
    console.log(`- http://localhost:${PORT}/auth/github`);
  }).on('error', (err) => {
    console.error('❌ Erreur de démarrage:', err);
    if (err.code === 'EADDRINUSE') {
      console.log('Utilisez: netstat -ano | findstr :3000');
    }
  });
}

startServer().catch(err => {
  console.error('Server startup error:', err);
  process.exit(1);
});