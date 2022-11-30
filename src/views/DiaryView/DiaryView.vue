<template>
  <div class="h-100">
    <navbar-component class="mb-3" />

    <!-- Content -->
    <b-row class="d-flex justify-content-center">
      <b-col md="6">
        <!-- First row -->
        <b-row>
          <b-col md="6" class="px-4 px-md-2 pb-3">
            <breakfast-card />
          </b-col>
          <b-col md="6" class="px-4 px-md-2 pb-3"> <lunch-card /> </b-col>
          <!-- {{ diaryEntry }}
          {{ diaryEntryId }}!! -->
        </b-row>
        <!-- Second row -->
        <b-row>
          <b-col md="6" class="px-4 px-md-2 pb-3"> <dinner-card /> </b-col>
          <b-col md="6" class="px-4 px-md-2 pb-3"> <snacks-card /> </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import DashboardBaseComponent from './DiaryBase';
import BreakfastCard from './BreakfastCard.vue';
import LunchCard from './LunchCard.vue';
import DinnerCard from './DinnerCard.vue';
import SnacksCard from './SnacksCard.vue';

@Component({
  components: {
    BreakfastCard,
    LunchCard,
    DinnerCard,
    SnacksCard,
  },
})
export default class DiaryView extends DashboardBaseComponent {}
</script>
