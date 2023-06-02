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
          <span :style="{ 'margin-left': '10px' }">全部</span>
          <template v-for="board in boardList">
            <el-popover v-if="board.children.length > 0" placement="bottom-start" title="" width="200" trigger="hover">
              <template #reference>
                <span class="menu-item">{{ board.boardName }}</span>
              </template>
              <!-- 二级板块 -->
              <div class="sub-board-list">
                <span class="sub-board" v-for="subBoard in board.children">
                  {{ subBoard.boardName }}
                </span>
              </div>
            </el-popover>
            <span v-else class="menu-item">{{ board.boardName }}</span>
          </template>
        </div>
        <!-- 登录/注册/用户信息 -->
        <div class="user-info-panel">
          <el-button type="primary" @click="" class="op-btn">
            发帖<span class="iconfont icon-add" />
          </el-button>
          <el-button type="primary" @click="" class="op-btn">
            搜索<span class="iconfont icon-search" />
          </el-button>
          <!-- 显示用户信息 -->
          <template v-if="userInfo.userId">
            <div class="message-info">
              <el-dropdown>
                <el-badge :value="12" class="item">
                  <div class="iconfont icon-message"></div>
                </el-badge>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>回复我的</el-dropdown-item>
                    <el-dropdown-item>赞了我的文章</el-dropdown-item>
                    <el-dropdown-item>下载我的附件</el-dropdown-item>
                    <el-dropdown-item>赞了我的评论</el-dropdown-item>
                    <el-dropdown-item>系统消息</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <div class="user-info">
              <el-dropdown>
                <Avatar :userId="userInfo.userId" :width="45"></Avatar>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item>我的主页</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
          <el-button-group v-else :style="{ 'margin-left': '10px' }">
            <el-button type="primary" @click="loginAndRegister(1)" plain>登录</el-button>
            <el-button type="primary" @click="loginAndRegister(0)" plain>注册</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    <div class="body-content">
      <router-view />
      <!-- <div v-for="item in 100">{{ item }}</div> -->
    </div>
    <!-- 登录注册 -->
    <LoginAndRegister ref="loginRegisterRef"></LoginAndRegister>
  </div>
</template>

<script setup>
import LoginAndRegister from "./LoginAndRegister.vue";
import { ref, reactive, getCurrentInstance, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex"
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store = useStore();

const api = {
  getUserInfo: '/getUserInfo',
  loadBoard: '/board/loadBoard',
}

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

// 登录注册
const loginRegisterRef = ref();
const loginAndRegister = (type) => {
  loginRegisterRef.value.showPanel(type)
}

onMounted(() => {
  initScroll();
  getUserInfo();
})

// 获取用户信息
const getUserInfo = async () => {
  let result = await proxy.Request({
    url: api.getUserInfo,
  })
  if (!result) return;
  store.commit('updateLoginUserInfo', result.data)
}

// 获取板块信息
const boardList = ref([])
const loadBoard = async () => {
  let result = await proxy.Request({
    url: api.loadBoard
  });
  if (!result) return;
  boardList.value = result.data
}

loadBoard();

// 监听 登录用户信息
const userInfo = ref({})
watch(() => store.state.loginUserInfo,
  (newVal, oldVal) => {
    if (newVal != undefined && newVal != null) {
      userInfo.value = newVal
    }
    else {
      userInfo.value = {}
    }
  }, { immediate: true, deep: true });

// 监听是否展示登录框
watch(() =>
  store.state.showLogin,
  (newVal, oldVal) => {
    if (newVal) {
      loginAndRegister(1);
    }
  }, { immediate: true, deep: true });
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

      .menu-item {
        margin-left: 20px;
        cursor: pointer;
      }
    }

    .user-info-panel {
      width: 300px;
      display: flex;
      align-items: center;

      .op-btn {
        .iconfont {
          margin-left: 3px;
        }
      }

      .message-info {
        .icon-message {
          font-size: 25px;
          color: rgb(147, 147, 147);
        }

        cursor: pointer;
        margin: 0 25px 0 5px;
      }

      .user-info {}
    }
  }
}

.sub-board-list {
  display: flex;
  flex-wrap: wrap;

  .sub-board {
    padding: 0px 10px;
    border-radius: 20px;
    margin-right: 10px;
    background: rgb(239, 239, 239);
    border: 1px solid #ddd;
    color: rgb(119, 118, 118);
    margin-top: 5px;
    cursor: pointer;
  }

  .sub-board:hover {
    color: var(--link);
  }
}
</style>
