<template>
  <div class="d-flex flex-column h-100">
    <!-- Content -->
    <b-row class="d-flex justify-content-center my-3 mt-sm-5 pt-sm-4">
      <b-col xl="7" md="11">
        <b-card border-variant="primary" class="h-100">
          <!-- Title -->
          <h5>Food List</h5>

          <!-- First row -->
          <b-row class="d-flex justify-content-center">
            <b-col md="8">
              <b-input-group class="mb-3 align-items-center">
                <b-button variant="link" class="p-0">
                  <unicon
                    name="plus"
                    v-b-modal.newFoodModal
                    v-b-tooltip.hover
                    title="Add new food"
                  />
                </b-button>
                <b-form-input
                  class="rounded-start"
                  style="height: 2.13rem"
                  id="filter-input"
                  v-model="filter"
                  type="search"
                />
                <b-input-group-append>
                  <b-button
                    variant="outline-secondary"
                    class="rounded-0 rounded-end"
                    size="sm"
                    style="height: 2.13rem"
                  >
                    <unicon name="times" @click="filter = ''" class="py-auto" />
                  </b-button>
                </b-input-group-append>
              </b-input-group>
            </b-col>
          </b-row>

          <!-- Second row -->
          <b-row>
            <b-col>
              <b-table
                responsive
                show-empty
                stacked="md"
                empty-text="Loading..."
                label-sort-asc=""
                label-sort-desc=""
                label-sort-clear=""
                :filter="filter"
                :filter-included-fields="filterOn"
                :current-page="currPage.page"
                :per-page="currPage.limit"
                :items="foodList"
                :fields="tableColumns"
                @filtered="onFiltered"
              >
                <template #cell(weight)="data">
                  {{ data.item.weight }}g
                </template>
                <template #cell(calories)="data">
                  {{ data.item.calories }}Kcal
                </template>
                <template #cell(protein)="data">
                  {{ data.item.protein }}g
                </template>
                <template #cell(carbs)="data">
                  {{ data.item.carbs }}g
                </template>
                <template #cell(fat)="data"> {{ data.item.fat }}g </template>
                <template #cell(actions)="row">
                  <b-button
                    variant="link"
                    class="p-0"
                    @click="editFoodItem(row.item, row.index, $event.target)"
                  >
                    <unicon name="edit-alt" width="20px" />
                  </b-button>
                  <!-- <edit-food /> -->
                </template>
              </b-table>
              <b-pagination
                v-model="currPage.page"
                :total-rows="currPage.total"
                :per-page="currPage.limit"
                align="center"
                size="sm"
                first-number
                last-number
              />
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <new-food />

    <!-- Edit food item modal -->
    <b-modal
      :id="editFoodItemModal.id"
      size="md"
      footer-border-variant="white"
      header-border-variant="white"
      hide-footer
      @show="buildFoodItem"
    >
      <template #modal-header="{ close }">
        <h4>Edit {{ foodItemToEdit.name }}</h4>

        <b-button size="sm" variant="link" @click="close()">
          <unicon name="times" />
        </b-button>
      </template>

      <b-row class="d-flex justify-content-center align-items-center">
        <b-col md="9">
          <validation-observer v-slot="{ handleSubmit }">
            <b-form
              class="h-100 mt-2"
              @submit.prevent="handleSubmit(updateFoodItem)"
              novalidate
            >
              <b-row align-v="center">
                <b-col sm="3">
                  <label>Name</label>
                </b-col>
                <b-col>
                  <b-form-group>
                    <b-form-input
                      class="input"
                      v-model="foodItemToEdit.name"
                      readonly
                      type="text"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row align-v="center">
                <b-col sm="3">
                  <label>Weight</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Weight"
                    :rules="{ numeric: true, max: 5 }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="foodItemToEdit.weight"
                        type="text"
                        :state="validationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback>
                        {{ validationContext.errors.find((x) => !!x) }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>

              <!-- <b-row align-v="center">
                <b-col sm="3">
                  <label>Quantity</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Quantity"
                    :rules="{ alpha_num: true, max: 10 }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="foodItemToEdit.quantity"
                        type="text"
                        :state="validationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback>
                        {{ validationContext.errors.find((x) => !!x) }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row> -->

              <b-row align-v="center">
                <b-col sm="3">
                  <label>Protein</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Protein"
                    :rules="{ numeric: true, max: 5 }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="foodItemToEdit.protein"
                        type="text"
                        :state="validationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback>
                        {{ validationContext.errors.find((x) => !!x) }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>

              <b-row align-v="center">
                <b-col sm="3">
                  <label>Carbs</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Carbs"
                    :rules="{ numeric: true, max: 5 }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="foodItemToEdit.carbs"
                        type="text"
                        :state="validationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback>
                        {{ validationContext.errors.find((x) => !!x) }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>

              <b-row align-v="center">
                <b-col sm="3">
                  <label>Fat</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Fat"
                    :rules="{ numeric: true, max: 5 }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="foodItemToEdit.fat"
                        type="text"
                        :state="validationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback>
                        {{ validationContext.errors.find((x) => !!x) }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>

              <b-row align-v="center">
                <b-col sm="3">
                  <label>Calories</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Calories"
                    :rules="{ numeric: true, max: 5 }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="foodItemToEdit.calories"
                        type="text"
                        :state="validationState(validationContext)"
                      ></b-form-input>
                      <b-form-invalid-feedback>
                        {{ validationContext.errors.find((x) => !!x) }}
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </validation-provider>
                </b-col>
              </b-row>

              <!-- Submit -->
              <b-row class="d-flex">
                <b-col>
                  <b-button
                    size="sm"
                    variant="outline-secondary"
                    class="mx-auto mt-3"
                    style="width: 95%"
                    @click="cancelFoodItemToEdit"
                  >
                    Cancel
                  </b-button>
                </b-col>
                <b-col>
                  <b-button
                    size="sm"
                    variant="secondary"
                    class="mx-auto mt-3 text-light"
                    style="width: 95%"
                    type="submit"
                  >
                    Edit
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-col>
      </b-row>
    </b-modal>
    <navbar-component class="mt-auto" />
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import FoodsBaseComponent from './FoodsBase';
import NewFood from './NewFood.vue';

@Component({
  components: {
    NewFood,
  },
})
export default class FoodsView extends FoodsBaseComponent {}
</script>
