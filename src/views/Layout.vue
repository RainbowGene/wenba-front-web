<template>
  <div>
    <div class="header" v-if="showHeader">
      <div class="header-content" :style="{ width: proxy.globalInfo.bodyWidth + 'px' }">
        <!-- logo -->
        <router-link to="/" class="logo">
          <span v-for="(item, i) in logoInfo" :key="i" :style="{ color: item.color }">{{ item.letter }}</span>
        </router-link>
        <!-- 板块 -->
        <div class="menu-panel">

        </div>
        <!-- 登录/注册/用户信息 -->
        <div class="user-info-panel">
          <el-button type="primary" @click="" class="op-btn">
            发帖<span class="iconfont icon-add" />
          </el-button>
          <el-button type="primary" @click="" class="op-btn">
            搜索<span class="iconfont icon-search" />
          </el-button>
          <el-button-group :style="{ 'margin-left': '10px' }">
            <el-button type="primary" @click="loginRegister(1)" plain>登录</el-button>
            <el-button type="primary" @click="loginRegister(0)" plain>注册</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <Dialog :show="showDialog" :buttons="buttons" @close="showDialog = false">
      我是内容
    </Dialog>
    <div class="body-content" style="padding-top: 60px;">
      <router-view />
      <!-- <div v-for="item in 100">{{ item }}</div> -->
    </div>
    <!-- 登录注册 -->
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
  </div>
</template>

<script setup>
import LoginAndRegister from "./LoginAndRegister.vue";
import { ref, reactive, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const logoInfo = ref([
  { letter: 'W', color: 'blue' },
  { letter: 'e', color: 'red' },
  { letter: 'n', color: 'green' },
  { letter: 'b', color: 'blue' },
  { letter: 'a', color: 'red' },
])

const showHeader = ref(true);

//获取滚动条的高度
const getScrollTop = () => {
  let scrollTop =
    document.documentElement.scrollTop ||
    window.pageYOffset ||
    document.body.scrollTop;
  return scrollTop;
};

const initScroll = () => {
  let initScrollTop = getScrollTop();
  let scrollType = 0;
  window.addEventListener('scroll', () => {
    let currentScrollTop = getScrollTop();
    // console.log(currentScrollTop);
    if (currentScrollTop > initScrollTop) {
      // 往下滚动
      scrollType = 1
    }
    else {
      // 往上滚动
      scrollType = 0
    }
    initScrollTop = currentScrollTop;
    if (scrollType == 1 & currentScrollTop > 200) {
      showHeader.value = false
    }
    else {
      showHeader.value = true
    }
  })
}

const showDialog = ref(false)

const buttons = [{
  text: "确定",
  type: 'primary',
}]

// 登录注册
const loginRegisterRef = ref();
const loginRegister = (type) => {
  loginRegisterRef.value.showPanel(type)
}

onMounted(() => {
  initScroll();
})
</script>

<style lang="scss">
.header {
  width: 100%;
  position: fixed;
  box-shadow: 0 2px 6px 0;
  z-index: 1000;

  .header-content {
    margin: 0px auto;
    align-items: center;
    height: 60px;
    display: flex;

    .logo {
      display: block;
      text-decoration: none;
      margin-right: 5px;
      font-size: 30px;
    }

    .menu-panel {
      flex: 1;
    }

    .user-info-panel {
      width: 300px;
      display: flex;

      .op-btn {
        .iconfont {
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
