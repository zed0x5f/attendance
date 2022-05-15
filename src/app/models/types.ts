/*
RED Anaphylaxis
blue Shellfish/Seafood
hot pink Celiac
black dairy free
brown nut allergy
Orange Vegan
Green Vegitarian
Gray Gluten Free
Yellow Egg Free
Purple Fruit (Tomato, Avocado, Peaches)/ Veggie (Egg plant,onions)
Pink Cinnamon, Other spices

*/
enum DC {
  ANAPHYLAXIS = 'ANAPHYLAXIS',
  SHELLFISH_SEAFOOD = 'SHELLFISH_SEAFOOD',
  CELIAC = 'CELIAC',
  DAIRY_FREE = 'DAIRY_FREE',
  VEGAN = 'VEGAN',
  GLUTEN_FREE = 'GLUTEN_FREE',
  EGG_FREE = 'EGG_FREE',
  FRUIT = 'FRUIT', //purple ??
  SPICE = 'SPICE',
}

export class DiectCode {
  static readonly ANAPHYLAXIS = new DiectCode(
    DC.ANAPHYLAXIS,
    'Have an epipen on hand',
    '#ff0000' //red
  );
  static readonly SHELLFISH_SEAFOOD = new DiectCode(
    DC.SHELLFISH_SEAFOOD,
    'No SeaFood No Shellfish',
    '#0000ff' //blue
  );
  static readonly CELIAC = new DiectCode(
    DC.CELIAC,
    'No Gluten gf',
    '#FF69B4' //hot pink
  );
  static readonly DAIRY_FREE = new DiectCode(
    DC.DAIRY_FREE,
    'No Dairy df',
    '#ffffff' //black
  );

  static readonly VEGAN = new DiectCode(
    DC.VEGAN,
    'Vegan too weak to eat meat',
    '#FFA500' //orange
  );

  static readonly GLUTEN_FREE = new DiectCode(
    DC.GLUTEN_FREE,
    'Bread less',
    '#00FF00' //green
  );

  static readonly EGG_FREE = new DiectCode(
    DC.EGG_FREE,
    'No Egg',
    '#FFFF00' //yellow
  );

  static readonly FRUIT = new DiectCode(
    DC.FRUIT,
    ' Fruit (Tomato, Avocado, Peaches)/ Veggie (Egg plant,onions)',
    '#FFA500'
  );

  static readonly SPICE = new DiectCode(
    DC.SPICE,
    ' Fruit (Tomato, Avocado, Peaches)/ Veggie (Egg plant,onions)',
    '#FFA500'
  );

  private constructor(
    private readonly key: string,
    public readonly desc: string,
    public readonly color: string
  ) {}

  toString() {
    return this.key;
  }
}

export interface DietaryRestrion {
  ANAPHYLAXIS?: Boolean;
  SHELLFISH_SEAFOOD?: Boolean;
  CELIAC?: Boolean;
  DAIRY_FREE?: Boolean;
  VEGAN?: Boolean;
  GLUTEN_FREE?: Boolean;
  EGG_FREE?: Boolean;
  FRUIT?: Boolean; //purple ??
  SPICE?: Boolean;
  notes?: string; //some other custom restriction
}

//top level interface
export interface Member {
  pin?: string;
  key?: string;
  fullName?: string;
  status?: string;
  firstName: string;
  lastName: string;
  personType: string;
  dietaryRestrions?: DietaryRestrion;
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

export type MemberId = `${string}`;

//year month day
const DateKeyRegex = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;

export interface MemberListOfTimeStamps {
  [key: MemberId]: FireBaseListDict<number>;
}

/**
 * top level interface
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
export type Checkin = {
  [key: DateKey]: MemberListOfTimeStamps;
};

export type Reservations = {
  [key: DateKey]: {
    [key: MemberId]: {
      b: number;
      l: number;
      d: number;
    };
  };
};

//todo rename
export interface Foo {
  auth: any;
  currentUser: any;
}
