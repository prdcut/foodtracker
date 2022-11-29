import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ApiService from '@/services/api.service';
import { IUser } from '@/models/model';
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

  get DATES() {
    return dates;
  }

  get username() {
    return localStorage.getItem('user')!.slice(1, -1);
  }

  get todayFoodDiary() {
    return this.filterFoodDiary(this.DATES.isoDates.getToday());
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
  filterFoodDiary(date: string) {
    if (this.userProfile)
      return this.userProfile.diary!.filter(
        (x) => x.type === 'food' && x.date === date
      );
    return [];
  }

  calcPercentage(a: number, b: number) {
    if (b === 0 || a == null) return '--';
    return ((100 * a) / b).toFixed();
  }

  async loadUser() {
    // console.log('loadUser');

    try {
      const data = await this.apiService.getUserData(this.username);

      if (data) {
        this.userProfile = data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  created() {
    this.loadUser();
  }
}
