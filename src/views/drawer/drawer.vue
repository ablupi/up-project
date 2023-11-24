<template>
  <div class="views-main">
    <div class="btn-1" @click="openLeftDrawer">{{'<-打开左边抽屉'}}</div>
    <o-drawer v-model:open="showLeftDrawer" placement="left">
      <div class="sidebar">
        <div class="sidebar-head">
          <p>配置项</p>
        </div>
        <div class="o-form-items" style="height: 60px">
          <p>主题色：</p>
          <input type="color" class="input-color"/>
        </div>
        <div class="o-form-items">
          <p>主题色推荐：</p>
          <div class="o-color-picker">
            <div
              class="o-picker-item"
              v-for="item in colorPickerList"
              :key="item"
              :style="{ background: item }"
            ></div>
          </div>
        </div>
      </div>
    </o-drawer>
    <div class="btn-1" @click="openRightDrawer">{{'打开右边抽屉->'}}</div>
    <o-drawer v-model:open="showRightDrawer" placement="right">
      <div class="sidebar">
        <div class="sidebar-head">
          <p>配置项</p>
        </div>
        <div class="o-form-items" style="height: 60px">
          <p>主题色：</p>
          <input type="color" class="input-color"/>
        </div>
        <div class="o-form-items">
          <p>主题色推荐：</p>
          <div class="o-color-picker">
            <div
              class="o-picker-item"
              v-for="item in colorPickerList"
              :key="item"
              :style="{ background: item }"
            ></div>
          </div>
        </div>
      </div>
    </o-drawer>
  </div>
</template>

<script setup lang="ts">
import ODrawer from '@/components/drawer/drawer.vue'
import { ref } from 'vue'

const showLeftDrawer = ref(false)
const showRightDrawer = ref(false)
const colorPickerList = ref([
  '#ec9b64',
  '#6FBABD',
  '#A78263',
  '#869267',
  '#98A6B2',
])


const openLeftDrawer = () => {
  showLeftDrawer.value = true
}

const openRightDrawer = () => {
  showRightDrawer.value = true
}

</script>

<style scoped lang="less">
.sidebar {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  p {
    color: #868686;
  }
  .sidebar-head {
    height: 80px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #6fbabd4b;
    p {
      font-size: 18px;
      margin-left: 50px;
    }
  }
  .o-form-items {
    display: flex;
    // align-items: center;
    width: 400px;
    padding: 20px 0 0 0;
    p {
      width: 120px;
      text-align: right;
    }
  }
  .o-color-picker {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    .o-picker-item {
      height: 40px;
      width: 40px;
      border-radius: 5px;
      transition: 0.4s;
      cursor: pointer;
      &:hover,
      &:active {
        opacity: 0.8;
      }
    }
  }
}

</style>
