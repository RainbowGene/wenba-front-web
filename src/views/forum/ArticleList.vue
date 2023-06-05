<template>
    <div class="container-body article-list-body" :style="{ width: proxy.globalInfo.bodyWidth + 'px' }">
        <!-- 二级板块 -->
        <div class="sub-board" v-if="pBoardId">
            <span :class="['board-item', boardId == 0 ? 'active' : '']">
                <router-link :to="`/forum/${pBoardId}`">全部</router-link></span>
            <span v-for="item in subBoardList" :class="['board-item', item.boardId == boardId ? 'active' : '']">
                <router-link :to="`/forum/${item.pBoardId}/${item.boardId}`">{{
                    item.boardName
                }}</router-link>
            </span>
        </div>
        <div class="article-panel">
            <div class="top-tab">
                <div :class="['tab', orderType == 0 ? 'active' : '']" @click="changeOrderType(0)">热榜</div>
                <el-divider direction="vertical" />
                <div :class="['tab', orderType == 1 ? 'active' : '']" @click="changeOrderType(1)">发布时间</div>
                <el-divider direction="vertical" />
                <div :class="['tab', orderType == 2 ? 'active' : '']" @click="changeOrderType(2)">最新</div>
            </div>
            <div class="article-list">
                <DataList :dataSource="articleListInfo" @loadData="loadArticle" :loading="loading"
                    noDataMsg="没有发现文章，赶紧来发布吧！">
                    <template #default="{ data }">
                        <ArticleListItem :data="data"></ArticleListItem>
                    </template>
                </DataList>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { useStore } from "vuex"
import ArticleListItem from "./ArticleListItem.vue"
// import { loadArticleList } from "@/utils/Api.js"
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store = useStore();

const api = {
    loadArticle: '/forum/loadArticle',
}

const changeOrderType = (type) => {
    orderType.value = type
    loadArticle()
}

// 文章列表
// 一级板块
const pBoardId = ref(0)
// 二级板块
const boardId = ref(0)
const loading = ref(false)
const orderType = ref(0)  // 0 热门  1 时间  2 最新
const articleListInfo = ref({})

const loadArticle = async () => {
    loading.value = true
    let params = {
        pageNo: articleListInfo.value.pageNo,
        pBoardId: pBoardId.value,
        boardId: boardId.value,
        orderType: orderType.value
    }
    let result = await proxy.Request({
        url: api.loadArticle,
        params: params,
        showLoading: false
    })
    // let result = await loadArticleList(params)
    loading.value = false
    if (!result) return;
    articleListInfo.value = result.data
    // articleListInfo.value.list = []  // 测试暂无数据的显示
}

// loadArticle()  // 通过路由监听去请求数据，此处可注释掉
 
// 二级板块
const subBoardList = ref([])
const setSubBoard = () => {
    subBoardList.value = store.getters.getSubBoardList(pBoardId.value)
}

// 监听路由变化
watch(() => route.params, (newVal, oldVal) => {
    pBoardId.value = newVal.pBoardId
    boardId.value = newVal.boardId || 0
    setSubBoard()
    loadArticle()
    store.commit('setActivePBoardId', newVal.pBoardId)
    store.commit('setActiveBoardId', newVal.boardId)
}, { immediate: true, deep: true });

// 监听板块数据变化
watch(() => store.state.subBoardList,
    (newVal, oldVal) => {
        setSubBoard()
    }, { immediate: true, deep: true });
</script>

<style lang="scss" scoped>
.article-list-body {

    .sub-board {
        padding: 10px 0px 12px 0px;

        .board-item {
            background: #fff;
            border-radius: 15px;
            padding: 2px 10px;
            margin-right: 10px;
            color: #909090;
            cursor: pointer;
            font-size: 14px;

            a {
                text-decoration: none;
                color: #909090;
            }
        }

        .active {
            background: var(--link);

            a {
                color: #fff;
            }
        }
    }

    .article-panel {
        background: #fff;

        .top-tab {
            display: flex;
            align-items: center;
            padding: 10px;
            font-size: 15px;
            border-bottom: 1px solid #ddd;

            .tab {
                cursor: pointer;
            }

            .active {
                color: var(--link);
            }
        }
    }
}
</style>
