import { LocalDate, DateTimeFormatter } from '@js-joda/core';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace dates {
  export class isoDates {
    static getToday() {
      return LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE);
    }

    static getDateString(d: any) {
      return new Date(d).toISOString().split('T')[0];
    }

    static getYesterday() {
      return LocalDate.now()
        .minusDays(1)
        .format(DateTimeFormatter.ISO_LOCAL_DATE);
    }
  }
}
