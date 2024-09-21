import express from "express";
import cors from "cors";
import morgan from "morgan";
require('dotenv').config()

import * as middleware from "./utils/middleware.js";
import user from './routes/user.js';

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

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected to database and listening on port, ', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error, "Username error maybe?")
    })

// custom middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
