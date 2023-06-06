<template>
  <div class="article-item">
    <div class="article-item-inner">
      <div class="article-body">
        <div class="user-info">
          <Avatar :userId="data.userId" width="30" />
          <router-link class="link-info" :to="'/user/' + data.userId">{{ data.nickName }}</router-link>
          <el-divider direction="vertical" />
          <div class="post-time">{{ data.postTime }}</div>
          <div class="address">&nbsp;·&nbsp;{{ data.userIpAddress }}</div>
          <el-divider direction="vertical" />
          <router-link :to="`/forum/${data.pBoardId}`" class="link-info">{{ data.pBoardName }}</router-link>
          <template v-if="data.boardName">
            <span>&nbsp;/&nbsp;</span>
            <router-link :to="`/forum/${data.pBoardId}/${data.boardId}`" class="link-info">{{ data.boardName
            }}</router-link>
          </template>
        </div>
        <router-link class="title" :to="`/post/${data.articleId}`">
          <span v-if="data.topType == 1" class="top">置顶</span>
          <span class="title-info">{{ data.title }}</span>
        </router-link>
        <div class="summary">{{ data.summary }}</div>
        <div class="article-info">
          <span class="iconfont icon-eye-solid">{{ data.readCount == 0 ? "阅读" : data.readCount }}</span>
          <span class="iconfont icon-good">{{ data.goodCount == 0 ? "点赞" : data.goodCount }}</span>
          <span class="iconfont icon-comment">{{ data.commentCount == 0 ? "评论" : data.commentCount }}</span>
        </div>
      </div>
      <!-- 封面 -->
      <RouterLink :to="`/post/${data.articleId}`">
        <Cover v-if="data.cover" :cover="data.cover" :width="100"></Cover>
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Object,
  },

})
</script>

<style lang="scss">
.article-item {
  padding: 5px 10px 0 10px;

  .article-item-inner {
    border-bottom: 1px solid #ddd;
    padding: 10px 3px;
    display: flex;

    .article-body {
      flex: 1;

      .user-info {
        display: flex;
        align-items: center;
        font-size: 14px;
        color: #4e5969;

        .link-info {
          margin-left: 5px;
          color: #494949;
          text-decoration: none;
        }

        .link-info:hover {
          color: var(--link);
        }

        .post-time {
          font-size: 13px;
          color: #494949;
        }
      }

      .title {
        font-weight: bold;
        text-decoration: none;
        color: #4a4a4a;
        font-size: 18px;
        margin: 10px 0;
        display: inline-block;

        .top {
          font-weight: normal;
          font-size: 12px;
          border-radius: 5px;
          border: 1px solid var(--pink);
          color: var(--pink);
          padding: 0 5px;
          margin-right: 10px;
        }
      }

      .summary {
        width: 65%;
        font-size: 14px;
        color: #86909c;
        /*让长段文本不换行*/
        white-space: nowrap;
        /*设置文本超出元素宽度部分隐藏*/
        overflow-x: hidden;
        /*设置文本超出部分用省略号显示*/
        text-overflow: ellipsis;
      }

      .article-info {
        margin-top: 10px;
        display: flex;
        align-items: center;
        font-size: 13px;

        .iconfont {
          color: #86909c;
          margin-right: 25px;
          font-size: 14px;
        }

        .iconfont:before {
          padding-right: 3px;
        }
      }
    }
  }
}

.article-item:hover {
  background: #fffbfb;
}
</style>
