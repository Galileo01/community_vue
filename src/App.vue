<template>
    <div id="app">
        <el-container>
            <el-header>
                <div class="wapper">
                    <section class="left">
                        <img
                            src="~assets/img/logo.png"
                            alt=""
                            class="logo"
                            @click="$router.push('/home')"
                        />
                        <el-input
                            size="small"
                            v-model="keyword"
                            placeholder="输入email 或 title 进行搜索"
                            @keyup.enter.native="searchClick"
                            class="search"
                            clearable=""
                        >
                            <el-button
                                size="small"
                                icon="el-icon-search"
                                slot="append"
                                @click="searchClick"
                            ></el-button>
                        </el-input>
                    </section>
                    <section class="right">
                        <div class="avatar-wapper" @click="avatarClick">
                            <img :src="avatar" alt="头像" class="avatar" />
                            <span>{{ email }}</span>
                        </div>
                        <div class="btns">
                            <el-button
                                size="small"
                                type="primary"
                                @click="$router.push('/login/log')"
                                v-show="!isLogined"
                                >登录</el-button
                            >
                            <el-button
                                size="small"
                                type="success"
                                v-show="!isLogined"
                                @click="$router.push('/login/reg')"
                                >注册</el-button
                            >
                            <el-button
                                size="small"
                                type="warning"
                                v-show="isLogined"
                                @click="$router.push('/post/new')"
                                >发起</el-button
                            >
                            <el-button
                                size="small"
                                type="danger"
                                v-show="isLogined"
                                @click="logout"
                                >退出</el-button
                            >
                        </div>
                    </section>
                </div>
            </el-header>
            <el-main>
                <router-view ref="main"></router-view>
            </el-main>
            <el-footer
                ><div class="wapper">
                    <p>技术交流社区</p>
                    <p>copyright by ltt</p>
                </div></el-footer
            >
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'app',
    data() {
        return {
            keyword: '',
        };
    },
    computed: {
        avatar() {
            return this.$store.getters.avatarUrl;
        },
        email() {
            return this.$store.getters.email;
        },
        isLogined() {
            return Boolean(this.email);
        },
    },
    methods: {
        async logout() {
            const result = await this.$confirm(
                '此操作将退出账号, 是否继续?',
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
                this.$store.commit('clearInfo');
                this.$message.success('成功');
                this.$router.replace('/home');
            }
        },
        //搜索
        searchClick() {
            if (!this.keyword) return;
            this.$store.commit('saveKeyword', this.keyword);
            //当前不在home 页面，强制跳转
            if (this.$route.path !== '/home') this.$router.push('/home');
            this.$nextTick(() => {
                this.$refs.main.searchReq();
            });
        },
        avatarClick() {
            if (this.isLogined) this.$router.push('/profile');
        },
    },
    components: {},
    created() {},
};
</script>

<style lang="less" scoped>
@import url(./assets/css/base.css);
@import url(./assets/fonts/iconfont.css);

.el-header {
    background-color: #f8f8f8;
    .wapper {
        width: 70vw;
        padding: 5px 0;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .left {
            display: flex;
            align-items: center;
            img.logo {
                width: 50px;
            }
            .el-input.search {
                width: 300px;
                margin-left: 60px;
            }
            .el-select {
                width: 80px;
                margin-left: 10px;
            }
        }
        .right {
            display: flex;
            align-items: center;
            .avatar-wapper {
                display: flex;
                align-items: center;
                img.avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                }
                span {
                    font-size: 13px;
                    margin-left: 10px;
                }
            }

            .btns {
                margin-left: 10px;
            }
        }
    }
}

.el-footer .wapper {
    font-size: 14px;
    p {
        text-align: center;
    }
}
</style>
