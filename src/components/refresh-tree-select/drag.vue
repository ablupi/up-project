<template>
  <div class="scroll" ref="wrapper">
      <slot></slot>
  </div>
</template>

<script setup lang="ts">
import IScroll from "@/assets/js/iscroll-probe";
import { ref, watch, defineProps, reactive, onMounted } from 'vue'


  const props = defineProps({
    loadingHeight: Number,
    boxHeight: Number
  })

  const emits = defineEmits(['showReload', 'beforeReload', 'inReload'])

  const state = reactive({
    pullUp: 1,
    pullUpOver: 1,
    upHeight: 40,
    myScroll: null as any,
    isEnd: false
  })

  const wrapper = ref()

  watch(props.boxHeight, () => {
    state.myScroll.refresh();
  })

  onMounted(() => {
    // var myScroll = new IScroll(this.$refs.wrapper, {
      //     probeType: 2,
      //     fadeScrollbars: false,
      // });
      state.myScroll = new IScroll(wrapper.value, {
          probeType: 2,
          fadeScrollbars: false,
      });
      // setTimeout(() => {
      //     this.myScroll.refresh();
      // }, 0);
      state.myScroll.on("scroll", () => {
          var y = state.myScroll.y;

          // 下拉加载
          // if (y >= downHeight && pullDown) {
          //     $(".pullDown").addClass("refresh").html("松开刷新...");
          //     myScroll.minScrollY = downHeight;
          //     pullDown = 0;
          // }
          // if (y <= downHeight && y >= 0 && !pullDown) {
          //     $(".pullDown").removeClass("refresh").html("下拉刷新...");
          //     pullDown = 1;
          //     myScroll.minScrollY = 0;
          // }

          // 上拉刷新
          var maxHeight = state.myScroll.maxScrollY;
          // console.log(maxHeight - this.upHeight)
          if (
              y < maxHeight &&
              y > maxHeight - props.loadingHeight &&
              state.pullUp
          ) {
              // 抛出去一个事件，进行下拉事件的开始
              emits("showReload");
              state.pullUp = 0;
              state.isEnd = false
          }
          if (y < maxHeight - props.loadingHeight && state.pullUpOver) {
              // 抛出去一个事件，已经超过给定的的刷新盒子的高度，再松开滚动条时就可以进行加载事件
              emits("beforeReload");
              state.pullUpOver = 0;
              state.pullUp = 1;
              state.isEnd = true
          }
      });

      state.myScroll.on("scrollEnd", () => {
        state.pullUp = 1;
        state.pullUpOver = 1;
          // this.myScroll.refresh();
          // 抛出去一个事件，判断是否已经到给定的刷新盒子高度，进行加载事件处理
          if (state.isEnd) {
              emits("inReload");
              // this.myScroll.maxScrollY = this.myScroll.maxScrollY - this.loadingHeight
              // this.myScroll.scrollBy(0, -this.loadingHeight);
              // this.myScroll.refresh();
          }
              
      });

      state.myScroll.on("refresh", () => {
          // $(".pullUp").removeClass("loading").html("上拉加载...");
          // this.pullUp = 1;
      });
  })
  // const iscrollRefresh = () => {
  //   state.myScroll.refresh();
  // }
</script>

<style scoped>
.scroll {
  overflow: hidden;
}
</style>