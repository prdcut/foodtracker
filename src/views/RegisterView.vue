<template>
  <b-row class="d-flex justify-content-center h-100">
    <b-col class="my-auto" md="4">
      <b-card border-variant="primary">
        <!-- Error alert -->
        <b-row>
          <b-col>
            <b-alert
              :show="dismissCountDown"
              variant="primary"
              class="p-1 text-center"
              fade
              @dismissed="dismissCountDown = 0"
              @dismiss-count-down="countDownChanged"
            >
              Something is wrong, please try again!
            </b-alert>
          </b-col>
        </b-row>
        <!-- Title -->
        <b-row>
          <h1 class="text-center text-primary display-1">Food Tracker</h1>
        </b-row>
        <!-- Form -->
        <b-row class="d-flex justify-content-center align-items-center">
          <b-col md="9">
            <validation-observer v-slot="{ handleSubmit, reset }">
              <b-form
                class="h-100 mt-2"
                @submit.prevent="handleSubmit(register)"
                @reset.prevent="reset"
                novalidate
              >
                <b-row align-v="center">
                  <b-col sm="3">
                    <label>Email</label>
                  </b-col>
                  <b-col>
                    <validation-provider
                      v-slot="validationContext"
                      name="Email"
                      :rules="{ required: true, email: true }"
                    >
                      <b-form-group>
                        <b-form-input
                          class="input"
                          v-model="email"
                          id="email"
                          type="email"
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
                    <label>Password</label>
                  </b-col>
                  <b-col>
                    <validation-provider
                      v-slot="validationContext"
                      name="Password"
                      :rules="{
                        required: true,
                        password: true,
                      }"
                    >
                      <b-form-group>
                        <b-form-input
                          class="input"
                          v-model="password"
                          id="password"
                          type="password"
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
                    <label>Username</label>
                  </b-col>
                  <b-col>
                    <validation-provider
                      v-slot="validationContext"
                      name="Username"
                      :rules="{ required: true, min: 5, max: 20 }"
                    >
                      <b-form-group>
                        <b-form-input
                          class="input"
                          v-model="username"
                          id="username"
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

                <hr />

                <b-row align-v="center">
                  <b-col sm="3">
                    <label>Sex</label>
                  </b-col>
                  <b-col>
                    <validation-provider
                      v-slot="validationContext"
                      name="Sex"
                      :rules="{ required: true }"
                    >
                      <b-form-group>
                        <v-select
                          id="v-select"
                          v-model="sex"
                          :options="sexOptions"
                          :state="validationState(validationContext)"
                          :reduce="(sexOptions) => sexOptions.value"
                        ></v-select>
                        <b-form-invalid-feedback>
                          {{ validationContext.errors.find((x) => !!x) }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>

                <b-row align-v="center">
                  <b-col sm="3">
                    <label>Birthdate</label>
                  </b-col>
                  <b-col>
                    <validation-provider
                      v-slot="validationContext"
                      name="Birthdate"
                      :rules="{
                        required: true,
                        regex:
                          /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
                      }"
                    >
                      <b-form-group>
                        <b-form-input
                          class="input"
                          v-model="birthdate"
                          id="birthdate"
                          type="text"
                          autocomplete="off"
                          :state="validationState(validationContext)"
                          placeholder="(yyyy-mm-dd)"
                        ></b-form-input>
                        <b-form-invalid-feedback>
                          {{ validationContext.errors.find((x) => !!x) }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>

                <hr />

                <b-row align-v="center">
                  <b-col sm="3">
                    <label>Height</label>
                  </b-col>
                  <b-col>
                    <validation-provider
                      v-slot="validationContext"
                      name="Height"
                      :rules="{ required: true, numeric: true, max: 4 }"
                    >
                      <b-form-group>
                        <b-form-input
                          class="input"
                          v-model="height"
                          id="height"
                          type="text"
                          autocomplete="off"
                          :state="validationState(validationContext)"
                          placeholder="(cm)"
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
                      :rules="{ required: true, numeric: true }"
                    >
                      <b-form-group>
                        <b-form-input
                          class="input"
                          v-model="currentWeight"
                          id="currentWeight"
                          type="text"
                          autocomplete="off"
                          :state="validationState(validationContext)"
                          placeholder="(kg)"
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
                    <label>Goal Weight</label>
                  </b-col>
                  <b-col>
                    <validation-provider
                      v-slot="validationContext"
                      name="Goal weight"
                      :rules="{ required: true, numeric: true }"
                    >
                      <b-form-group>
                        <b-form-input
                          class="input"
                          v-model="goalWeight"
                          id="goalWeight"
                          type="text"
                          autocomplete="off"
                          :state="validationState(validationContext)"
                          placeholder="(kg)"
                        ></b-form-input>
                        <b-form-invalid-feedback>
                          {{ validationContext.errors.find((x) => !!x) }}
                        </b-form-invalid-feedback>
                      </b-form-group>
                    </validation-provider>
                  </b-col>
                </b-row>

                <!-- Submit -->
                <b-row
                  class="d-flex justify-content-center align-items-center text-center"
                >
                  <b-col md="9">
                    <b-button
                      variant="primary"
                      class="d-block my-4 w-100 text-light"
                      type="Submit"
                    >
                      <template v-if="loading">
                        <b-spinner small />
                      </template>
                      <template v-if="!loading"> Register </template>
                    </b-button>
                    <p>
                      One of us?
                      <b-link
                        class="text-decoration-none text-primary"
                        to="/login"
                        >Login</b-link
                      >
                    </p>
                  </b-col>
                </b-row>
              </b-form>
            </validation-observer>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ApiService from '@/services/api.service';

import { ValidationObserver, ValidationProvider } from 'vee-validate';

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class RegisterView extends Vue {
  private apiService: ApiService = new ApiService();
  private loading = false;

  private email = '';
  private password = '';
  private sex = '';
  private username = '';
  private birthdate: Date | string = '';
  private height: number | null = null;
  private currentWeight: number | null = null;
  private goalWeight: number | null = null;

  private dismissSecs = 10;
  private dismissCountDown = 0;
  private showDismissibleAlert = false;

  validationState({
    dirty,
    validated,
    valid,
  }: {
    dirty: boolean;
    validated: boolean;
    valid: boolean;
  }) {
    return dirty || validated ? valid : null;
  }

  countDownChanged(dismissCountDown: number) {
    this.dismissCountDown = dismissCountDown;
  }

  showAlert() {
    this.dismissCountDown = this.dismissSecs;
  }

  get sexOptions() {
    return [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ];
  }

  async register() {
    // console.log('register');

    this.loading = true;

    try {
      const response = await this.apiService.register({
        password: this.password,
        email: this.email,
        sex: this.sex,
        username: this.username,
        birthdate: this.birthdate,
        height: this.height,
        currentWeight: this.currentWeight,
        goalWeight: this.goalWeight,
      });

      if (response) {
        this.$router.push({ name: 'login' });
      }
    } catch (error) {
      console.log(error);
      this.showAlert();
    }

    this.loading = false;
  }

  mounted() {
    const user = localStorage.getItem('user');
    if (user) {
      this.$router.push({ name: 'dashboard' });
    }
  }
}
</script>

<style>
@import 'vue-select/dist/vue-select.css';
</style>
