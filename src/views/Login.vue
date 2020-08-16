<template>
    <div class="login">
        <div class="container">
            <div class="logo">
                <img src="~assets/img/logo.png" alt="" />
            </div>
            <el-form
                :model="inputInfo"
                label-width="70px"
                label-position="right"
                :rules="rules"
                ref="form"
                @keyup.enter.native="logClick"
            >
                <el-form-item prop="email" label="邮箱">
                    <el-input size="small" v-model="inputInfo.email" clearable></el-input>
                </el-form-item>
                <el-form-item
                    prop="nickname"
                    label="昵称"
                    v-if="curType === 'reg'" 
                >
                    <el-input
                        size="small"
                        v-model="inputInfo.nickname" clearable
                    ></el-input
                ></el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input
                        size="small"
                        type="password"
                        v-model="inputInfo.password" clearable
                    ></el-input
                ></el-form-item>
                <el-form-item
                    prop="bio"
                    label="个人简介"
                    v-if="curType === 'reg'"
                >
                    <el-input
                        size="small"
                        style="width:200px"
                        type="textarea"
                        v-model="inputInfo.bio" clearable
                    ></el-input
                ></el-form-item>
                <el-form-item
                    prop="gender"
                    label="性别"
                    v-if="curType === 'reg'"
                >
                    <el-radio-group v-model="inputInfo.gender" clearable>
                        <el-radio :label="0">保密</el-radio>
                        <el-radio :label="1">男</el-radio>
                        <el-radio :label="2">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item
                    prop="birthday"
                    label="生日"
                    v-if="curType === 'reg'"
                >
                    <el-input
                        size="small"
                        v-model="inputInfo.birthday" clearable
                    ></el-input
                ></el-form-item>

                <div class="btns">
                    <el-button size="small" type="primary" @click="regClick"
                        >注册</el-button
                    >
                    <el-button
                        size="small"
                        type="success"
                        v-if="curType === 'log'"
                        @click="logClick"
                        >登录</el-button
                    >
                </div>
            </el-form>
            <p class="tip" v-show="curType === 'reg'" @click="curType = 'log'">
                已有账号直接登录
            </p>
        </div>
    </div>
</template>

<script>
import { generateCheck } from 'commonjs/feildCheck';
import { loginReq, registerReq } from 'network/user';
export default {
    name: 'Login',
    props: {
        //当前操作的 模式，登录还是 注册
        type: {
            type: String,
        },
    },
    data() {
        return {
            curType: this.type,
            inputInfo: {
                email: '',
                password: '',
                nickname: '',
                bio: '',
                gender: 0,
                birthday: '',
            },
            rules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入', trigger: 'blur' },
                ],
                email: [{ required: true, message: '请输入', trigger: 'blur' }],
                nickname: [
                    //实时 从后台匹配进行 验证
                    {
                        validator: generateCheck('nickname', '昵称'),
                        trigger: 'blur',
                    },
                ],
            },
        };
    },
    methods: {
        regClick() {
            if (this.curType === 'log') {
                this.curType = 'reg';
                this.$refs.form.resetFields();
            } else {
                this.$refs.form.validate(async (valid) => {
                    if (valid) {
                        const res = await registerReq(this.inputInfo);
                        console.log(res);
                        if (!res.success)
                            return this.$message.error('注册失败');
                        this.$store.commit('saveUserInfo', res.data.userinfo);
                        localStorage.setItem('token', res.data.token);
                        this.$router.push('/home');
                    }
                });
            }
        },
        //登录按钮的 点击 时间处理函数
        logClick() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    const res = await loginReq(this.inputInfo);
                    console.log(res);
                    if (!res.success) return this.$message.error(res.msg);
                    this.$store.commit('saveUserInfo', res.data.userinfo);
                    localStorage.setItem('token', res.data.token);
                    this.$router.push('/home');
                }
            });
        },
    },
};
</script>

<style lang="less" scoped>
.login {
    .container {
        width: 400px;
        border: 1px solid #dcdfe6;
        border-radius: 7px;
        padding: 20px;
        margin: 50px auto 0 auto;
        position: relative;
        .logo {
            padding: 5px;
            box-shadow: 0 0 10px #dcdfe6;
            border-radius: 50%;
            box-sizing: border-box;
            position: absolute;
            z-index: 3;
            background-color: #fff;
            left: 50%;
            transform: translateX(-50%);
            top: -60px;
            img {
                width: 80px;
                border-radius: 50%;
                display: block;
            }
        }
        .el-form {
            width: 300px;
            margin: 30px auto 0 auto;
            .el-form-item {
                margin-bottom: 20px;
            }
            .el-input {
                width: 200px;
            }
            .btns {
                display: flex;
                justify-content: space-around;
                width: 200px;
                margin: 10px auto 0 auto;
            }
        }
    }
    .tip {
        font-size: 11px;
        cursor: pointer;
        color: #816e6e;
        text-align: center;
    }
}
</style>
