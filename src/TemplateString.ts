import 'ts-replace-all';
import { PlaceholderDelimiter } from './constants';
import { Placeholders, OptionalPlaceholders, FilledFString } from './types';

export default class TemplateString<S extends string> extends String {
  private static prefix = PlaceholderDelimiter.OPEN;
  private static suffix = PlaceholderDelimiter.CLOSE;

  constructor(string: S) {
    super(string);
  }

  private _fill(values: Record<string, string> | undefined): string {
    if (values === undefined) return String(this);

    let result = String(this);
    for (const [key, value] of Object.entries(values)) {
      const placeholder = `${TemplateString.prefix}${key}${TemplateString.suffix}`;
      // result = result.replaceAll(placeholder, value as string);
      while (result.includes(placeholder)) {
        result = result.replace(placeholder, value);
      }
    }
    return result;
  }

  public fill<P extends Placeholders<S>>(values: P): FilledFString<S, P> {
    return this._fill(values as Record<string, string>) as FilledFString<S, P>;
  }

  public fillSome<P extends OptionalPlaceholders<S>>(
    values: P
  ): TemplateString<FilledFString<S, P>> {
    return new TemplateString(
      this._fill(values as Record<string, string>)
    ) as TemplateString<FilledFString<S, P>>;
  }

  public getPlaceholders(): {
    [K in keyof Placeholders<S>]: `${PlaceholderDelimiter.OPEN}${K}${PlaceholderDelimiter.CLOSE}`;
  } {
    const result: Record<string, string> = {};
    let capturingPlaceholder = false;
    let currentId = '';
    for (let i = 0; i < this.length; i++) {
      const char = this[i];
      if (char === undefined) break;
      if (capturingPlaceholder) {
        if (
          this.slice(i, i + TemplateString.suffix.length) ===
          TemplateString.suffix
        ) {
          result[
            currentId
          ] = `${TemplateString.prefix}${currentId}${TemplateString.suffix}`;
          capturingPlaceholder = false;
          currentId = '';
          i += TemplateString.suffix.length - 1;
          continue;
        } else {
          currentId += char;
          continue;
        }
      } else {
        if (
          this.slice(i, i + TemplateString.prefix.length) ===
          TemplateString.prefix
        ) {
          capturingPlaceholder = true;
          i += TemplateString.prefix.length - 1;
          continue;
        } else continue;
      }
    }
    return result as any;
  }

  public hasPlaceholders(): boolean {
    return Object.keys(this.getPlaceholders()).length !== 0;
  }
}
