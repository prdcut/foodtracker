<template>
  <div class="Dashboard">
    <navbar-component />
    <h1>Dashboard</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
})
export default class DashboardView extends Vue {}
</script>
