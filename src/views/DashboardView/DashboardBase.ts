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
