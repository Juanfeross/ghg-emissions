export class DateFormatterUtil {
  static formatYear(year: number): string {
    return year.toString();
  }

  static isValidYear(year: number): boolean {
    return Number.isInteger(year) && year >= 1900 && year <= 2100;
  }
}

