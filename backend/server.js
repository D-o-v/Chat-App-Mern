import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import friendsRoutes from './routes/friends.routes.js';

import connectToMongoDB from './db/connectToMongoDb.js';

import { app ,server} from './socket/socket.js';

dotenv.config(); // Ensure environment variables are loaded

const PORT = process.env.PORT || 5000;
//for deployment mode
const __dirname =path.resolve()

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);
app.use('/api/friends', friendsRoutes);

// Serve static assets in production
app.use(express.static(path.join(__dirname, '/frontend/dist')));


app.get('*',(req, res)=>{
    res.sendFile(path.join(__dirname, 'frontend','dist','index.html'))
});


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`App listening on port ${PORT}`);
});
