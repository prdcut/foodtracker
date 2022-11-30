<template>
  <div class="h-100">
    <navbar-component class="mb-3" />

    <!-- Content -->
    <b-row class="d-flex justify-content-center">
      <b-col md="9">
        <!-- First row -->
        <b-row>
          <b-col md="4" class="px-4 px-md-2 pb-3">
            <remaining-calories />
          </b-col>
          <b-col md="4" class="px-4 px-md-2 pb-3">
            <remaining-macros />
          </b-col>
          <b-col md="4" class="px-4 px-md-2 pb-3">
            <macros-calculator />
          </b-col>
        </b-row>
        <!-- Second row -->
        <b-row>
          <b-col md="6" class="px-4 px-md-2 pb-3">
            <weight-progress />
          </b-col>
          <b-col md="6" class="px-4 px-md-2 pb-3">
            <week-progress />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MacrosCalculator from './MacrosCalculator.vue';
import WeightProgress from './WeightProgress.vue';
import WeekProgress from './WeekProgress.vue';
import RemainingCalories from './RemainingCalories.vue';
import RemainingMacros from './RemainingMacros.vue';

@Component({
  components: {
    MacrosCalculator,
    WeightProgress,
    WeekProgress,
    RemainingCalories,
    RemainingMacros,
  },
})
export default class DashboardView extends Vue {}
</script>
