<template>
    <div>
        <!--class="cust-dialog" -->
        <el-dialog :title="title" :model-value="show" :width="width" :show-close="showClose" draggable
            :close-on-click-modal="false" class="cust-dialog" :top="top" @close="close">
            <div class="dialog-body">
                <slot></slot>
            </div>
            <template v-if="(buttons && buttons.length > 0) || showCancel">
                <div class="dialog-footer">
                    <el-button link @click="close" v-if="showCancel">取消</el-button>
                    <el-button v-for="btn in buttons" :type="btn.type" @click="btn.click">
                        {{ btn.text }}
                    </el-button>
                </div>
            </template>
        </el-dialog>

    </div>
</template>

<script setup>
const props = defineProps({
    show: {
        type: Boolean,
        default: true,
    },
    title: {
        typeof: "string",
        default: "标题",
    },
    showClose: {
        type: Boolean,
        default: true,
    },
    width: {
        type: String,
        default: "30%",
    },
    top: {
        type: String,
        default: "50px",
    },
    buttons: {
        type: Array,
    },
    showCancel: {
        type: Boolean,
        default: true,
    }
})

const emit = defineEmits()
const close = () => {
    emit("close");
}

</script>

<style lang="scss">
.cust-dialog {
    margin-bottom: 10px !important;

    .el-dialog__body {
        padding: 0px !important;
    }

    .dialog-body {
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        padding: 15px;
        min-height: 100px;
        max-height: calc(100vh - 100px);
        overflow: auto;
    }

    .dialog-footer {
        text-align: right;
        padding: 10px 20px;
    }
}
</style>
