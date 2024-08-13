<template>
  <div class="views-main">
    <div class="layout-sider">
      <div class="layout-sider-head">
        <img src="../assets/img/logo.png" alt="">
      </div>
      <o-menu>

      </o-menu>

    </div>
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts" setup>
import OMenu from '@/components/menu/menu-vertical.vue'
</script>

<style lang="less" scoped>
.views-main {
  display: flex;
  position: relative;
  // height: 100vh;
  // width: 100vw;
  .layout-sider {
    background: #fff;
    height: 100%;
    .layout-sider-head {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      border-bottom: 1px solid var(--border-color);
      img {
        height: 80px;
      }
    }
  }
}
</style>