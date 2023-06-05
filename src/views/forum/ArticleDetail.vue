<template>
    <div v-if="Object.keys(articleInfo).length > 0" class="container-body article-detail-body"
        :style="{ width: proxy.globalInfo.bodyWidth + 'px' }">
        <!-- 板块信息 -->
        <div class="board-info">
            <router-link class="a-link" :to="`/forum/${articleInfo.pBoardId}`">{{ articleInfo.pBoardName }}</router-link>
            <span class="iconfont icon-right"></span>
            <!-- 没有二级板块 -->
            <template v-if="articleInfo.boardId">
                <router-link class="a-link" :to="`/forum/${articleInfo.pBoardId}/${articleInfo.boardId}`">
                    {{ articleInfo.boardName }}
                </router-link>
                <span class="iconfont icon-right"></span>
            </template>
            <span>{{ articleInfo.title }}</span>
        </div>
        <!-- 文章详情 -->
        <div class="detail-container" :style="{ width: proxy.globalInfo.bodyWidth - 300 + 'px' }">
            <div class="article-detail">
                <div class="title">{{ articleInfo.title }}</div>
                <div class="user-info">
                    <Avatar :userId="articleInfo.userId" :width="50"></Avatar>
                    <div class="user-info-detail">
                        <router-link :to="`/user/${articleInfo.userId}`" class="nick-name">{{ articleInfo.nickName
                        }}</router-link>
                        <div class="time-info">
                            <span>{{ articleInfo.postTime }}</span>
                            <span class="address">&nbsp;&nbsp;{{ articleInfo.userIpAddress }}</span>
                            <span class="iconfont icon-eye-solid">
                                {{ articleInfo.readCount == 0 ? '阅读' : articleInfo.readCount }}
                            </span>
                        </div>
                    </div>
                </div>
                <div class="detail" id="detail" v-html="articleInfo.content"></div>
            </div>
        </div>
        <!-- 附件 id作为描点 -->
        <div class="attachment-panel" v-if="attachment" id="view-attachment"
            :style="{ width: proxy.globalInfo.bodyWidth - 300 + 'px' }">
            <div class="title">附件</div>
            <div class="attachment-info">
                <div class="iconfont icon-zip"></div>
                <div class="file-name">{{ attachment.fileName }}</div>
                <div class="size">{{ attachment.fileSize }}</div>
                <div>需要
                    <span class="integral">{{ attachment.integral }}</span>积分
                </div>
                <div class="download-count">已下载{{ attachment.downloadCount }}次</div>
                <div class="download-btn">
                    <el-button type="primary" size="small">下载</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const api = {
    getArticleDetail: '/forum/getArticleDetail'
}

const articleInfo = ref({}) // 文章详情
const attachment = ref({}) // 附件
const getArticleDetail = async (articleId) => {
    let result = await proxy.Request({
        url: api.getArticleDetail,
        params: {
            articleId: articleId
        }
    })

    if (!result) return;
    articleInfo.value = result.data.forumArticle;
    attachment.value = result.data.attachment;
}

onMounted(() => {
    getArticleDetail(route.params.articleId);
})
</script>

<style lang="scss">
.article-detail-body {

    .board-info {
        line-height: 40px;

        .icon-right {
            margin: 0 10px;
        }
    }

    .detail-container {
        .article-detail {
            background: #fff;
            padding: 15px;

            .title {
                font-weight: bolder;
            }

            .user-info {
                margin-top: 15px;
                display: flex;
                border-bottom: 1px solid #ddd;
                padding-bottom: 10px;

                .user-info-detail {
                    margin-left: 10px;

                    .nick-name {
                        text-decoration: none;
                        color: #4e5969;
                        font-size: 15px;
                    }

                    .nick-name:hover {
                        color: var(--link);
                    }

                    .time-info {
                        margin-top: 5px;
                        font-size: 13px;
                        color: var(--text2);

                        .iconfont {
                            margin-left: 10px;
                        }

                        .iconfont::before {
                            padding-right: 3px;
                        }
                    }
                }
            }

            .detail {
                letter-spacing: 2px; // 字体间距
                line-height: 25px; // 行间距

                a {
                    text-decoration: none;
                    color: var(--link);
                }

                img {
                    max-width: 90%;
                    cursor: pointer;

                }
            }
        }
    }

    .attachment-panel {
        background: #fff;
        margin-top: 20px;
        padding: 20px;

        .title {
            font-size: 18px;
        }

        .attachment-info {
            display: flex;
            align-items: center;
        }
    }
}
</style>
