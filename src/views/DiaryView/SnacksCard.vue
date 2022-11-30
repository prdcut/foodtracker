<template>
  <b-card border-variant="primary" class="h-100">
    <!-- Title -->
    <b-row>
      <b-col cols="10">
        <h5 class="mb-0">snacks</h5>
      </b-col>
      <b-col class="d-flex flex-row-reverse">
        <b-button v-b-tooltip.hover title="Add food" variant="link" class="p-0">
          <unicon name="plus" />
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class SnacksCardComponent extends Vue {}
</script>
