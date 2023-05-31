<template>
    <div>
        <Dialog :show="dialogConfig.show" :titile="dialogConfig.title" :buttons="dialogConfig.buttons" width="400px"
            :showCancel="false" @close="dialogConfig.show = false">
            <el-form class="login-register" :model="formData" ref="formDataRef" :rules="rules">
                <el-form-item prop="email">
                    <el-input v-model="formData.email" placeholder="请输入邮箱" clearable size="large">
                        <template #prefix>
                            <span class="iconfont icon-account"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkCode">
                    <div class="send-email-panel">
                        <el-input v-model="formData.checkCode" placeholder="请输入验证码" clearable size="large">
                            <template #prefix>
                                <span class="iconfont icon-checkcode"></span>
                            </template>
                        </el-input>
                        <el-button class="send-email-btn" type="primary" size="large" @click="">获取验证码</el-button>
                    </div>
                </el-form-item>
                <el-form-item prop="nikeName">
                    <el-input v-model="formData.nikeName" placeholder="请输入昵称" clearable size="large">
                        <template #prefix>
                            <span class="iconfont icon-account"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="formData.password" placeholder="请输入密码" clearable size="large">
                        <template #prefix>
                            <span class="iconfont icon-password"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="repassword">
                    <el-input v-model="formData.repassword" placeholder="请确认密码" clearable size="large">
                        <template #prefix>
                            <span class="iconfont icon-password"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="checkCode">
                    <div class="check-code-panel">
                        <el-input v-model="formData.checkCode" placeholder="请输入验证码" clearable size="large">
                            <template #prefix>
                                <span class="iconfont icon-checkcode"></span>
                            </template>
                        </el-input>
                        <img :src="checkCodeUrl" class="check-code" @click="changeCheckCode(0)">
                    </div>
                </el-form-item>
                <el-form-item>
                    <div class="rememberme-panel">
                        <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
                    </div>
                    <div class="no-account">
                        <a href="javascript:void(0)" class="a-link">忘记密码？</a>
                        <a href="javascript:void(0)" class="a-link">没有账号？</a>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="op-btn" @click="">登录</el-button>

                </el-form-item>
            </el-form>

        </Dialog>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from "vue";
import { useRouter, useRoute } from "vue-router";
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();

const api = {
    checkCode: "/api/checkCode"
}

// 0 注册  1 登录  2 找回密码
const opType = ref()

const showPanel = (type) => {
    opType.value = type
}

defineExpose({ showPanel })

// 验证码
const checkCodeUrl = ref(api.checkCode);
const changeCheckCode = (type) => {
    checkCodeUrl.value = api.checkCode + '?type=' + type + "&time=" + new Date().getTime();
}

const dialogConfig = reactive({
    show: true,
    titile: '标题',
});

const formData = ref({});
const formDataRef = ref();
const rules = {
    title: [{ required: true, message: '请输入内容' }],
}

// 验证码刷新

</script>

<style lang="scss">
.login-register {

    .send-email-panel {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .send-email-btn {
            margin-left: 5px;
        }
    }

    .check-code-panel {
        display: flex;

        .check-code {
            margin-left: 5px;
            cursor: pointer;
        }
    }

    .rememberme-panel {
        width: 100%;
    }

    .no-account {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .op-btn {
        width: 100%;
    }
}
</style>
