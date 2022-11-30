<template>
  <b-card border-variant="primary" class="h-100">
    <!-- Title -->
    <b-row>
      <b-col cols="10">
        <h5 class="mb-0">set macros</h5>
      </b-col>
      <b-col class="d-flex flex-row-reverse">
        <b-button v-b-toggle.editMacros variant="link" class="p-0">
          <unicon name="plus" />
        </b-button>
      </b-col>
    </b-row>
    <!-- Edit macros form -->
    <b-row class="d-flex justify-content-center align-items-center">
      <b-col md="9">
        <b-collapse id="editMacros" class="pb-3">
          <b-form class="h-100 mt-2">
            <b-row align-v="center" class="pb-1">
              <b-col sm="3">
                <label>Activity</label>
              </b-col>
              <b-col>
                <v-select
                  id="v-select"
                  v-model="activity"
                  :options="activityOptions"
                  :reduce="(activityOptions) => activityOptions.value"
                  placeholder="Daily amount of activity"
                ></v-select>
              </b-col>
            </b-row>

            <b-row align-v="center">
              <b-col sm="3">
                <label>Goal</label>
              </b-col>
              <b-col>
                <v-select
                  id="v-select"
                  v-model="goal"
                  :options="goalOptions"
                  :reduce="(goalOptions) => goalOptions.value"
                  placeholder="Weight goal"
                ></v-select>
              </b-col>
            </b-row>

            <b-row align-v="center">
              <b-col class="d-flex">
                <b-button
                  variant="outline-primary"
                  class="p-1 mt-1 mx-auto"
                  v-b-tooltip.hover.bottom
                  title="Save macros"
                  @click="updateMacros"
                >
                  <unicon name="save" />
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-collapse>

        <!-- Macros table -->
        <b-row>
          <template v-if="loading">
            <b-spinner
              variant="primary"
              style="width: 3rem; height: 3rem"
              class="mx-auto"
            />
          </template>
          <template v-else>
            <template v-if="userProfile.macros">
              <b-table
                :items="userMacrosTable"
                responsive
                show-empty
                empty-text="Loading..."
                class="mb-0"
              ></b-table>
            </template>

            <template v-else>
              <b-table
                :items="calculateMacrosTable"
                responsive
                show-empty
                empty-text="Loading..."
                class="mb-0"
              ></b-table>
            </template>
          </template>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import { Period, LocalDate } from '@js-joda/core';
import DashboardBaseComponent from './DashboardBase';

@Component({})
export default class MacroCalculatorComponent extends DashboardBaseComponent {
  private activity: number | null = null;
  private goal: number | null = null;

  get userAge() {
    const birthdate = this.DATES.isoDates.getDateString(
      this.userProfile!.birthdate
    );
    const today = this.DATES.isoDates.getToday();
    const period = Period.between(
      LocalDate.parse(today),
      LocalDate.parse(birthdate)
    ).toString();
    return Number(period.substring(2, 4));
  }

  get dailyCalories() {
    return (
      (10 * this.userProfile!.currentWeight! +
        6.25 * this.userProfile!.height! -
        5 * this.userAge +
        5) *
      this.activity! *
      this.goal!
    );
  }

  get protein() {
    return this.calcProtein(this.dailyCalories);
  }

  get fat() {
    return this.calcFat(this.dailyCalories);
  }

  get carbs() {
    return this.calcCarbs(this.dailyCalories);
  }

  get calculateMacrosTable() {
    return [
      {
        Nutrient: 'Calories (kcal)',
        Daily_Intake: this.dailyCalories.toFixed(),
      },
      {
        Nutrient: 'Protein (gr)',
        Daily_Intake: this.protein,
      },
      { Nutrient: 'Carbs (gr)', Daily_Intake: this.carbs },
      { Nutrient: 'Fat (gr)', Daily_Intake: this.fat },
    ];
  }

  get userMacrosTable() {
    return [
      {
        Nutrient: 'Calories (kcal)',
        Daily_Intake: this.userProfile!.macros!.calories,
      },
      {
        Nutrient: 'Protein (gr)',
        Daily_Intake: this.userProfile!.macros!.protein,
      },
      { Nutrient: 'Carbs (gr)', Daily_Intake: this.userProfile!.macros!.carbs },
      { Nutrient: 'Fat (gr)', Daily_Intake: this.userProfile!.macros!.fat },
    ];
  }

  get activityOptions() {
    return [
      { value: 1.2, label: 'Sedentary' },
      { value: 1.375, label: 'Lightly active' },
      { value: 1.55, label: 'Moderately active' },
      { value: 1.725, label: 'Very active' },
      { value: 1.9, label: 'Extra active' },
    ];
  }

  get goalOptions() {
    return [
      { value: 1, label: 'Maintain weight' },
      {
        value: 0.91,
        label: 'Mild weight loss (0.25kg/week)',
      },
      {
        value: 0.838,
        label: 'Weight loss (0.50kg/week)',
      },
      {
        value: 0.677,
        label: 'Extreme weight loss (1kg/week)',
      },
      {
        value: 1.08,
        label: 'Mild weight gain (0.25kg/week)',
      },
      {
        value: 1.16,
        label: 'Weight gain (0.50kg/week)',
      },
      {
        value: 1.32,
        label: 'Extreme weight gain (1kg/week)',
      },
    ];
  }

  calcProtein(calories: number) {
    return ((25 * calories) / 100 / 4).toFixed();
  }

  calcFat(calories: number) {
    return ((25 * calories) / 100 / 9).toFixed();
  }

  calcCarbs(calories: number) {
    return ((50 * calories) / 100 / 4).toFixed();
  }

  async updateMacros() {
    // console.log('updateMacros');

    this.loading = true;

    try {
      const data = await this.apiService.putUserData(this.username, {
        protein: Number(this.protein),
        carbs: Number(this.carbs),
        fat: Number(this.fat),
        calories: Number(this.dailyCalories.toFixed()),
      });

      if (data) {
        this.userProfile = data;
      }
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }
}
</script>

<style>
@import 'vue-select/dist/vue-select.css';
</style>
