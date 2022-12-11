<template>
  <div>
    <b-modal
      id="newFoodModal"
      size="md"
      footer-border-variant="white"
      header-border-variant="white"
      hide-footer
      @show="buildNewFoodItem"
    >
      <template #modal-header="{ close }">
        <h4>New Food</h4>

        <b-button size="sm" variant="link" @click="close()">
          <unicon name="times" />
        </b-button>
      </template>

      <b-row class="d-flex justify-content-center align-items-center">
        <b-col md="9">
          <validation-observer v-slot="{ handleSubmit }">
            <b-form
              class="h-100 mt-2"
              @submit.prevent="handleSubmit(createFoodItem)"
              novalidate
            >
              <b-row align-v="center">
                <b-col sm="3">
                  <label>Name</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Name"
                    :rules="{ required: true, alpha: true, max: 12 }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="newFoodItem.name"
                        id="name"
                        type="text"
                        autocomplete="off"
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
                  <label>Weight</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Weight"
                    :rules="{ required: true, max: 6, regex: /^(\d*\.)?\d+$/ }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="newFoodItem.weight"
                        id="weight"
                        type="text"
                        autocomplete="off"
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
                        v-model="newFoodItem.quantity"
                        id="quantity"
                        type="text"
                        autocomplete="off"
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
                    :rules="{ required: true, max: 6, regex: /^(\d*\.)?\d+$/ }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="newFoodItem.protein"
                        id="protein"
                        type="text"
                        autocomplete="off"
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
                    :rules="{ required: true, max: 6, regex: /^(\d*\.)?\d+$/ }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="newFoodItem.carbs"
                        id="carbs"
                        type="text"
                        autocomplete="off"
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
                    :rules="{ required: true, max: 6, regex: /^(\d*\.)?\d+$/ }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="newFoodItem.fat"
                        id="fat"
                        type="text"
                        autocomplete="off"
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
                    :rules="{ required: true, max: 6, regex: /^(\d*\.)?\d+$/ }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="newFoodItem.calories"
                        id="calories"
                        type="text"
                        autocomplete="off"
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
                    @click="cancelNewFood"
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
                    Add
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-col>
      </b-row>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import FoodsBaseComponent from './FoodsBase';
import { Food } from '@/models/model';

@Component({
  components: {},
})
export default class NewFoodComponent extends FoodsBaseComponent {
  buildNewFoodItem(modal: string) {
    this.foodItem = new Food();

    this.$nextTick(() => {
      this.$bvModal.show(modal);
    });
  }

  cancelNewFood() {
    this.newFoodItem = new Food();
    this.$bvModal.hide('newFoodModal');
  }
}
</script>
