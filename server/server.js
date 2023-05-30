import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import corsOptions from './config/corsOptions.js';
import { logger } from './middleware/logEvents.js';
import errorHandler from './middleware/errorHandler.js';
import credentials from './middleware/credentials.js';
import connectDB from './config/dbConn.js';
import authRouter from './routes/authRoutes.js';
import registerRouter from './routes/registerRoutes.js';
import titleRouter from './routes/titleRoutes.js';
import consumableRouter from './routes/consumableRoutes.js';
import storeRouter from './routes/storeRoutes.js';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//for images
app.use('/images', express.static('images'));

// routes
app.use('/auth', authRouter);
app.use('/register', registerRouter);
app.use('/titles', titleRouter);
app.use('/consumable', consumableRouter);
app.use('/store', storeRouter);

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});