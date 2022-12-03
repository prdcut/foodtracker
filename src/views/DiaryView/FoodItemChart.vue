<template>
  <vue-apex-charts
    height="150"
    :options="foodItemChart"
    :series="series"
    :foodItemPercentage="foodItemPercentage"
    :foodName="foodName"
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
    foodItemPercentage: {
      type: Array,
      default: null,
    },
    foodName: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      series: this.foodItemPercentage,
      foodItemChart: {
        chart: {
          type: 'donut',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: { show: false },
        labels: ['Protein', 'Carbs', 'Fat'],
        stroke: { width: 0 },
        colors: ['#e65c4f', '#326789', '#78a6c8'],
        grid: {
          padding: {
            right: -20,
            left: -20,
          },
        },
        plotOptions: {
          pie: {
            donut: {
              size: '80%',
              labels: {
                show: true,
                name: {
                  offsetY: 7,
                },
                value: {
                  show: false,
                },
                total: {
                  show: true,
                  fontSize: '19px',
                  label: `${this.foodName}`,
                },
              },
            },
          },
        },
      },
    };
  },
});
</script>
