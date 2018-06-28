import { ChildProcess, spawn } from "child_process";
import { Nullable } from "../@types/base";


export type ProcessStatus = "waiting" | "running" | "stopped" | "empty";

export default class PythonProcess {
  public currentCode: string;
  public stdout: string = "";
  public status: ProcessStatus;
  private process: Nullable<ChildProcess>;

  constructor(initialCode: string) {
    this.currentCode = initialCode;
    this.process = null;
    this.status = "waiting";
  }

  public run() {
    this.process = spawn("python", [], {
      env: process.env,
      shell: true,
      uid: process.geteuid(),
    });

    this.setupProcess();
    this.sendCode(this.currentCode);

    this.status = "running";
    return this;
  }

  public sendCode(code: string): boolean {
    if (this.process === null) return false;

    this.process.stdin.write(code);
    this.process.stdin.end(() => {
      this.currentCode = code;
    });

    return true;
  }

  private setupProcess() {
    if (this.process === null) return;

    this.process.stdin.setDefaultEncoding("utf-8");
    this.process.stdout.setEncoding("utf-8");

    this.process.stdout.on("data", (data: Buffer | string) => {
      this.stdout += data.toString();
    });
    this.process.stderr.on("data", (data: Buffer | string) => {
      this.stdout += data.toString();
    });
    this.process.on("exit", () => {
      this.status = "stopped";
      this.stdout += `\n\nFinished processing at ${new Date().toLocaleString()}`;
    });
  }
}
