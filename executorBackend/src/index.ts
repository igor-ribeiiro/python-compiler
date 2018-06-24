import * as compression from "compression";
import * as express from "express";
import * as morgan from "morgan";

import executorRouter from "./routes/executor";

const server = express();


server
  .use(morgan("dev"))
  .use(compression({ level: 8 }))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/api", executorRouter);


const PORT = 8080;
server.listen(PORT, () =>
  console.log(`Listening on port ${PORT}...`));
