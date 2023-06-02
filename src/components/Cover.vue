<template>
    <div class="cover" :style="{ width: width + 'px', height: width + 'px' }">
        <el-image :style="{ width: width + 'px', height: width + 'px' }" :src="proxy.globalInfo.imageUrl + cover"
            fit="scale-down" :lazy="true">

        </el-image>
    </div>
</template>

<script setup>
import { getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

// 用下面可以使用本地默认封面
// const localCover = new URL('@/assets/default_cover.png', import.meta.url).href;   

const props = defineProps({
    cover: {
        type: String,
    },
    width: {
        type: Number,
        default: 60
    }
})
</script>

<style lang="scss">
.cover {
    background: #ddd;
    border-radius: 5px;
    overflow: hidden;
}
</style>
