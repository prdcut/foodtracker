<template>
  <b-card border-variant="primary" class="h-100" v-if="userProfile">
    <!-- Title -->
    <b-row>
      <b-col cols="10">
        <h5 class="mb-0">
          last week calories
          <unicon name="percentage" />
        </h5>
      </b-col>
    </b-row>
    <!-- chart -->
    <week-chart
      :caloriesVaslues="weekCaloriesPercentage"
      :datesCategories="lastWeeksDaysNames"
    />
  </b-card>
</template>

<script lang="ts">
import DashboardBaseComponent from './DashboardBase';
import VueApexCharts from 'vue-apexcharts';
import { Component } from 'vue-property-decorator';
import WeekChart from './WeekChart.vue';
import { LocalDate } from '@js-joda/core';

@Component({
  components: {
    VueApexCharts,
    WeekChart,
  },
})
export default class WeekProgressComponent extends DashboardBaseComponent {
  calcDayOfWeekName(days: number) {
    return Array.from({ length: days }, (_, i) => i + 1).map((value) =>
      LocalDate.now()
        .minusDays(value)
        .dayOfWeek()
        .toString()
        .toLowerCase()
        .substring(0, 3)
    );
  }

  // Chart x-axis
  get lastWeeksDaysNames() {
    return this.calcDayOfWeekName(7).reverse();
  }

  calcDate(days: number) {
    return Array.from({ length: days }, (_, i) => i + 1).map((value) =>
      LocalDate.now().minusDays(value).toString()
    );
  }

  get lastWeeksDates() {
    return this.calcDate(7).reverse();
  }

  filterFoodDiary(date: string) {
    if (this.userProfile)
      return this.userProfile.diary!.filter(
        (x) => x.type === 'food' && x.date === date
      );
    return [];
  }

  get lastWeekFoodDiary() {
    return this.lastWeeksDates.flatMap((date) => this.filterFoodDiary(date));
  }

  calcEatenCalories(dayIndex: number) {
    return this.lastWeekFoodDiary
      .filter((x) => x.date.includes(this.lastWeeksDates[dayIndex]))
      .map((x) => x.nutritionalCont?.calories)
      .reduce((sum, x) => sum! + x!, 0);
  }

  get lastWeekEatenCalories() {
    return Array.from(
      { length: this.lastWeeksDates.length },
      (_, i) => i++
    ).map((value) => this.calcEatenCalories(value));
  }

  calcPercentage(a: number, b: number) {
    if (b === 0 || a == null) return '--';
    return ((100 * a) / b).toFixed();
  }

  get weekCaloriesPercentage() {
    const caloriesTarget = Number(this.userProfile!.macros?.calories);

    return this.lastWeekEatenCalories.map((calorie: any) =>
      this.calcPercentage(calorie, caloriesTarget)
    );
  }
}
</script>
