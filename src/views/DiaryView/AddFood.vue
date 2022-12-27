<template>
  <div>
    <b-modal
      :id="addFoodModalId"
      footer-border-variant="white"
      header-border-variant="white"
      hide-footer
      scrollable
      no-stacking
    >
      <template #modal-header="{ close }">
        <h4>{{ title }}</h4>

        <b-button size="sm" variant="link" @click="close()">
          <unicon name="times" />
        </b-button>
      </template>

      <b-tabs justified small>
        <b-tab active>
          <template #title>
            <h6 class="mb-0">Food List</h6>
          </template>

          <template v-if="loading">
            <div class="d-flex">
              <b-spinner
                variant="primary"
                style="width: 3rem; height: 3rem"
                class="mx-auto"
              />
            </div>
          </template>

          <template v-else>
            <b-card-group deck class="d-flex flex-wrap">
              <b-card
                no-body
                class="p-2 mt-3 mx-auto"
                border-variant="primary"
                v-for="(food, index) in foodList"
                :key="index"
                style="width: 45%"
              >
                <div class="d-flex">
                  <div>
                    <h6 class="mb-0">{{ food.name }}</h6>
                    <p class="mb-0 text-muted">
                      {{ food.calories }}cal, {{ food.quantity }}
                    </p>
                  </div>
                  <div class="ms-auto my-auto">
                    <b-button
                      v-b-modal="foodItemModalId"
                      variant="link"
                      class="p-0"
                      @click="loadFoodItem(food.name)"
                    >
                      <unicon name="plus-circle" />
                    </b-button>
                  </div>
                </div>
              </b-card>
            </b-card-group>
          </template>
        </b-tab>

        <b-tab>
          <template #title>
            <h6 class="mb-0">Meals</h6>
          </template>
          <b-row class="d-flex">
            <h6 class="mb-0 mt-3">Yesterday's {{ title }}</h6>
            <template v-if="yesterdayBreakfast && title === 'breakfast'">
              <b-card
                no-body
                class="p-2 mt-3 mx-auto"
                border-variant="primary"
                v-for="(food, index) in yesterdayBreakfast"
                :key="index"
                style="width: 45%"
              >
                <div class="d-flex">
                  <div>
                    <h6 class="mb-0">{{ food.nutritionalCont.name }}</h6>
                    <p class="mb-0 text-muted">
                      {{ food.nutritionalCont.calories }} cal
                    </p>
                  </div>
                  <div class="ms-auto my-auto">
                    {{ food.nutritionalCont.weight }} g
                  </div>
                </div>
              </b-card>
              <b-button
                size="sm"
                variant="secondary"
                class="mx-auto mt-3 text-light w-50"
                @click="addYesterdaysMeal(yesterdayBreakfast)"
              >
                Add
              </b-button>
            </template>

            <template v-if="yesterdayLunch && title === 'lunch'">
              <b-card
                no-body
                class="p-2 mt-3 mx-auto"
                border-variant="primary"
                v-for="(food, index) in yesterdayLunch"
                :key="index"
                style="width: 45%"
              >
                <div class="d-flex">
                  <div>
                    <h6 class="mb-0">{{ food.nutritionalCont.name }}</h6>
                    <p class="mb-0 text-muted">
                      {{ food.nutritionalCont.calories }} cal
                    </p>
                  </div>
                  <div class="ms-auto my-auto">
                    {{ food.nutritionalCont.weight }} g
                  </div>
                </div>
              </b-card>
              <b-button
                size="sm"
                variant="secondary"
                class="mx-auto mt-3 text-light w-50"
                @click="addYesterdaysMeal(yesterdayLunch)"
              >
                Add
              </b-button>
            </template>

            <template v-if="yesterdayDinner && title === 'dinner'">
              <b-card
                no-body
                class="p-2 mt-3 mx-auto"
                border-variant="primary"
                v-for="(food, index) in yesterdayDinner"
                :key="index"
                style="width: 45%"
              >
                <div class="d-flex">
                  <div>
                    <h6 class="mb-0">{{ food.nutritionalCont.name }}</h6>
                    <p class="mb-0 text-muted">
                      {{ food.nutritionalCont.calories }} cal
                    </p>
                  </div>
                  <div class="ms-auto my-auto">
                    {{ food.nutritionalCont.weight }} g
                  </div>
                </div>
              </b-card>
              <b-button
                size="sm"
                variant="secondary"
                class="mx-auto mt-3 text-light w-50"
                @click="addYesterdaysMeal(yesterdayDinner)"
              >
                Add
              </b-button>
            </template>

            <template v-if="yesterdaySnacks && title === 'snacks'">
              <b-card
                no-body
                class="p-2 mt-3 mx-auto"
                border-variant="primary"
                v-for="(food, index) in yesterdaySnacks"
                :key="index"
                style="width: 45%"
              >
                <div class="d-flex">
                  <div>
                    <h6 class="mb-0">{{ food.nutritionalCont.name }}</h6>
                    <p class="mb-0 text-muted">
                      {{ food.nutritionalCont.calories }} cal
                    </p>
                  </div>
                  <div class="ms-auto my-auto">
                    {{ food.nutritionalCont.weight }} g
                  </div>
                </div>
              </b-card>
              <b-button
                size="sm"
                variant="secondary"
                class="mx-auto mt-3 text-light w-50"
                @click="addYesterdaysMeal(yesterdaySnacks)"
              >
                Add
              </b-button>
            </template>
          </b-row>
        </b-tab>
      </b-tabs>
    </b-modal>

    <b-modal
      :id="foodItemModalId"
      footer-border-variant="white"
      header-border-variant="white"
      hide-footer
      scrollable
      no-stacking
    >
      <template #modal-header="{ close }">
        <div></div>
        <b-button size="sm" class="p-0" variant="link" @click="close()">
          <unicon name="times" />
        </b-button>
      </template>

      <b-row class="d-flex justify-content-between align-items-center">
        <template v-if="loading">
          <b-spinner
            variant="primary"
            style="width: 3rem; height: 3rem"
            class="mx-auto"
          />
        </template>

        <template v-if="foodItem">
          <b-row>
            <b-col>
              <food-item-chart
                v-if="foodItem"
                :foodItemPercentage="foodItemPercentage"
                :foodName="foodItem.name"
              />
            </b-col>

            <b-col>
              <b-row>
                <b-col>
                  <p class="text-primary">
                    <template v-if="!inputWeight">
                      <span style="font-size: x-large"
                        >{{ foodItem.calories }}Cal</span
                      ><br />
                    </template>

                    <template v-else>
                      <span style="font-size: x-large"
                        >{{ calculatedCalories }}Cal</span
                      ><br />
                    </template>
                    <span>Calories</span>
                  </p>
                </b-col>
                <b-col>
                  <p class="text-primary">
                    <template v-if="!inputWeight">
                      <span style="font-size: x-large"
                        >{{ foodItem.protein }}g</span
                      ><br />
                    </template>
                    <template v-else>
                      <span style="font-size: x-large"
                        >{{ calculatedProtein }}g</span
                      ><br />
                    </template>

                    <small>Protein</small>
                    <small v-if="foodItem"> {{ proteinPercentage }}%</small>
                  </p>
                </b-col>
              </b-row>

              <b-row>
                <b-col>
                  <p class="text-info">
                    <template v-if="!inputWeight">
                      <span style="font-size: x-large"
                        >{{ foodItem.carbs }}g</span
                      ><br />
                    </template>
                    <template v-else>
                      <span style="font-size: x-large"
                        >{{ calculatedCarbs }}g</span
                      ><br />
                    </template>

                    <small>Carbs</small>
                    <small v-if="foodItem"> {{ carbsPercentage }}%</small>
                  </p>
                </b-col>
                <b-col>
                  <p class="text-secondary">
                    <template v-if="!inputWeight">
                      <span style="font-size: x-large">{{ foodItem.fat }}g</span
                      ><br />
                    </template>
                    <template v-else>
                      <span style="font-size: x-large"
                        >{{ calculatedFat }}g</span
                      ><br />
                    </template>
                    <small>Fat</small>
                    <small v-if="foodItem"> {{ fatPercentage }}%</small>
                  </p>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </template>
      </b-row>

      <b-row
        v-if="foodItem"
        class="d-flex justify-content-center align-items-center"
      >
        <b-col md="9">
          <validation-observer v-slot="{ handleSubmit }">
            <b-form
              class="h-100 mt-2"
              @submit.prevent="handleSubmit(addFoodItem)"
              novalidate
            >
              <b-row align-v="center">
                <b-col sm="3">
                  <label>Weight</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Weight"
                    :rules="{ required: true, max: 4, numeric: true }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="inputWeight"
                        type="text"
                        :placeholder="foodItem ? `${foodItem.weight} g` : ''"
                        :state="validationState(validationContext)"
                        autocomplete="off"
                      ></b-form-input>
                      <b-form-invalid-feedback>
                        {{ validationContext.errors.find((x) => !!x) }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>

              <!-- <b-row align-v="center">
                <b-col sm="3">
                  <label>Quantity</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Quantity"
                    :rules="{ max: 10, alpha_num: true }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="quantity"
                        type="text"
                        :placeholder="foodItem ? `${foodItem.quantity} g` : ''"
                        :state="validationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback>
                        {{ validationContext.errors.find((x) => !!x) }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row> -->

              <b-row class="d-flex">
                <b-col>
                  <b-button
                    size="sm"
                    variant="outline-secondary"
                    class="mx-auto mt-3 w-100"
                    @click="backToFoodList"
                  >
                    Cancel
                  </b-button>
                </b-col>
                <b-col>
                  <b-button
                    size="sm"
                    variant="secondary"
                    class="mx-auto mt-3 text-light w-100"
                    type="submit"
                  >
                    Add
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import DiaryBaseComponent from './DiaryBase';
import { IFoods, IFood } from '@/models/model';
import FoodItemChart from './FoodItemChart.vue';

@Component({
  components: {
    FoodItemChart,
  },
})
export default class AddFoodComponent extends DiaryBaseComponent {
  public foodList: IFoods | null = [];
  public inputWeight: number | null = null;
  public quantity: number | null = null;

  @Prop({ default: '' })
  title!: string;

  @Prop({ default: '' })
  addFoodModalId!: string;

  @Prop({ default: '' })
  foodItemModalId!: string;

  get sumTotalMacros() {
    if (this.foodItem)
      return this.foodItem.protein! + this.foodItem.carbs! + this.foodItem.fat!;
    return null;
  }

  get proteinPercentage() {
    if (this.foodItem && this.sumTotalMacros)
      return this.macroPercentage(this.foodItem.protein!);
    return null;
  }

  get carbsPercentage() {
    if (this.foodItem && this.sumTotalMacros)
      return this.macroPercentage(this.foodItem.carbs!);
    return null;
  }

  get fatPercentage() {
    if (this.foodItem && this.sumTotalMacros)
      return this.macroPercentage(this.foodItem.fat!);
    return null;
  }

  get foodItemPercentage() {
    return [
      Number(this.proteinPercentage),
      Number(this.carbsPercentage),
      Number(this.fatPercentage),
    ];
  }

  get calculatedProtein() {
    if (this.foodItem) return this.calculatedMacro(this.foodItem.protein!);
    return null;
  }

  get calculatedCarbs() {
    if (this.foodItem) return this.calculatedMacro(this.foodItem.carbs!);
    return null;
  }

  get calculatedFat() {
    if (this.foodItem) return this.calculatedMacro(this.foodItem.fat!);
    return null;
  }

  get calculatedCalories() {
    if (this.foodItem) return this.calculatedMacro(this.foodItem.calories!);
    return null;
  }

  macroPercentage(macro: number) {
    if (this.foodItem && this.sumTotalMacros)
      return this.calcPercentage(macro, this.sumTotalMacros);
    return null;
  }

  calculatedMacro(macro: number) {
    if (this.foodItem && this.inputWeight)
      return ((macro * this.inputWeight) / 100).toFixed(1);
    return null;
  }

  addYesterdaysMeal(meal: any) {
    meal.forEach(
      (x: {
        diaryMeal: string;
        nutritionalCont: {
          name: string;
          weight: number;
          quantity: string | number;
          protein: number;
          carbs: number;
          fat: number;
          calories: number;
        };
      }) => {
        this.createFoodDiaryEntry(
          x.diaryMeal,
          x.nutritionalCont.name,
          x.nutritionalCont.weight,
          x.nutritionalCont.quantity,
          x.nutritionalCont.protein,
          x.nutritionalCont.carbs,
          x.nutritionalCont.fat,
          x.nutritionalCont.calories
        );
      }
    );
  }

  addFoodItem() {
    this.createFoodDiaryEntry(
      this.title,
      this.foodItem!.name!,
      this.inputWeight!,
      this.quantity!,
      Number(this.calculatedProtein),
      Number(this.calculatedCarbs),
      Number(this.calculatedFat),
      Number(this.calculatedCalories)
    );
    this.foodItem = null;
    // this.loadUser();
    this.$bvModal.hide(`${this.foodItemModalId}`);
  }

  backToFoodList() {
    this.foodItem = null;
    this.$bvModal.hide('foodItemModalId');
  }

  calcPercentage(a: number, b: number) {
    if (b === 0 || a == null) return '--';
    return ((100 * a) / b).toFixed();
  }

  async loadFoodList() {
    // console.log('loadFoodList');

    this.loading = true;

    try {
      const data = await this.apiService.getFoodList();

      if (data) {
        this.foodList = data;
      }
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }

  created() {
    this.loadFoodList();
  }
}
</script>
