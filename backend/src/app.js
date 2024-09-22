import express from "express";
import cors from "cors";
import morgan from "morgan";
const api = express.Router();
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();

import * as middleware from "./utils/middleware.js";
import user from './routes/user.js';
import question from './routes/question.js'
import results from './routes/results.js'
import game from './routes/game.js'

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})
app.use(cors());

// request logger middleware
app.use(morgan("tiny"));

// healthcheck endpoint
app.get("/", (req, res) => {
  res.status(200).send({ status: "ok" });
});

//Will set up these routes
app.use('/api/user', user)
app.use('/api/question', question)
app.use('/api/game', game)
api.use('/api/results', results)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to database and listening on port, ', 3003)
        })
    })
    .catch((error) => {
        console.log(error, "Username error maybe?")
    })

// custom middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
