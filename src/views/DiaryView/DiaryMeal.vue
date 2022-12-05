<template>
  <b-card border-variant="primary" class="h-100">
    <!-- Title -->
    <b-row>
      <b-col cols="10">
        <h5 class="mb-0">
          {{ cardTitle }} <span class="ms-1">{{ mealTotalCalories }}</span>
        </h5>
      </b-col>
      <b-col class="d-flex flex-row-reverse">
        <b-button variant="link" class="p-0" v-b-modal="mealName">
          <unicon name="plus" />
        </b-button>
      </b-col>
    </b-row>
    <add-food
      :title="cardTitle"
      :addFoodModalId="mealName"
      :foodItemModalId="foodItemMeal"
    />

    <template v-if="loading">
      <div class="d-flex">
        <b-spinner
          variant="primary"
          style="width: 3rem; height: 3rem"
          class="mx-auto"
        />
      </div>
    </template>

    <template v-else>
      <b-list-group>
        <b-list-group-item
          v-for="(food, index) in mealFoodList"
          :key="index"
          class="d-flex pe-0 py-1 ps-2"
        >
          <b-col cols="9" md="10">
            {{ food.nutritionalCont.name }}<br />
            <small class="text-muted">{{ food.nutritionalCont.weight }}g</small>
          </b-col>
          <b-col cols="2" md="1" class="my-auto">
            {{ food.nutritionalCont.calories.toFixed() }}
          </b-col>
          <b-col cols="1" class="d-flex justify-content-center">
            <b-button
              variant="link"
              class="p-0"
              @click="deleteFoodDiaryEntry(food._id)"
            >
              <unicon name="times" width="15" />
            </b-button>
          </b-col>
        </b-list-group-item>
      </b-list-group>
    </template>
  </b-card>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import DiaryBaseComponent from './DiaryBase';
import AddFood from './AddFood.vue';

@Component({
  components: {
    AddFood,
  },
})
export default class BreakfastCardComponent extends DiaryBaseComponent {
  @Prop({ default: '' })
  cardTitle!: string;

  @Prop({ default: '' })
  mealFoodList!: string;

  @Prop({ default: '' })
  mealTotalCalories!: string;

  @Prop({ default: '' })
  mealName!: string;

  @Prop({ default: '' })
  foodItemMeal!: string;
}
</script>
