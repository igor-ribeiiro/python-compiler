import { Request, Response, Router } from "express";
import {
  checkDependencies,
  installDependencies,
  isDependency
} from "../lib/dependencies";
import * as HttpStatus from "http-status-codes";

import PythonExecutor from "../lib/executor";


export default class ExecutorRouter {
  public readonly router: Router = Router();
  private executors: Map<string, PythonExecutor> = new Map();

  constructor() {
    this.router.post("/execute", (req, res) => this.executeCode(req, res));
    this.router.get("/stdout", (req, res) => this.sendStdout(req, res));
    this.router.get("/code", (req, res) => this.sendCode(req, res));
    this.router.get("/status", (req, res) => this.sendStatus(req, res));
    this.router.post("/dependencies", (req, res) => this.installDependencies(req, res));
  };

  private executeCode(req: Request, res: Response): Response {
    const code = req.body.code;
    const id = req.body.id;

    if (typeof code !== "string" || typeof id !== "string")
      return res.status(HttpStatus.BAD_REQUEST).send();

    const executor = this.getExecutor(id);

    if (executor.isRunning)
      return executor.updateCode(code)
        ? res.send()
        : res.status(HttpStatus.FORBIDDEN).send();
    else
      executor.executeCode(code);

    return res.status(HttpStatus.CREATED).send();
  }

  private sendStdout(req: Request, res: Response): Response {
    const id = req.query.id;

    if (typeof id !== "string")
      return res.status(HttpStatus.BAD_REQUEST).send();

    const stdout = this.getExecutor(id).stdout;

    return res.send(stdout);
  }

  private sendCode(req: Request, res: Response): Response {
    const id = req.query.id;

    if (typeof id !== "string")
      return res.status(HttpStatus.BAD_REQUEST).send();

    const code = this.getExecutor(id).code;

    return res.send(code);
  }

  private sendStatus(req: Request, res: Response): Response {
    const id = req.query.id;

    if (typeof id !== "string")
      return res.status(HttpStatus.BAD_REQUEST).send();

    const status = this.getExecutor(id).status;

    return res.send(status);
  }

  private installDependencies(req: Request, res: Response) {
    const dependencies = req.body.dependencies;

    if (!Array.isArray(dependencies) || !dependencies.every(isDependency))
      return res.status(HttpStatus.BAD_REQUEST).send();

    return checkDependencies(dependencies)
      .catch(ins => res.status(HttpStatus.BAD_REQUEST).send(ins))
      .then(ds => {
        res.send({ dependencies: ds });
        return ds;
      })
      .then((ds) =>
        Array.isArray(ds)
          ? installDependencies(ds)
          : {});

  }

  private getExecutor(id: string): PythonExecutor {
    if (!this.executors.has(id))
      this.executors.set(id, new PythonExecutor());

     // We can safely assume at this point that we have this id in the Map.
     return this.executors.get(id)!;
  }
}
