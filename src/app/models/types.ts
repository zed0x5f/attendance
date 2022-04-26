export interface Member {
  fullName: any;
  firstName: string;
  lastName: string;
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
