class IntervalUtil {
  private static intervals: NodeJS.Timeout[] = [];

  static createInterval(callback: Function, time: number) {
    const interval = setInterval(() => {
      callback();
    }, time);

    this.intervals.push(interval);
  }

  static clearIntervals() {
    this.intervals.forEach((interval) => {
      clearInterval(interval);
    });
    this.intervals = [];
  }
}

export default IntervalUtil;
