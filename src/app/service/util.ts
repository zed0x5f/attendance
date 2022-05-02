import { DateKey } from '../models/types';
/**
 * There are many arguments on the interwebs on how this should be setup
 *
 */
export class Util {
  static clone(data: any) {
    return JSON.parse(JSON.stringify(data));
  }

  /**
   * used for creating the ability to download a csv file
   *
   * @export
   * @param {string[][]} data
   * @returns
   */
  static convertArrayToEncodedUri(dataRef: string[][]) {
    let data: string[][] = Util.clone(dataRef); //clone
    let csvContent =
      'data:text/csv;charset=utf-8,' + data.map((e) => e.join(',')).join('\n');
    let encodedUri = encodeURI(csvContent);
    return encodedUri;
  }

  /**
   * function to create dateKey from date
   *
   * @export
   * @param {Date} date
   * @returns {DateKey}
   */
  static getYYYY_MM_DD(date: Date): DateKey {
    //chad way to write this code
    let [year, month, day] = [
      date.getUTCFullYear(),
      date.getUTCMonth() + 1, //starts at 0
      date.getUTCDate(),
    ].map((number) => String(number));
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  static throwError(error: any) {
    throw error;
  }
}
