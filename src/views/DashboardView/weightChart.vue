<template>
  <b-card no-body border-variant="white">
    <vue-apex-charts
      height="165"
      :options="weightChartOptions"
      :series="series"
      :categories="datesCategories"
    />
  </b-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VueApexCharts from 'vue-apexcharts';

export default defineComponent({
  components: {
    VueApexCharts,
  },
  props: {
    weightValues: {
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
          name: 'Kg',
          data: this.weightValues,
        },
      ],
      weightChartOptions: {
        chart: {
          type: 'line',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        colors: ['#78a6c8'],
        grid: {
          borderColor: '#e65c4f',
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
          padding: {
            top: -10,
            bottom: -10,
          },
        },
        stroke: {
          width: 4,
        },
        markers: {
          size: 2,
          colors: '#78a6c8',
          strokeColors: '#78a6c8',
          strokeWidth: 2,
          strokeOpacity: 1,
          strokeDashArray: 0,
          fillOpacity: 1,
          shape: 'circle',
          radius: 2,
          hover: {
            size: 3,
          },
        },
        xaxis: {
          axisBorder: {
            show: true,
          },
          categories: this.datesCategories,
        },
        yaxis: {
          show: true,
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
