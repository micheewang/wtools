import removeArrayItem from "./removeArrayItem";

type Event = {
  [K: string]: (...args: any[]) => void;
};

type Store<T extends keyof any, H> = {
  [K in T]?: H[];
};

export default class EventEmitter<T extends Event> {
  private __store: Store<keyof T, T[keyof T]> = {};
  private __keyStore = new Map<symbol, { name: keyof T; handle: T[keyof T] }>();

  /**
   * Listen to the a event
   */
  public on(name: keyof T, handle: T[keyof T]) {
    this.__store[name] ??= [];
    this.__store[name]!.push(handle);
    const key = Symbol();
    this.__keyStore.set(key, { name, handle });

    return key;
  }

  /**
   * Listen to the a event, but only execute it once
   */
  public once(name: keyof T, handle: T[keyof T]) {
    const flag = this.on(name, ((...args) => {
      this.off(flag);
      handle(...args);
    }) as T[keyof T]);
  }

  /**
   * Listen to the a event, but only execute it once
   */
  public off(key: symbol) {
    const event = this.__keyStore.get(key);
    if (!event) return;

    const { name, handle } = event;
    this.__store[name] = removeArrayItem(this.__store[name] ?? [], handle);
  }

  /**
   * trigger event
   */
  public emit(name: T, ...args: Parameters<T[keyof T]>) {
    this.__store[name]?.forEach((handle) => handle(...args));
  }
}
