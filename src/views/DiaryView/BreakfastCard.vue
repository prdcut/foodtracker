<template>
  <b-card border-variant="primary" class="h-100">
    <!-- Title -->
    <b-row>
      <b-col cols="10">
        <h5 class="mb-0">breakfast</h5>
      </b-col>
      <b-col class="d-flex flex-row-reverse">
        <b-button v-b-tooltip.hover title="Add food" variant="link" class="p-0">
          <unicon v-b-modal.addFoodModal name="plus" />
        </b-button>
      </b-col>
    </b-row>
    <add-food-component title="breakfast" @addFood="addFoodToBreakfast" />
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DiaryBaseComponent from './DiaryBase';

@Component({
  components: {},
})
export default class BreakfastCardComponent extends DiaryBaseComponent {}
</script>
