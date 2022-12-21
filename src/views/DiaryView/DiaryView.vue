<template>
  <div class="h-100">
    <navbar-component class="mb-3" />

    <!-- Content -->
    <b-row class="d-flex justify-content-center">
      <b-col xl="7" md="11">
        <!-- First row -->
        <b-row>
          <b-col md="6" class="px-4 px-md-2 pb-3">
            <diary-meal
              cardTitle="breakfast"
              :mealFoodList="todayBreakfast"
              :mealTotalCalories="loggedCaloriesBreakfast"
              mealName="breakfast"
              foodItemMeal="foodItemBreakfast"
            />
          </b-col>
          <b-col md="6" class="px-4 px-md-2 pb-3">
            <diary-meal
              cardTitle="lunch"
              :mealFoodList="todayLunch"
              :mealTotalCalories="loggedCaloriesLunch"
              mealName="lunch"
              foodItemMeal="foodItemLunch"
            />
          </b-col>
        </b-row>
        <!-- Second row -->
        <b-row>
          <b-col md="6" class="px-4 px-md-2 pb-3">
            <diary-meal
              cardTitle="dinner"
              :mealFoodList="todayDinner"
              :mealTotalCalories="loggedCaloriesDinner"
              mealName="dinner"
              foodItemMeal="foodItemDinner"
            />
          </b-col>
          <b-col md="6" class="px-4 px-md-2 pb-3">
            <diary-meal
              cardTitle="snacks"
              :mealFoodList="todaySnacks"
              :mealTotalCalories="loggedCaloriesSnacks"
              mealName="snacks"
              foodItemMeal="foodItemSnacks"
            />
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import DashboardBaseComponent from './DiaryBase';
import DiaryMeal from './DiaryMeal.vue';

@Component({
  components: {
    DiaryMeal,
  },
})
export default class DiaryView extends DashboardBaseComponent {}
</script>
