<template>
  <div class="views-main">
    <o-verify-code 
      :counts="6"
      type="default"
      @verify-event="verify"
      @change="change">
    </o-verify-code>
  </div>
</template>

<script lang="ts" setup>
import OVerifyCode from '@/components/verify-code/verify-code.vue'

// 在这里调用验证码验证接口
const verify = (code: string) => {
  console.log(code)
}

const change = (code: string) => {
  console.log(code)
}
</script>