<template>
  <b-card border-variant="primary" class="h-100">
    <!-- Title -->
    <h5 class="mb-2">today's macros</h5>
    <!-- chart -->
    <b-row
      class="d-flex justify-content-between align-items-center"
      style="height: 80%"
    >
      <template v-if="loading">
        <b-spinner
          variant="primary"
          style="width: 3rem; height: 3rem"
          class="mx-auto"
        />
      </template>
      <template v-else>
        <b-col>
          <macros-chart :eatenMacro="todayProteinPercentage" />
          <h6 class="text-center mb-0">
            <small>
              Protein {{ todayEatenProtein }} /
              {{ userProfile.macros.protein }} g
            </small>
          </h6>
        </b-col>
        <b-col>
          <macros-chart :eatenMacro="todayCarbsPercentage" />
          <h6 class="text-center mb-0">
            <small>
              Carbs {{ todayEatenCarbs }} / {{ userProfile.macros.carbs }} g
            </small>
          </h6>
        </b-col>
        <b-col>
          <macros-chart :eatenMacro="todayFatPercentage" />
          <h6 class="text-center mb-0">
            <small>
              Fat {{ todayEatenFat }} / {{ userProfile.macros.fat }} g
            </small>
          </h6>
        </b-col>
      </template>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import DashboardBaseComponent from './DashboardBase';
import VueApexCharts from 'vue-apexcharts';
import { Component } from 'vue-property-decorator';
import MacrosChart from './MacrosChart.vue';

@Component({
  components: {
    VueApexCharts,
    MacrosChart,
  },
})
export default class RemainingMacrosComponent extends DashboardBaseComponent {
  get todayEatenProtein() {
    return this.todayFoodDiary
      .map((x) => x.nutritionalCont?.protein)
      .reduce((sum, x) => sum! + x!, 0);
  }

  get todayEatenCarbs() {
    return this.todayFoodDiary
      .map((x) => x.nutritionalCont?.carbs)
      .reduce((sum, x) => sum! + x!, 0);
  }

  get todayEatenFat() {
    return this.todayFoodDiary
      .map((x) => x.nutritionalCont?.fat)
      .reduce((sum, x) => sum! + x!, 0);
  }

  get todayProteinPercentage() {
    const proteinTarget = Number(this.userProfile!.macros?.protein);
    return [this.calcPercentage(Number(this.todayEatenProtein), proteinTarget)];
  }

  get todayCarbsPercentage() {
    const carbsTarget = Number(this.userProfile!.macros?.carbs);
    return [this.calcPercentage(Number(this.todayEatenCarbs), carbsTarget)];
  }

  get todayFatPercentage() {
    const fatTarget = Number(this.userProfile!.macros?.fat);
    return [this.calcPercentage(Number(this.todayEatenFat), fatTarget)];
  }
}
</script>
