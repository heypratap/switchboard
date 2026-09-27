import type { FileWriteAction } from "./types.js";

export class ActionTracker {
  private actions: FileWriteAction[] = [];

  add(action: FileWriteAction) {
    this.actions.push(action);
  }

  getActions(): FileWriteAction[] {
    return [...this.actions];
  }

  clear() {
    this.actions = [];
  }
}