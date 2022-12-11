<template>
  <b-card no-body border-variant="white">
    <vue-apex-charts
      height="165"
      :options="caloriesChart"
      :series="series"
      :eatenCalories="eatenCalories"
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
    eatenCalories: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      series: [this.eatenCalories],
      caloriesChart: {
        chart: {
          type: 'radialBar',
          sparkline: {
            enabled: true,
          },
        },
        colors: ['#e65c4f'],
        plotOptions: {
          radialBar: {
            offsetY: -10,

            hollow: {
              size: '70%',
            },
            track: {
              background: '#e9eef4',
              strokeWidth: '50%',
            },
            dataLabels: {
              name: {
                show: false,
              },
              value: {
                offsetY: 12,
                fontSize: '1.6rem',
                fontWeight: '600',
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['#e65c4f'],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: 'round',
        },
      },
    };
  },
});
</script>
