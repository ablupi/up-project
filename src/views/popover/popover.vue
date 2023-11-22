<template>
  <div class="views-main">
    <o-popover placement="top">
      <div class="btn-1">气泡卡片-朝上</div>
      <template #content>
        <button class="osp-button" style="margin-right: 10px">确定</button>
        <button class="osp-button osp-button-cancel">取消</button>
      </template>
    </o-popover>
    <o-popover placement="left">
      <div class="btn-1">气泡卡片-朝左</div>
      <template #content>
        <button class="osp-button" style="margin-right: 10px">确定</button>
        <button class="osp-button osp-button-cancel">取消</button>
      </template>
    </o-popover>
    <o-popover placement="bottom">
      <div class="btn-1">气泡卡片-朝下</div>
      <template #content>
        <button class="osp-button" style="margin-right: 10px">确定</button>
        <button class="osp-button osp-button-cancel">取消</button>
      </template>
    </o-popover>
    <o-popover placement="right">
      <div class="btn-1">气泡卡片-朝右</div>
      <template #content>
        <button class="osp-button" style="margin-right: 10px">确定</button>
        <button class="osp-button osp-button-cancel">取消</button>
      </template>
    </o-popover>
  </div>
</template>

<script setup lang="ts">
import OPopover from '@/components/popover/popover.vue'
</script>

<style scoped lang="less">
.osp-button {
  border: none;
  outline: none;
  height: 30px;
  min-width: 40px;
  background: var(--theme);
  padding: 0 10px;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  justify-self: start;
  border-radius: 3px;
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0 0 5px #b3b3b3;
}
.osp-button:hover {
  opacity: 0.8;
}
.osp-button:active {
  opacity: 1;
  background: var(--theme-hover);
}
.osp-button-cancel {
  background: #fff;
  color: #000;
}
.osp-button-cancel:active {
  background: #b1b1b1;
}

</style>
