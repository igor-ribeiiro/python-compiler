import { Nullable } from "../@types/base";
import { Dependency } from "./dependencies";
import PythonProcess, { ProcessStatus } from "./process";

export default class PythonExecutor {
  public dependencies: Dependency[] = [];
  private process: Nullable<PythonProcess> = null;

  public executeCode(code: string) {
    this.process = new PythonProcess(code).run();
  }

  get code(): string {
    return this.process !== null
      ? this.process.currentCode
      : "";
  }

  get stdout(): string {
    return this.process === null
      ? ""
      : this.process.stdout;
  }

  get status(): ProcessStatus {
    return this.process === null
      ? "empty"
      : this.process.status
  }

  get isRunning(): boolean {
    return this.process !== null && this.process.status === "running";
  }

  public updateCode(code: string): boolean {
    return this.process !== null && this.process.sendCode(code);
  }
}
