export default class StrictDate {
  private __date: Date;

  constructor() {
    this.__date = new Date();
  }

  public isDST() {
    const date = new Date();
    const currentTimezoneOffset = date.getTimezoneOffset();

    date.setMonth(6);
    date.setDate(1);
    const dstTimezoneOffset = date.getTimezoneOffset();

    return dstTimezoneOffset !== currentTimezoneOffset;
  }

  public getYear() {}
  public getMonth() {}
  public getDay() {}
  public getHours() {}
  public getMinutes() {}
  public getSeconds() {}

  public getTimezoneOffset() {}

  public format() {}
  public valueOf() {}
  public toString() {}
  public toDate() {}
  public toUTCString() {}
}
