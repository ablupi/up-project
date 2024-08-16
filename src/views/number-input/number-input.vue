<template>
  <div class="views-main">
    <o-number-input v-model="count"></o-number-input>
  </div>
</template>

<script lang="ts" setup>
import ONumberInput from '@/components/number-input/number-input.vue'
import { ref } from 'vue'

const count = ref(0)
</script>