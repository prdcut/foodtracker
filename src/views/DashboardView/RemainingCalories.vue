<template>
  <b-card border-variant="primary" class="h-100">
    <!-- Title -->
    <h5 class="mb-2">today's calories</h5>
    <!-- chart -->
    <b-row style="height: 80%">
      <template v-if="loading">
        <b-spinner
          variant="primary"
          style="width: 3rem; height: 3rem"
          class="mx-auto"
        />
      </template>

      <template v-else>
        <calories-chart :eatenCalories="todayCaloriesPercentage" />
        <h6 class="text-center mb-0">
          {{ todayEatenCalories.toFixed() }} /
          {{ userProfile.macros.calories }} kcal
        </h6>
      </template>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import DashboardBaseComponent from './DashboardBase';
import VueApexCharts from 'vue-apexcharts';
import { Component } from 'vue-property-decorator';
import CaloriesChart from './CaloriesChart.vue';

@Component({
  components: {
    VueApexCharts,
    CaloriesChart,
  },
})
export default class RemainingCaloriesComponent extends DashboardBaseComponent {
  get todayEatenCalories() {
    return this.todayFoodDiary
      .map((x) => x.nutritionalCont?.calories)
      .reduce((sum, x) => sum! + x!, 0);
  }

  get todayCaloriesPercentage() {
    const caloriesTarget = Number(this.userProfile!.macros?.calories);

    return [
      this.calcPercentage(Number(this.todayEatenCalories), caloriesTarget),
    ];
  }
}
</script>
