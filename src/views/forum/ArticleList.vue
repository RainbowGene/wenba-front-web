<template>
    <div class="container-body article-list-body" :style="{ width: proxy.globalInfo.bodyWidth + 'px' }">
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
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";
import ArticleListItem from "./ArticleListItem.vue"
// import { loadArticleList } from "@/utils/Api.js"
const { proxy } = getCurrentInstance();
const router = useRouter();

const api = {
    loadArticle: '/forum/loadArticle',
}

const changeOrderType = (type) => {
    orderType.value = type
    loadArticle()
}

// 文章列表
const loading = ref(false)
const orderType = ref(0)  // 0 热门  1 时间  2 最新
const articleListInfo = ref({})

const loadArticle = async () => {
    loading.value = true
    let params = {
        pageNo: articleListInfo.value.pageNo,
        boarId: 0,
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

loadArticle()
</script>

<style lang="scss" scoped>
.article-list-body {
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
