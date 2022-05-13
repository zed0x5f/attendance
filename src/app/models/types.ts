export interface Member {
  pin?: string;
  key?: string;
  fullName?: any;
  firstName: string;
  lastName: string;
  personType:string;
  //todo store score here
}

/**
 * When calling a list from firebase it will return
 * a json object with keys as the ids in said object
 * eg.
 * {
 * -Mjlakshdf:({...}:T),
 * -Mfffbbccc:({...}:T),
 * ...
 * }
 * @export
 * @interface FireBaseListDict
 */
export interface FireBaseListDict<T> {
  [key: string]: T;
}

//year month day
export type DateKey = `${string}-${string}-${string}`;

/**
 * generated from Date getTime()
 * milliseconds
 * @exports
 * @type ms
 */
export type ms = `${number}`;

//year month day
const DateKeyRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

export interface memberListOfTimeStamps {
  [key: string]: FireBaseListDict<number>;
}

/**
 *
 * checkin
 *  2022-04-19
 *    11468
 *      -N02Jy6-ObLnWUVZX5Sj:1650397013100
 *
 * checkin
 *   dateKey
 *       memberid
 *           key:timestamp
 * @export
 * @interface checkin
 */
export type checkin = {
  [key: DateKey]: memberListOfTimeStamps;
};

export interface Foo {
  auth:any,
  currentUser:any
}
