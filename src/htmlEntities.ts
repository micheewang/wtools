import type from "./type";

class HtmlEntities {
  private __cache: Record<string, string> = {
    nbsp: " ",
    cent: "¢",
    pound: "£",
    yen: "¥",
    euro: "€",
    copy: "©",
    reg: "®",
    lt: "<",
    gt: ">",
    quot: '"',
    amp: "&",
    apos: "'",
  };

  private __div: HTMLDivElement | null = null;

  private readonly __htmlEntites = /&(#(\d+)|#x([\da-fA-F]+)|\w+);?/;

  decode(t: string) {
    this.__div ??= document.createElement("div");

    return t.replace(this.__htmlEntites, ($1, $2, $3, $4) => {
      if (this.__cache[$1]) {
        return this.__cache[$1];
      }

      let char = "";
      if ($4) {
        char = String.fromCharCode(parseInt($4, 16));
      } else if ($3) {
        char = String.fromCharCode(parseInt($3, 10));
      } else {
        this.__div!.innerHTML = $1;
        char = this.__div!.innerText;
      }

      this.__cache[$1] = char;
      return char;
    });
  }

  decodeProps<T>(value: T): T {
    if (type.isString(value)) {
      return this.decode(value) as T;
    }
    if (type.isArray(value)) {
      return value.map((value) => this.decodeProps(value)) as T;
    }
    if (type.isObject(value)) {
      return Object.entries(value).reduce((previous, [k, v]) => {
        previous[k as keyof T] = this.decodeProps(v);
        return previous;
      }, {} as T);
    }
    return value;
  }

  encode(t: any) {
    if (type(t) !== "string") {
      return t;
    }
    return (t as string).replace(/[^\w\d]/g, ($1) => {
      return `&#${$1.charCodeAt(0)};`;
    });
  }
}

export default new HtmlEntities();
