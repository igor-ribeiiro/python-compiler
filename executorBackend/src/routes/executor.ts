import { Router } from "express";
import {
  checkDependencies,
  installDependencies,
  isDependency
} from "../lib/dependencies";
import PythonExecutor from "../lib/executor";

const executorRouter = Router();
const executor = new PythonExecutor();

executorRouter.post("/execute", (req, res) => {
  const code = req.body.code;

  if (typeof code !== "string")
    return res.status(400).send();
  else if (executor.isRunning)
    return executor.updateCode(code)
      ? res.send()
      : res.status(403).send;
  else {
    executor.executeCode(code);

    return res.status(201).send();
  }
});

executorRouter.get("/stdout", (_, res) =>
  res.send(executor.stdout)
);

executorRouter.get("/code", (_, res) =>
  res.send(executor.code)
);

executorRouter.get("/status", (_, res) =>
  res.send(executor.status)
);

executorRouter.post("/dependencies", (req, res) => {
  const dependencies = req.body.dependencies;

  if (!Array.isArray(dependencies) || !dependencies.every(isDependency))
    return res.status(400).send();

  return checkDependencies(dependencies)
    .catch(ins => res.status(400).send(ins))
    .then(ds => {
      res.send();
      return ds;
    })
    .then((ds) =>
      Array.isArray(ds)
        ? installDependencies(ds)
        : {});

});


export default executorRouter;
