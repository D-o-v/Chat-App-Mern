import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; 

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMongoDb.js';

import { app ,server} from './socket/socket.js';

dotenv.config(); // Ensure environment variables are loaded

const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse incoming requests with JSON payloads
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/users', userRoutes);

// // Root route
// app.get('/', (req, res) => {
//     res.send('Hello World young man');
// });

server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`App listening on port ${PORT}`);
});
