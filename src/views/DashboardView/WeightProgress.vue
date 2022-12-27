<template>
  <b-card border-variant="primary" class="h-100">
    <!-- Title -->
    <b-row>
      <b-col cols="10">
        <h5 class="mb-0">
          weight
          <span v-if="!loading">{{ userProfile.currentWeight }}</span> kg
        </h5>
      </b-col>
      <b-col class="d-flex flex-row-reverse">
        <b-button v-b-toggle.enterWeight variant="link" class="p-0">
          <unicon name="plus" />
        </b-button>
      </b-col>
    </b-row>
    <!-- Enter weight form -->
    <b-row class="d-flex justify-content-center align-items-center">
      <b-col md="9">
        <b-collapse id="enterWeight" class="pb-3">
          <b-form class="h-100 mt-2">
            <b-row align-v="center" class="pb-1">
              <b-col sm="3">
                <label>New weight</label>
              </b-col>
              <b-col>
                <validation-provider
                  v-slot="validationContext"
                  name="Weight"
                  :rules="{ max: 6, regex: /^(\d*\.)?\d+$/ }"
                >
                  <b-form-group>
                    <b-form-input
                      class="input"
                      v-model="newWeight"
                      id="newWeight"
                      type="text"
                      autocomplete="off"
                      size="sm"
                      :state="validationState(validationContext)"
                    ></b-form-input>

                    <b-form-invalid-feedback>
                      {{ validationContext.errors.find((x) => !!x) }}
                    </b-form-invalid-feedback>
                  </b-form-group>
                </validation-provider>
              </b-col>
            </b-row>
            <b-row class="d-flex">
              <b-col>
                <b-button
                  size="sm"
                  variant="outline-secondary"
                  class="mx-auto mt-1 w-100"
                  @click="createWeightDiaryEntry"
                >
                  Weight Diary Entry
                </b-button>
              </b-col>
              <b-col>
                <b-button
                  size="sm"
                  variant="secondary"
                  class="mt-1 text-light w-100"
                  type="submit"
                  @click="updateCurrentWeight"
                >
                  Set Current Weight
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </b-collapse>
      </b-col>
    </b-row>
    <!-- chart -->
    <b-row class="d-flex justify-content-between align-items-center">
      <template v-if="loading">
        <b-spinner
          variant="primary"
          style="width: 3rem; height: 3rem"
          class="mx-auto"
        />
      </template>
      <template v-else>
        <weight-chart
          :weightValues="weightValues"
          :datesCategories="datesCategories"
        />
      </template>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import DashboardBaseComponent from './DashboardBase';
import VueApexCharts from 'vue-apexcharts';
import { Component } from 'vue-property-decorator';
import WeightChart from './WeightProgressChart.vue';

@Component({
  components: {
    VueApexCharts,
    WeightChart,
  },
})
export default class WeightProgressComponent extends DashboardBaseComponent {
  private newWeight: number | null = null;

  get weightDiary() {
    if (this.userProfile!.diary)
      return this.userProfile!.diary!.filter((x) => x.type === 'weight');
    return [];
  }

  get datesCategories() {
    if (this.weightDiary.length > 0)
      return this.weightDiary.map((x) =>
        x.date.substring(5, 10).replaceAll('-', '. ')
      );
    return [];
  }

  get weightValues() {
    if (this.weightDiary.length > 0)
      return this.weightDiary.map((x) => x.weightValue);
    return [];
  }

  async createWeightDiaryEntry() {
    // console.log('createWeightDiaryEntry');

    const dateOut = this.DATES.isoDates.getToday();

    this.loading = true;

    try {
      const data = await this.apiService.postDiaryEntry(this.username, {
        type: 'weight',
        date: dateOut,
        weightValue: this.newWeight,
      });

      if (data) {
        this.userProfile = data;
        this.$router.go(0);
      }
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }

  async updateCurrentWeight() {
    // console.log('updateCurrentWeight');

    this.loading = true;

    try {
      const data = await this.apiService.putUserData(this.username, {
        currentWeight: this.newWeight,
      });

      if (data) {
        this.userProfile = data;
        this.$router.go(0);
      }
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }
}
</script>
