<template>
  <div class="h-100">
    <navbar-component class="mb-3" />

    <!-- Content -->
    <b-row class="d-flex justify-content-center">
      <b-col md="3">
        <b-card border-variant="primary" class="h-100">
          <template v-if="loading">
            <div class="d-flex">
              <b-spinner
                variant="primary"
                style="width: 3rem; height: 3rem"
                class="mx-auto"
              />
            </div>
          </template>

          <!-- Firsrt row -->
          <template v-else>
            <div class="d-flex-block">
              <b-row>
                <b-avatar
                  class="mx-auto"
                  :src="userProfile.avatar"
                  variant="primary"
                  size="104px"
                  rounded
                />
              </b-row>
              <div class="d-flex flex-column">
                <h4 class="mb-0 mx-auto">{{ userProfile.username }}</h4>
                <span class="card-text mx-auto">{{ userProfile.email }}</span>

                <div class="d-flex mx-auto">
                  <b-button
                    size="sm"
                    variant="outline-primary"
                    style="width: 4rem"
                    v-b-modal.deleteUserModal
                  >
                    Delete
                  </b-button>
                  <b-button
                    size="sm"
                    variant="primary"
                    style="width: 4rem"
                    class="ms-2 text-light"
                    v-b-modal.updateUserModal
                  >
                    Edit
                  </b-button>
                </div>
              </div>
            </div>

            <!-- Second row -->
            <div class="d-flex justify-content-center mt-4">
              <div class="me-4">
                <div class="d-flex">
                  <unicon
                    name="weight"
                    class="ms-auto"
                    width="35"
                    height="35"
                  />
                </div>
                <div>
                  <h5 class="mb-0">{{ userProfile.currentWeight }} Kg</h5>
                </div>
                <div class="d-flex">
                  <small class="ms-auto">Weight</small>
                </div>
              </div>

              <div>
                <div><unicon name="trophy" width="35" height="35" /></div>
                <div>
                  <h5 class="mb-0">{{ userProfile.goalWeight }} Kg</h5>
                </div>
                <div class="d-flex">
                  <small class="me-auto">Goal</small>
                </div>
              </div>
            </div>

            <!-- Third row -->
            <div class="mt-4 mx-auto">
              <b-row>
                <b-col>
                  <div class="d-flex">
                    <span class="ms-auto fw-bolder">Username</span>
                  </div>
                </b-col>
                <b-col>
                  {{ userProfile.username }}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="d-flex">
                    <span class="ms-auto fw-bolder">Birthdate</span>
                  </div>
                </b-col>
                <b-col>
                  {{ userProfile.birthdate }}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="d-flex">
                    <span class="ms-auto fw-bolder">Sex</span>
                  </div>
                </b-col>
                <b-col>
                  {{ userProfile.sex }}
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div class="d-flex">
                    <span class="ms-auto fw-bolder">Height</span>
                  </div>
                </b-col>
                <b-col> {{ userProfile.height }}cm </b-col>
              </b-row>
            </div>
          </template>
        </b-card>
      </b-col>
    </b-row>

    <!-- Delete user modal -->
    <b-modal
      id="deleteUserModal"
      size="sm"
      footer-border-variant="white"
      header-border-variant="white"
      hide-footer
      no-stacking
    >
      <template #modal-header="{ close }">
        <h5>Deregister</h5>
        <b-button size="sm" class="p-0" variant="link" @click="close()">
          <unicon name="times" />
        </b-button>
      </template>

      By cliking on confirm all your user data will be removed from our servers.
      Are you utterly sure you want to proceed?<br /><br />
      <span class="fw-bold">This action is not reversible!</span>

      <b-row class="d-flex">
        <b-col>
          <b-button
            size="sm"
            variant="outline-secondary"
            class="mx-auto mt-3"
            style="width: 95%"
            @click="cancelDeregister"
          >
            Cancel
          </b-button>
        </b-col>
        <b-col>
          <b-button
            size="sm"
            variant="primary"
            class="mx-auto mt-3 text-light"
            style="width: 95%"
            v-b-modal.confirmDelete
          >
            Confirm
          </b-button>
        </b-col>
      </b-row>
    </b-modal>

    <!-- Confirm delete user modal -->
    <b-modal
      id="confirmDelete"
      size="sm"
      footer-border-variant="white"
      header-border-variant="white"
      hide-footer
    >
      <template #modal-header="{ close }">
        <div></div>
        <b-button size="sm" class="p-0" variant="link" @click="close()">
          <unicon name="times" />
        </b-button>
      </template>

      We are sad to see you go, just click on delete forever.

      <b-button
        size="sm"
        variant="primary"
        class="mx-auto mt-3 text-light"
        style="width: 95%"
        @click="deregisterUser"
      >
        Delete Forever!
      </b-button>
    </b-modal>

    <!-- Update user modal -->
    <b-modal
      id="updateUserModal"
      footer-border-variant="white"
      header-border-variant="white"
      hide-footer
    >
      <template #modal-header="{ close }">
        <h5>Edit user info</h5>
        <b-button size="sm" class="p-0" variant="link" @click="close()">
          <unicon name="times" />
        </b-button>
      </template>

      <b-row class="d-flex justify-content-center align-items-center">
        <b-col md="9">
          <validation-observer v-slot="{ handleSubmit }">
            <b-form
              class="h-100 mt-2"
              @submit.prevent="handleSubmit(updateUser)"
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
                        v-model="userProfile.email"
                        type="email"
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
                        v-model="userProfile.username"
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
                        v-model="userProfile.sex"
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
                      regex:
                        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
                    }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="userProfile.birthdate"
                        type="text"
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
                    :rules="{ numeric: true, max: 4 }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="userProfile.height"
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
                  <label>Weight</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Weight"
                    :rules="{ numeric: true }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="userProfile.currentWeight"
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
                  <label>Goal Weight</label>
                </b-col>
                <b-col>
                  <validation-provider
                    v-slot="validationContext"
                    name="Goal weight"
                    :rules="{ numeric: true }"
                  >
                    <b-form-group>
                      <b-form-input
                        class="input"
                        v-model="userProfile.goalWeight"
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
                    @click="cancelUpdateUser"
                  >
                    Cancel
                  </b-button>
                </b-col>
                <b-col>
                  <b-button
                    size="sm"
                    variant="primary"
                    class="mx-auto mt-3 text-light"
                    style="width: 95%"
                    type="submit"
                  >
                    Update
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
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ApiService from '@/services/api.service';
import { User } from '@/models/model';
import { dates } from '@/libs/dates';
import { ValidationObserver, ValidationProvider } from 'vee-validate';

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
  },
})
export default class ProfileView extends Vue {
  private apiService: ApiService = new ApiService();
  private loading = false;
  private userProfile: User;

  constructor() {
    super();

    this.userProfile = new User();
  }

  get DATES() {
    return dates;
  }

  get username() {
    return localStorage.getItem('user')!.slice(1, -1);
  }

  get sexOptions() {
    return [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ];
  }

  cancelDeregister() {
    this.$bvModal.hide('deleteUserModal');
  }

  cancelUpdateUser() {
    this.$bvModal.hide('updateUserModal');
  }

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

  async loadUser() {
    // console.log('loadUser');

    this.loading = true;

    try {
      const data = await this.apiService.getUserData(this.username);

      if (data) {
        this.userProfile = data;
      }
    } catch (error) {
      console.log(error);
    }

    this.loading = false;
  }

  async updateUser() {
    // console.log('updateUser');

    this.loading = true;

    try {
      const data = await this.apiService.putUser(
        this.username,
        this.userProfile
      );

      if (data) {
        this.userProfile = data;
        this.$bvToast.toast('User updated', {
          variant: 'success',
          solid: true,
          autoHideDelay: 3500,
          noCloseButton: true,
        });
        this.$router.go(0);
      }
    } catch (error) {
      console.log(error);
      this.$bvToast.toast('Something went wrong!', {
        variant: 'danger',
        solid: true,
        autoHideDelay: 3500,
        noCloseButton: true,
      });
    }

    this.loading = false;
  }

  async deregisterUser() {
    // console.log('deregisterUser');

    try {
      const data = await this.apiService.deleteUser(
        this.username,
        this.userProfile!.email!
      );

      if (data) {
        this.$router.push({ name: 'register' });
        this.$bvToast.toast('User deleted', {
          variant: 'danger',
          solid: true,
          autoHideDelay: 3500,
          noCloseButton: true,
        });
      }
    } catch (error) {
      console.log(error);
      this.$bvToast.toast('Something went wrong!', {
        variant: 'danger',
        solid: true,
        autoHideDelay: 3500,
        noCloseButton: true,
      });
    }
  }

  created() {
    // console.log('created');
    this.loadUser();
  }
}
</script>
