<template>
  <vue-apex-charts
    height="165"
    :options="weekChartOptions"
    :series="series"
    :categories="datesCategories"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueApexCharts from 'vue-apexcharts';

export default defineComponent({
  components: {
    VueApexCharts,
  },
  props: {
    caloriesVaslues: {
      type: Array,
      default: null,
    },
    datesCategories: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      series: [
        {
          name: 'Calories %',
          data: this.caloriesVaslues,
        },
      ],
      weekChartOptions: {
        chart: {
          type: 'bar',
          stacked: true,
          toolbar: {
            show: false,
          },
        },
        colors: ['#e65c4f'],
        grid: {
          show: false,
          padding: {
            left: 0,
            right: 0,
            top: -20,
            bottom: 0,
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '25%',
            borderRadius: 3,
            colors: {
              backgroundBarColors: ['#e9eef4'],
              backgroundBarRadius: 3,
            },
          },
        },

        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: this.datesCategories,
        },
        yaxis: {
          show: false,
        },
        tooltip: {
          x: {
            show: false,
          },
        },
      },
    };
  },
});
</script>
