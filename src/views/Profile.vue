<template>
    <div class="profile">
        <el-tabs tab-position="left">
            <!-- <el-tab-pane label="基础信息" 
                ><section class="info_edit" name="info">
                    <el-form
                        :model="userInfo"
                        label-width="70px"
                        label-position="right"
                        :rules="rules"
                        ref="form"
                    >
                        <h4>基础信息</h4>
                        <el-form-item prop="email" label="邮箱">
                            <el-input
                                size="small"
                                v-model="userInfo.email"
                                clearable
                                disabled
                            ></el-input>
                        </el-form-item>
                        <el-form-item prop="nickname" label="昵称">
                            <el-input
                                size="small"
                                v-model="userInfo.nickname"
                                clearable
                            ></el-input
                        ></el-form-item>

                        <el-form-item prop="bio" label="个人简介">
                            <el-input
                                size="small"
                                style="width:200px"
                                type="textarea"
                                v-model="userInfo.bio"
                                clearable
                            ></el-input
                        ></el-form-item>
                        <el-form-item prop="gender" label="性别">
                            <el-radio-group v-model="userInfo.gender" clearable>
                                <el-radio :label="0">保密</el-radio>
                                <el-radio :label="1">男</el-radio>
                                <el-radio :label="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item prop="birthday" label="生日">
                            <el-input
                                size="small"
                                v-model="userInfo.birthday"
                                clearable
                            ></el-input
                        ></el-form-item>

                        <div class="btns">
                            <el-button
                                size="small"
                                type="primary"
                                @click="submitEdit"
                                >提交</el-button
                            >
                        </div>
                    </el-form>
                    <div class="avatar_edit">
                        <h4>头像设置</h4>
                        <img :src="imgSrc" alt="" />
                        <div class="btn">
                            <FileInput
                                :imgSrc.sync="imgSrc"
                                size="small"
                                type="primary"
                                @upload="submitUpload"
                            ></FileInput>
                        </div>
                    </div></section
            ></el-tab-pane> -->
            <el-tab-pane label="账户设置">
                <section class="setting">
                    <section class="pass_edit">
                        <h4>密码更改</h4>
                        <el-form label-width="70px">
                            <el-form-item label="新密码"
                                ><el-input
                                    size="medium"
                                    v-model="form.newPass"
                                    type="password"
                                    clearable
                                ></el-input
                            ></el-form-item>
                            <el-form-item>
                                <el-button
                                    size="small"
                                    type="primary"
                                    @click="submitUpdatePass"
                                >
                                    提交</el-button
                                >
                            </el-form-item>
                        </el-form>
                    </section>
                    <section class="cancel">
                        <h4>注销账户</h4>
                        <el-button
                            type="danger"
                            size="small"
                            @click="_cancelUser"
                        >
                            确认注销</el-button
                        >
                    </section>
                </section>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import {
    getUserInfo,
    updateUser,
    updateAvatar,
    updatePass,
    cancelUser,
} from 'network/user';
import { generateCheck } from 'commonjs/feildCheck';
import FileInput from 'components/FileInput';
export default {
    name: 'Profile',
    data() {
        return {
            userInfo: {},
            rules: {
                nickname: [
                    //实时 从后台匹配进行 验证
                    {
                        validator: generateCheck('nickname', '昵称'),
                        trigger: 'blur',
                    },
                ],
            },
            imgSrc: '',
            form: {
                newPass: '',
            },
        };
    },
    computed: {
        avatar() {
            const avatar = this.$store.getters.avatarUrl;
            this.imgSrc = avatar;
            return avatar;
        },
    },
    methods: {
        async getData() {
            const res = await getUserInfo();
            console.log(res);
            if (!res.success) return this.$message.error('用户信息获取失败');
            this.userInfo = res.data;
            this.$store.commit('saveUserInfo', res.data);
        },
        async submitEdit() {
            const res = await updateUser(this.userInfo);
            console.log(res);
            if (!res.success) return this.$message.error('用户信息更新失败');
            this.$message.success('用户信息更新成功');
        },
        async submitUpload(formData) {
            const res = await updateAvatar(formData);
            console.log(res);
            if (!res.success) this.$message.error('上传失败');
            else this.$message.success('上传成功');
        },
        async submitUpdatePass() {
            if (!this.form.newPass) return this.$message.error('请填写新密码');
            const res = await updatePass(this.form.newPass);
            console.log(res);
            if (!res.success) this.$message.error('更改失败');
            else this.$message.success('更改成功');
        },
        async _cancelUser() {
            const result = await this.$confirm(
                '此操作将删除当前用户, 是否继续?',
                '提示',
                {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }
            ).catch((error) => error);
            if (result === 'cancel') {
                this.$message.info('操作取消');
            } else {
                const res = await cancelUser();
                console.log(res);
                if (!res.success) this.$message.error('注销失败');
                else this.$message.success('注销成功');
            }
        },
    },
    created() {
        this.getData();
    },
    components: {
        FileInput,
    },
};
</script>

<style lang="less" scoped>
.profile {
    width: 70vw;
    margin: 0 auto;
    .info_edit {
        display: flex;
        .el-input {
            width: 300px;
        }
        .avatar_edit {
            margin-left: 200px;
            display: flex;
            flex-direction: column;
            img {
                width: 200px;
                height: 200px;
            }
            .btn {
                margin-top: 20px;
            }
        }
    }
    .setting {
        .el-input {
            width: 300px;
        }
    }
}
</style>
