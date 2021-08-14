import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import vaccRoutes from './routes/vaccinations.js';

const app = express();
dotenv.config();

app.use(express.json({
	limit: "30mb",
	extended: true
}));
app.use(express.urlencoded({
	limit: "30mb",
	extended: true
}));
app.use(cors());

// Connect db to app using express middleware
app.use('/vaccinations', vaccRoutes);

// Connect to MongoDB Atlas
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() =>  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
	.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);
