export interface IUser {
  username?: string;
  password?: string;
  email?: string;
  birthdate?: Date | string;
  sex?: string;
  height?: number | null;
  currentWeight?: number | null;
  goalWeight?: number | null;
  macros?: IMacros | null;
  diary?: IDiaryEntry | null;
}

export class User implements IUser {
  public username?: string;
  public password?: string;
  public email?: string;
  public birthdate?: Date | string;
  public sex?: string;
  public height?: number | null;
  public currentWeight?: number | null;
  public goalWeight?: number | null;
  public macros?: IMacros | null;
  public diary?: IDiaryEntry | null;

  constructor(user?: User) {
    this.username = user?.username || '';
    this.password = user?.password || '';
    this.email = user?.email || '';
    this.birthdate = user?.birthdate || '';
    this.sex = user?.sex || '';
    this.height = user?.height || null;
    this.currentWeight = user?.currentWeight || null;
    this.goalWeight = user?.goalWeight || null;
    this.macros = user?.macros || null;
    this.diary = user?.diary || null;
  }
}

export interface IDiaryEntry {
  type: string;
  date: string;
  weightValue?: number | null;
  diaryMeal?: string;
  nutritionalCont?: IMacros | null;
}

export class DiaryEntry implements IDiaryEntry {
  public type: string;
  public date: string;
  public weightValue?: number | null;
  public diaryMeal?: string;
  public nutritionalCont?: IMacros | null;

  constructor(diaryEntry?: DiaryEntry) {
    this.type = diaryEntry?.type || '';
    this.date = diaryEntry?.date || '';
    this.weightValue = diaryEntry?.weightValue || null;
    this.diaryMeal = diaryEntry?.diaryMeal || '';
    this.nutritionalCont = diaryEntry?.nutritionalCont || null;
  }
}

export interface IMacros {
  protein: number | null;
  carbs: number | null;
  fat: number | null;
  calories: number | null;
}

export class Macros implements IMacros {
  public protein: number | null;
  public carbs: number | null;
  public fat: number | null;
  public calories: number | null;

  constructor(macros?: Macros) {
    this.protein = macros?.protein || null;
    this.carbs = macros?.carbs || null;
    this.fat = macros?.fat || null;
    this.calories = macros?.calories || null;
  }
}

export interface IFood {
  _id?: any;
  name?: string;
  weight?: number | null;
  quantity?: number | null;
  protein?: number | null;
  carbs?: number | null;
  fat?: number | null;
  calories?: number | null;
}

export interface IFoods extends Array<IFood> {
  [index: number]: IFood;
}

export class Food implements IFood {
  public _id?: string;
  public name?: string;
  public weight?: number | null;
  public quantity?: number | null;
  public protein?: number | null;
  public carbs?: number | null;
  public fat?: number | null;
  public calories?: number | null;

  constructor(food?: Food) {
    this._id = food?._id || '';
    this.name = food?.name || '';
    this.weight = food?.weight || null;
    this.quantity = food?.quantity || null;
    this.protein = food?.protein || null;
    this.carbs = food?.carbs || null;
    this.fat = food?.fat || null;
    this.calories = food?.calories || null;
  }

  static toFoodApi(food: Food): IFood {
    const newFood: IFood = {
      ...food,
    };
    return newFood;
  }
}

export interface IPage {
  offset: number;
  limit: number;
  total?: number;
}

export class Paginate implements IPage {
  public limit = 5;
  public offset = 0;
  public total = 0;

  constructor(page: Partial<IPage>) {
    this.limit = page?.limit || 5;
    this.offset = page?.offset || 0;
    this.total = page?.total || 0;
  }
}
