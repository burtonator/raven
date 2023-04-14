
/**
 * An ISO Date with a Time with millisecond resolution
 */
export type ISODateTimeString = string;

export type DateLike = Date | number | string;

export namespace ISODateTimeStrings {

  export function create(value?: DateLike): ISODateTimeString {

    let date: Date | undefined;

    if (value !== undefined) {

      if (value instanceof Date) {
        date = value;
      }

      if (typeof value === 'number') {
        date = new Date(value);
      }

      if (typeof value === 'string') {
        date = new Date(value);
      }

    }

    if (!date) {
      date = new Date();
    }

    return date.toISOString();
  }

}

