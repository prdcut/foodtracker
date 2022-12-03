import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ApiService from '@/services/api.service';
import { IUser, IFood } from '@/models/model';
import { dates } from '@/libs/dates';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class DashboardBaseComponent extends Vue {
  protected apiService: ApiService = new ApiService();
  protected loading = false;
  protected userProfile: Partial<IUser> | null = null;
  protected foodItem: IFood | null = null;

  get DATES() {
    return dates;
  }

  get username() {
    return localStorage.getItem('user')!.slice(1, -1);
  }

  validationState({
    dirty,
    validated,
    valid,
  }: {
    dirty: boolean;
    validated: boolean;
    valid: boolean;
  }) {
    return dirty || validated ? valid : null;
  }

  filterFoodDiary(diaryMeal: string) {
    if (this.userProfile)
      return this.userProfile
        .diary!.filter(
          (x) => x.type === 'food' && x.date === this.DATES.isoDates.getToday()
        )
        .filter((x) => x.diaryMeal === diaryMeal);
    return null;
  }

  async createFoodDiaryEntry(
    meal: string,
    foodName: string,
    foodWeight: number,
    foodQuantity: string | number,
    protein: number,
    carbs: number,
    fat: number,
    calories: number
  ) {
    // console.log('createFoodDiaryEntry');

    const dateOut = this.DATES.isoDates.getToday();

    this.loading = true;

    try {
      const data = await this.apiService.postDiaryEntry(this.username, {
        type: 'food',
        date: dateOut,
        diaryMeal: meal,
        diaryFoodName: foodName,
        diaryFoodWeight: foodWeight,
        diaryFoodQuantity: foodQuantity,
        diaryProtein: protein,
        diaryCarbs: carbs,
        diaryFat: fat,
        diaryCalories: calories,
      });

      if (data) {
        this.userProfile = data;
      }
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }

  async loadFoodItem(name: string) {
    // console.log('loadFoodItem', name);

    try {
      const data = await this.apiService.getFoodItem(name);

      if (data) {
        this.foodItem = data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async loadUser() {
    // console.log('loadUser');

    this.loading = true;

    try {
      const data = await this.apiService.getUserData(this.username);

      if (data) {
        this.userProfile = data;
      }
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }

  created() {
    // console.log('created');
    this.loadUser();
  }
}
