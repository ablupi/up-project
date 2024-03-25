<template>
  <div>
    <div
      class="dropdown-main"
      @click="state.isShow = !state.isShow"
      ref="inputRef"
    >
      <form action="">
        <input
          style="margin-left: 10px; width: 170px; font-size: 14px"
          class="dropdown-input"
          type="search"
          placeholder="TA是我的关系中的哪位？"
          v-model="state.current"
          @keyup.enter="inputSearch(state.current)"
        />
      </form>

      <div class="icon-triangle" :class="{ 'icon-open': state.isShow }"></div>
    </div>
    <!-- 下拉菜单选项内容 -->
    <transition name="drop">
      <o-draggable
        class="drag"
        v-show="state.isShow"
        :loadingHeight="40"
        :boxHeight="state.treeHeight"
        @in-reload="loadingMore"
        ref="draggableRef"
      >
        <div>
          <div class="tree-main" ref="treeRef">
            <o-tree-item
              class="item"
              :padding="20"
              v-for="(child, index) in treeData"
              :key="index"
              :item="child"
              :dataIndex="index"
              :idKey="`${index}`"
              :isCheckedList="isChecked"
              @click-item="clickItem"
              @check-radio="checkRadio"
            ></o-tree-item>
          </div>
          <!-- 加载文字放置区域 -->
          <div class="loading" v-show="isLoadShow" v-if="isTreeMore">
            <!-- <div
                          class="icon-loading loading-icon"
                          style="height: 12px; width: 12px; margin-right: 4px"
                      ></div> -->
            <!-- 加载图标 -->
            <!-- <vue-icon-loading :size=".25" style="margin-right: 6px"></vue-icon-loading> -->
            <span>加载中···</span>
          </div>
          <div class="loading" v-show="isLoadShow" v-else>
            <div></div>
            <span>没有更多数据了</span>
          </div>
        </div>

        <!-- 加载更多选项，方案二：下拉时根据鼠标拉拽坐标进行定位 -->
      </o-draggable>
    </transition>
  </div>
</template>

<script setup lang="ts">
import OTreeItem from './tree.vue'
import ODraggable from './drag.vue'
import {
  ref,
  defineProps,
  computed,
  reactive,
  onMounted,
  watch,
  defineEmits,
} from 'vue'
import elementResizeDetectorMaker from 'element-resize-detector'
// import iconLoading from '../../components/vue-icon/loading1.vue'

const props = defineProps({
  treeDataBase: Array,
})

const emits = defineEmits(['selectItem', 'loadMore', 'inputClick'])

const state = reactive({
  current: '',
  groupId: null,
  isShow: false,
  isEnd: false,
  treeHeight: 0,
  loadKey: 1,
})

const treeData = computed(() => {
  if (props.treeDataBase && props.treeDataBase.length !== 0) {
    return props.treeDataBase
  } else {
    return [{ name: '暂无关系的人', keyId: 0 }]
  }
})
// 临时添加的列表数量
const treeNum = ref(6)
const isChecked = ref<Array<boolean>>(
  new Array(treeData.value.length).fill(false)
)
// 是否显示加载更多
// const isTreeMore = ref(this.$store.getters.getIsTreeMoreFn)
const isTreeMore = ref(true)
const isLoadShow = ref(treeNum.value >= 5)
const treeRef = ref()
const inputRef = ref()

// watch(state.current, (value: string) => {
// })
watch(state.groupId, (value: any) => {
  emits('selectItem', value)
})

onMounted(() => {
  // 监听全局点击事件控制下拉菜单在点击到页面其他地方的时候收起来
  // 使用touchstart事件的原因是因为click在ios上不响应
  window.addEventListener('touchstart', clickOther)
  window.addEventListener('click', clickOther)
  // window.addEventListener("touchend", this.loadingMore);
  // window.addEventListener("mouseup", this.loadingMore);
  // this.treeHeight = this.$refs.treeRef.offsetHeight;
  // console.log(this.treeHeight);
  // 监听tree元素的高度变化，将值传给上拉加载组件，高度变化就重新新建IScroll实例
  const erdm = elementResizeDetectorMaker()
  erdm.listenTo(treeRef.value, (element: any) => {
    state.treeHeight = element.offsetHeight
  })
})

const clickItem = (item: any) => {
  state.current = item.name
  state.groupId = item.groupId
  state.isShow = false
}
const checkRadio = (res: any) => {
  console.log(res)
  isChecked.value.forEach((item: boolean, index) => {
    // if (index === res) {
    //     Vue.set(this.isChecked, index, true);
    // } else {
    //     Vue.set(this.isChecked, index, false);
    // }
    if (index === res) {
      item = true
    } else {
      item = false
    }
  })
}
const clickOther = (event: any) => {
  // setTimeout(() => {
  //     console.log(this.$refs.treeRef.offsetHeight)
  // },50
  const e = event || window.event
  if (
    treeRef.value &&
    !treeRef.value.contains(e.target) &&
    !inputRef.value.contains(e.target)
  ) {
    state.isShow = false
  }
}
// 滑块下拉到最下面设置一个标记，将isEnd设置为true
// slideEnd() {
//     const treeDoc = this.$refs.treeRef;
//     if (
//         treeDoc.scrollTop + treeDoc.clientHeight >=
//         treeDoc.scrollHeight
//     ) {
//         this.isEnd = true;
//     } else {
//         this.isEnd = false;
//     }
// },
const loadingMore = () => {
  if (isTreeMore.value && treeNum.value >= 5 && state.loadKey) {
    state.loadKey = 0
    console.log('要加载吗')
    // this.inLoading = { position: "inherit", bottom: 0 };
    // this.$refs.draggableRef.iscrollRefresh()
    setTimeout(() => {
      // this.inLoading = { position: "absolute", bottom: -40 + 'px' };
      console.log('加载了哦')
      emits('loadMore')
      // this.isEnd = false;
      state.loadKey = 1
    }, 100)
  }
}
const inputSearch = (value: any) => {
  state.isShow = true
  emits('inputClick', value)
}
</script>

<style scoped>
/* @import "../../assets/css/icons.css"; */
.dropdown-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 7px;

  width: 210px;
  height: 36px;
}
.dropdown-input {
  inset-inline: none;
  border: none;
  outline: none;
  display: block;
  /* display: flex;
  align-items: center; */
  padding: 0;
  height: 18px;
  /* border: 1px solid #000; */
  line-height: 18px;
}
.dropdown-input::-webkit-input-placeholder {
  line-height: normal;
  font-size: 12px;
}
.dropdown-input::-ms-input-placeholder {
  line-height: normal;
  font-size: 12px;
}

.dropdown-input[type='search']::-webkit-search-cancel-button {
  -webkit-appearance: none;
}
.drag {
  height: auto;
  /* height: 250px; */
  width: 208px;
  overflow: hidden;
  transform: rotate(0deg);
  max-height: 210px;
  position: absolute;
  background-color: #fff;
  box-shadow: 0px 2px 10px 0px #c5c9cf80;
  border-radius: 10px;
  margin-top: 8px;
  transition: 0.2s;
  /* overflow: hidden; */
  overflow-y: auto;
}
.tree-main {
  /* height: 300px; */
  /* max-height: 250px; */
  width: auto;

  z-index: 1;
  position: relative;
}
.icon-triangle {
  width: 6px;
  height: 6px;
  border-top: 3px solid transparent;
  border-left: 3px solid transparent;
  border-right: 3px solid #2c2d30;
  border-bottom: 3px solid #2c2d30;
  box-sizing: border-box;
  margin-right: 12px;
  transform: rotate(-45deg);
  transition: 0.4s;
}
.icon-open {
  transform: rotate(45deg);
}
.drop-enter-active {
  animation: drop-anim 0.2s;
}
.drop-leave-active {
  animation: drop-anim 0.2s reverse;
}
@keyframes drop-anim {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
}
/* .drop-enter-active,
.drop-leave-active {
  transform: translateY(0);
  opacity: 0;
}
.drop-enter-from,
.drop-leave-to {
  transform: translateY(-20px);
  opacity: 1;
} */
.loading {
  height: 40px;
  width: 100%;
  position: absolute;
  bottom: -40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #bec1c6;
  font-size: 12px;
  z-index: 100;
}
.loading-icon {
  animation: icon-anim 0.8s linear infinite;
}
@keyframes icon-anim {
  to {
    transform: rotate(360deg);
  }
}
</style>
