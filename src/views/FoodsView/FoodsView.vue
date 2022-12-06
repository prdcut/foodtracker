<template>
  <div class="foods">
    <navbar-component />
    <h1>Foods</h1>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator';
import FoodsBaseComponent from './FoodsBase';

@Component({
  components: {},
})
export default class FoodsView extends FoodsBaseComponent {}
</script>
