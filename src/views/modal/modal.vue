<template>
  <div class="views-main">
    <button @click="state.showModal = true">弹出对话框</button>
    <o-modal 
      :open="state.showModal" 
      @close="state.showModal = false"
      height="428px"
      width="640px">
      <div class="login-bar">
        <p>登录</p>
        <p>请输入账号密码登录</p>
        <div class="form-bar">
          <form>
            <o-table-search placeholder="请输入账号..."></o-table-search>
            <o-table-search placeholder="请输入登录密码..."></o-table-search>
            <div class="submit">
              <div class="lad-contact submit-button">注册</div>
              <div class="lab-login submit-button">登录</div>
            </div>
          </form>
        </div>
      </div>
    </o-modal>
  </div>
</template>

<script setup lang="ts">
import OModal from '@/components/modal/modal.vue'
import OTableSearch from '@/components/search/search.vue'
import { reactive } from 'vue'

const state = reactive({
  showModal: false
})
</script>

<style scoped lang="less">
.modal-view-main {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-bar {
  height: 100%;
  padding: 30px 40px 0 40px;
  box-sizing: border-box;
  & p:nth-child(1) {
    font-size: 28px;
    color: #27282B;
    line-height: 38px;
    margin-bottom: 8px;
    font-weight: 600;
  }
  & p:nth-child(2) {
    font-size: 16px;
    color: #27282B;
    line-height: 22px;
    margin-bottom: 34px;
  }
  .form-bar {
    margin: 0 44px;
    .submit {
      display: flex;
      justify-content: space-between;
      position: relative;
      img {
        width: 142px;
      }
      .lad-contact {
        width: 145px;
        color: var(--theme);
        background: #E3EDF8;
      }
      .lab-login {
        width: 300px;
      }
      & /deep/ .tooltip {
        border-radius: 5px;
        margin-bottom: 40px;
        // img {
        //   width: 120px;
        // } 
      }
    }
  }
}
.form-bar /deep/ .search-main {
  height: 56px;
  border: 1px solid #E9E9E9;
  background: #F8F7F8;
  margin-bottom: 35px;
  border-radius: 8px;
}
.form-bar /deep/ .inputting {
  border-color: var(--theme);
  background: #F8F7F8;
}
.submit-button {
  background: var(--theme);
  height: 56px;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 16px;
  transition: .4s;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: var(--theme-o9);
  }
}
</style>