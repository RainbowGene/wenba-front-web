<template>
    <div>
        <Dialog :show="dialogConfig.show" :title="dialogConfig.title" :buttons="dialogConfig.buttons" width="400px"
            :showCancel="false" @close="dialogConfig.show = false">
            <el-form class="login-register" :model="formData" ref="formDataRef" :rules="rules">
                <el-form-item prop="email">
                    <el-input v-model="formData.email" maxLength="150" placeholder="请输入邮箱" clearable size="large">
                        <template #prefix>
                            <span class="iconfont icon-account"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- 登录使用的密码框 -->
                <el-form-item prop="password" v-if="opType == 1">
                    <el-input v-model="formData.password" placeholder="请输入密码" clearable
                        :type="passwordEyeType.passwordEyeOpen ? 'text' : 'password'" size="large">
                        <template #prefix>
                            <span class="iconfont icon-password"></span>
                        </template>
                        <template #suffix>
                            <span @click="eyeChange('passwordEyeOpen')"
                                :class="['iconfont', passwordEyeType.passwordEyeOpen ? 'icon-eye' : 'icon-close-eye']"></span>
                        </template>
                    </el-input>
                </el-form-item>
                <!-- 注册 -->
                <div v-if="opType == 0 || opType == 2">
                    <el-form-item prop="emailCode">
                        <div class="send-email-panel">
                            <el-input v-model="formData.emailCode" placeholder="请输入邮箱验证码" clearable size="large">
                                <template #prefix>
                                    <span class="iconfont icon-checkcode"></span>
                                </template>
                            </el-input>
                            <el-button class="send-email-btn" type="primary" size="large"
                                @click="showSendMailDialog">获取验证码</el-button>
                        </div>
                        <el-popover placement="left" width="450" trigger="click">
                            <div>
                                <p>1,垃圾箱中查看</p>
                                <p>2,在邮箱中头像->设置->反垃圾->白名单->设置邮件白名单</p>
                                <p>3,将邮箱[1767386755@qq.com]添加到白名单</p>
                                <!-- <a href="" target="_blank">不知道怎么设置？</a> -->
                            </div>
                            <template #reference>
                                <span class="a-link" :style="{ 'font-size': '14px' }">
                                    未收到邮箱验证码？
                                </span>
                            </template>
                        </el-popover>

                    </el-form-item>
                    <el-form-item v-if="opType == 0" prop="nickName">
                        <el-input v-model="formData.nickName" placeholder="请输入昵称" maxLength="16" clearable size="large">
                            <template #prefix>
                                <span class="iconfont icon-account"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="registerPassword">
                        <el-input v-model="formData.registerPassword"
                            :type="passwordEyeType.registerPasswordEyeOpen ? 'text' : 'password'" placeholder="请输入密码"
                            clearable size="large">
                            <template #prefix>
                                <span class="iconfont icon-password"></span>
                            </template>
                            <template #suffix>
                                <span @click="eyeChange('registerPasswordEyeOpen')"
                                    :class="['iconfont', passwordEyeType.registerPasswordEyeOpen ? 'icon-eye' : 'icon-close-eye']"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="reRegisterPassword">
                        <el-input v-model="formData.reRegisterPassword"
                            :type="passwordEyeType.reRegisterPasswordEyeOpen ? 'text' : 'password'" placeholder="请确认密码"
                            clearable size="large">
                            <template #prefix>
                                <span class="iconfont icon-password"></span>
                            </template>
                            <template #suffix>
                                <span @click="eyeChange('reRegisterPasswordEyeOpen')"
                                    :class="['iconfont', passwordEyeType.reRegisterPasswordEyeOpen ? 'icon-eye' : 'icon-close-eye']"></span>
                            </template>
                        </el-input>
                    </el-form-item>
                </div>
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
                <el-form-item v-if="opType == 1">
                    <div class="rememberme-panel">
                        <el-checkbox v-model="formData.rememberMe">记住我</el-checkbox>
                    </div>
                    <div class="no-account">
                        <a href="javascript:void(0)" class="a-link" @click="showPanel(2)">忘记密码？</a>
                        <a href="javascript:void(0)" class="a-link" @click="showPanel(0)">没有账号？</a>
                    </div>
                </el-form-item>
                <el-form-item v-if="opType == 0">
                    <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">已有账号</a>
                </el-form-item>
                <el-form-item v-if="opType == 2">
                    <a href="javascript:void(0)" class="a-link" @click="showPanel(1)">去登陆</a>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="op-btn" @click="doSubmit">
                        <span v-if="opType == 1">登 录</span>
                        <span v-if="opType == 0">注 册</span>
                        <span v-if="opType == 2">重置密码</span>
                    </el-button>
                </el-form-item>
            </el-form>

        </Dialog>
        <!-- 邮箱验证码弹窗 -->
        <Dialog :show="dialogConfig4SendMailCode.show" :titile="dialogConfig4SendMailCode.title"
            :buttons="dialogConfig4SendMailCode.buttons" width="500px" :showCancel="false"
            @close="dialogConfig4SendMailCode.show = false">
            <el-form :model="formData4SendMailCode" ref="formData4SendMailCodeRef" :rules="rules" label-width="80px">
                <el-form-item label="邮箱">
                    {{ formData.email }}
                </el-form-item>
                <el-form-item label="验证码" prop="checkCode">
                    <div class="check-code-panel">
                        <el-input v-model="formData4SendMailCode.checkCode" placeholder="请输入验证码" clearable size="large">
                            <template #prefix>
                                <span class="iconfont icon-checkcode"></span>
                            </template>
                        </el-input>
                        <img :src="checkCodeUrl4SendMailCode" class="check-code" @click="changeCheckCode(1)">
                    </div>
                </el-form-item>
            </el-form>
        </Dialog>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import md5 from "js-md5";
import { useStore } from "vuex"
const { proxy } = getCurrentInstance();
const router = useRouter();
const route = useRoute();
const store = useStore();

const api = {
    checkCode: "/api/checkCode",
    sendMailCode: "/sendEmailCode",
    register: "/register",
    login: "/login",
    resetPwd: "/resetPwd",
}

// 0 注册  1 登录  2 找回密码
const opType = ref()

const showPanel = (type) => {
    opType.value = type;
    resetForm();
}

defineExpose({ showPanel })

// 验证码
const checkCodeUrl4SendMailCode = ref(api.checkCode);
const checkCodeUrl = ref(api.checkCode);
const changeCheckCode = (type) => {
    if (type == 0) {
        checkCodeUrl.value = api.checkCode + '?type=' + type + "&time=" + new Date().getTime();
    }
    else { // 验证弹框的图片验证码
        checkCodeUrl4SendMailCode.value = api.checkCode + '?type=' + type + "&time=" + new Date().getTime();
    }
}

// 密码显/隐藏
const passwordEyeType = reactive({
    passwordEyeOpen: false,
    registerPasswordEyeOpen: false,
    reRegisterPasswordEyeOpen: false,
})

const eyeChange = (type) => {
    passwordEyeType[type] = !passwordEyeType[type];
}

// 发送邮箱验证码弹窗
const formData4SendMailCode = ref({});
const formData4SendMailCodeRef = ref();
const dialogConfig4SendMailCode = reactive({
    show: false,
    title: '发送邮箱验证码',
    buttons: [{
        type: 'primary',
        text: "发送验证码",
        click: () => {
            sendEmailCode()
        }
    }]
});

const showSendMailDialog = () => {
    formDataRef.value.validateField('email', (valid) => {
        if (!valid) return;
        dialogConfig4SendMailCode.show = true
        nextTick(() => {
            changeCheckCode(1);
            formData4SendMailCodeRef.value.resetFields()
            formData4SendMailCode.value = { email: formData.value.email }
        })
    })
}

// 发送邮件
const sendEmailCode = () => {
    formData4SendMailCodeRef.value.validate(async (valid) => {
        if (!valid) {
            return;
        }
        const params = Object.assign({}, formData4SendMailCode.value);
        params.type = opType.value == 0 ? 0 : 1;
        let result = await proxy.Request({
            url: api.sendMailCode,
            params: params,
            errorCallback: () => {
                changeCheckCode(1);
            },
        });
        if (!result) {
            return;
        }
        proxy.Message.success("验证码发送成功，请登录邮箱查看");
        dialogConfig4SendMailCode.show = false;
    });
};

//登录，注册 弹出配置
const dialogConfig = reactive({
    show: false,
    title: '标题',
});

const checkRePassword = (rule, value, callback) => {
    if (value !== formData.value.registerPassword) {
        callback(new Error(rule.message))
    }
    else {
        callback()
    }
}

const formData = ref({});
const formDataRef = ref();
const rules = {
    email: [{ required: true, message: '请输入邮箱' },
    { validator: proxy.Verify.email, message: '请输入正确的邮箱地址' }],
    password: [{ required: true, message: '请输入密码' }],
    emailCode: [{ required: true, message: '请输入邮箱验证码' }],
    nickName: [{ required: true, message: '请输入昵称' }],
    registerPassword: [{ required: true, message: '请输入密码' },
    { validator: proxy.Verify.password, message: '密码只能是数字/字母/特殊字符' }],
    reRegisterPassword: [{ required: true, message: '请再次输入密码' },
    { validator: checkRePassword, message: '两次输入密码不一致' }],
    checkCode: [{ required: true, message: '请输入图形验证码' }],
}

// 重置表单
const resetForm = () => {
    dialogConfig.show = true
    if (opType.value == 0) {
        dialogConfig.title = '注 册'
    }
    else if (opType.value == 1) {
        dialogConfig.title = '登 录'
    }
    else if (opType.value == 2) {
        dialogConfig.title = '重置密码'
    }
    nextTick(() => {
        changeCheckCode(0)  // 刷新验证码
        formDataRef.value.resetFields()
        formData.value = {}

        // 登录
        if (opType.value == 1) {
            const cookieLoginInfo = proxy.VueCookies.get("loginInfo")
            if (cookieLoginInfo) {
                formData.value = cookieLoginInfo;
            }
        }
    })
}

// 登录/注册/重置密码 提交表单
const doSubmit = () => {
    formDataRef.value.validate(async (valid) => {
        if (!valid) return;
        let params = {};
        Object.assign(params, formData.value);
        // 注册
        if (opType.value == 0 || opType.value == 2) {
            params.password = params.reRegisterPassword;
            delete params.reRegisterPassword
            delete params.registerPassword
        }
        // 登录
        if (opType.value == 1) {
            let cookieLoginInfo = proxy.VueCookies.get("loginInfo")
            let cookiePasswrod = cookieLoginInfo == null ? null : cookieLoginInfo.password
            if (params.password !== cookiePasswrod) {
                params.password = md5(params.password)
            }
        }
        let url = null;
        if (opType.value == 0) {
            url = api.register
        } else if (opType.value == 1) {
            url = api.login
        } else if (opType.value == 2) {
            url = api.resetPwd
        }
        let result = await proxy.Request({
            url, params,
            errorCallback: () => {
                changeCheckCode(0)
            }
        })

        if (!result) return;
        if (opType.value == 0) { // 注册返回
            proxy.Message.success('注册成功，请登录')
            showPanel(1)
        }
        else if (opType.value == 1) { // 登录返回
            if (params.rememberMe) {
                const loginInfo = {
                    email: params.email,
                    password: params.password,
                    rememberMe: params.rememberMe,
                }
                proxy.VueCookies.set('loginInfo', loginInfo, "7d")
            }
            else {
                proxy.VueCookies.remove('loginInfo')
            }
            dialogConfig.show = false
            proxy.Message.success('登录成功！')
            store.commit('updateLoginUserInfo', result.data)  // 更新
        }
        else if (opType.value == 2) { // 重置密码
            proxy.Message.success('密码设置成功，请重新登录')
            showPanel(1)
        }
    })
}

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

.check-code-panel {
    display: flex;

    .check-code {
        margin-left: 5px;
        cursor: pointer;
    }
}
</style>
