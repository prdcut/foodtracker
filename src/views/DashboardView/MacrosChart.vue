<template>
  <b-card no-body border-variant="white">
    <vue-apex-charts
      height="110"
      :options="macrosChart"
      :series="series"
      :eatenMacro="eatenMacro"
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
    eatenMacro: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {
      series: [this.eatenMacro],
      macrosChart: {
        chart: {
          type: 'radialBar',
          sparkline: {
            enabled: true,
          },
        },
        colors: ['#78a6c8'],
        plotOptions: {
          radialBar: {
            offsetY: -10,

            hollow: {
              size: '60%',
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
                offsetY: 8,
                fontSize: '0.8rem',
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
            gradientToColors: ['#78a6c8'],
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
