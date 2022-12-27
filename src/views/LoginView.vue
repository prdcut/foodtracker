<template>
  <b-row class="d-flex justify-content-center h-100">
    <b-col class="my-auto" xl="5" lg="6" md="8">
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
              Wrong username or password!
            </b-alert>
          </b-col>
        </b-row>
        <!-- Title -->
        <b-row>
          <h1 class="text-center text-primary display-1">Food Track</h1>
        </b-row>
        <!-- Form -->
        <b-row class="d-flex justify-content-center align-items-center">
          <b-col md="9">
            <validation-observer v-slot="{ handleSubmit, reset }">
              <b-form
                class="h-100 mt-2"
                @submit.prevent="handleSubmit(login)"
                @reset.prevent="reset"
                novalidate
              >
                <b-row align-v="center">
                  <b-col sm="3">
                    <label>Username</label>
                  </b-col>
                  <b-col>
                    <validation-provider
                      v-slot="validationContext"
                      name="Username"
                      :rules="{ required: true }"
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

                <b-row align-v="center">
                  <b-col sm="3">
                    <label>Password</label>
                  </b-col>
                  <b-col>
                    <validation-provider
                      v-slot="validationContext"
                      name="Password"
                      :rules="{ required: true }"
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

                <!-- Submit -->
                <b-row
                  class="d-flex justify-content-center align-items-center text-center"
                >
                  <b-col>
                    <b-button
                      variant="primary"
                      class="d-block my-4 w-100 text-light"
                      type="submit"
                    >
                      <template v-if="loading">
                        <b-spinner small />
                      </template>
                      <template v-if="!loading"> Login </template>
                    </b-button>
                    <p>
                      New here?
                      <b-link
                        class="text-decoration-none text-primary"
                        to="/register"
                        >register</b-link
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
export default class LoginView extends Vue {
  private apiService: ApiService = new ApiService();
  private loading = false;

  private username = '';
  private password = '';

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

  async login() {
    // console.log('login');

    this.loading = true;

    try {
      const response = await this.apiService.login(
        this.username,
        this.password
      );

      if (response) {
        localStorage.setItem(
          'user',
          JSON.stringify(response.data.user.username)
        );
        localStorage.setItem('token', JSON.stringify(response.data.token));
        this.$router.push({ name: 'dashboard' });
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
