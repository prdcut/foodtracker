<template>
  <b-navbar type="dark" variant="primary" class="py-0" :fixed="resolveFixed">
    <b-navbar-nav class="mx-auto">
      <b-nav-item href="/">
        <div class="d-flex flex-column align-items-center">
          <unicon name="create-dashboard" fill="#e9eef4" />
          <small>Dashboard</small>
        </div>
      </b-nav-item>

      <b-nav-item href="/diary">
        <div class="d-flex flex-column align-items-center">
          <unicon name="diary" fill="#e9eef4" />
          <small>Diary</small>
        </div>
      </b-nav-item>

      <b-nav-item href="/foods">
        <div class="d-flex flex-column align-items-center">
          <unicon name="pizza-slice" fill="#e9eef4" />
          <small>Foods</small>
        </div>
      </b-nav-item>

      <b-nav-item href="/profile">
        <div class="d-flex flex-column align-items-center">
          <unicon name="user" fill="#e9eef4" />
          <small>Profile</small>
        </div>
      </b-nav-item>

      <b-nav-item href="/login" @click="signout">
        <div class="d-flex flex-column align-items-center">
          <unicon name="signout" fill="#e9eef4" />
          <small>Signout</small>
        </div>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({})
export default class NavbarComponent extends Vue {
  private screenSize = window.innerWidth;

  signout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.$router.push({ name: 'login' });
  }

  get resolveFixed() {
    if (this.screenSize >= 576) return 'top';
    return null;
  }
}
</script>
