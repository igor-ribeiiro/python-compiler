import * as compression from "compression";
import * as express from "express";
import * as morgan from "morgan";

import ExecutorRouter from "./routes/executor";

const server = express();
const execRouter = new ExecutorRouter();


server
  .use(morgan("dev"))
  .use(compression({ level: 8 }))
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use("/api", execRouter.router);


const PORT = 8080;
server.listen(PORT, () =>
  console.log(`Listening on port ${PORT}...`));
