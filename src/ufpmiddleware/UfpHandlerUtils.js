
export class ResultHandlerResult {
  constructor(success = false, handled = false, retry =false) {
    this.success = success;
    this.handled = handled;
    this.retry = retry;
  }
}

export class PreHandlerResult {
  constructor(breakVal = false, handled = false) {
    this.break = breakVal;
    this.handled = handled;
  }
}


