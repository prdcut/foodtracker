import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ApiService from '@/services/api.service';
import { IFood, IFoods, Paginate, Food } from '@/models/model';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class DashboardBaseComponent extends Vue {
  protected apiService: ApiService;
  protected loading: boolean;

  protected currPage: Paginate;
  protected filter: string | null;
  protected filterOn: [];

  protected foodList: IFoods;
  protected foodItem: IFood;
  protected newFoodItem: IFood;

  protected editFoodItemModal = {
    id: 'editFoodItemModal',
    title: '',
    content: {},
  };

  constructor() {
    super();

    this.apiService = new ApiService();
    this.loading = false;

    this.currPage = new Paginate({ limit: 5 });
    this.filter = null;
    this.filterOn = [];

    this.foodList = [];
    this.foodItem = new Food();
    this.newFoodItem = new Food();
  }

  get tableColumns() {
    return [
      {
        key: 'name',
        label: 'Name',
        sortable: true,
      },
      {
        key: 'weight',
        label: 'Weight',
      },
      // {
      //   key: 'quantity',
      //   label: 'Quantity',
      // },
      {
        key: 'calories',
        label: 'Calories',
        sortable: true,
      },
      {
        key: 'protein',
        label: 'Protein',
        sortable: true,
      },
      {
        key: 'carbs',
        label: 'Carbs',
        sortable: true,
      },
      {
        key: 'fat',
        label: 'Fat',
        sortable: true,
      },
      {
        key: 'actions',
        label: 'Edit',
      },
    ];
  }

  get foodItemToEdit() {
    return this.editFoodItemModal.content;
  }

  get username() {
    return localStorage.getItem('user')!.slice(1, -1);
  }

  editFoodItem(item: any, index: any, button: any) {
    this.editFoodItemModal.title = `Row index: ${index}`;
    this.editFoodItemModal.content = item;
    this.$root.$emit('bv::show::modal', this.editFoodItemModal.id, button);
  }

  onFiltered(filteredFoodItems: string | any[]) {
    this.currPage.total = filteredFoodItems.length;
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

  buildFoodItem(modal: string) {
    this.foodItem = new Food();

    this.$nextTick(() => {
      this.$bvModal.show(modal);
    });
  }

  cancelFoodItemToEdit() {
    this.$bvModal.hide('editFoodItemModal');
  }

  async loadFoodList() {
    // console.log('loadFoodList');

    this.loading = true;

    try {
      const data = await this.apiService.getFoodList();

      if (data) {
        this.foodList = data;
        this.currPage.total = this.foodList.length;
      }
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }

  async createFoodItem() {
    // console.log('createFoodItem', this.newFoodItem);

    this.loading = true;

    try {
      const data = await this.apiService.postFoodItem(this.newFoodItem);

      if (data) {
        this.newFoodItem = data;
        this.$bvToast.toast('New food created!', {
          variant: 'info',
          solid: true,
          autoHideDelay: 3500,
          noCloseButton: true,
        });
        this.$bvModal.hide('newFoodModal');
        this.$router.go(0);
      }
    } catch (error) {
      console.log(error);
      this.$bvToast.toast('Something went wrong!', {
        variant: 'danger',
        solid: true,
        autoHideDelay: 3500,
        noCloseButton: true,
      });
    }

    this.loading = false;
  }

  async updateFoodItem(food: Partial<IFood>) {
    console.log('updateFoodItem', food);

    this.loading = true;

    try {
      const data: Partial<IFood> = await this.apiService.putFoodItem(
        this.foodItemToEdit
      );

      if (data) {
        this.foodItem = data;
        this.$bvToast.toast('Food updated!', {
          variant: 'info',
          solid: true,
          autoHideDelay: 3500,
          noCloseButton: true,
        });
        this.$bvModal.hide('editFoodItemModal');
      }
    } catch (error) {
      console.log(error);
      this.$bvToast.toast('Something went wrong!', {
        variant: 'danger',
        solid: true,
        autoHideDelay: 3500,
        noCloseButton: true,
      });
    }

    this.loading = false;
  }

  async deleteFoodItem(name: string) {
    console.log('deleteFoodItem', name);

    this.loading = true;

    try {
      const data = await this.apiService.deleteFoodItem(name);

      if (data) {
        this.$bvToast.toast('Food deleted!', {
          variant: 'info',
          solid: true,
          autoHideDelay: 3500,
          noCloseButton: true,
        });
      }
    } catch (error) {
      console.log(error);
      this.$bvToast.toast('Something went wrong!', {
        variant: 'danger',
        solid: true,
        autoHideDelay: 3500,
        noCloseButton: true,
      });
    }

    this.loading = false;
  }

  created() {
    this.loadFoodList();
  }
}
