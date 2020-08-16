<template>
    <div class="home">
        <div class="posts">
            <post-item
                v-for="item in postlist"
                :key="item._id"
                :info="item"
            ></post-item>
        </div>
        <el-alert
            title="请更换关键词进行搜索"
            type="info"
            :closable="false"
            show-icon
            center
            v-if="postlist.length === 0 && type === 'search'"
        >
        </el-alert>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="query.page"
            :page-sizes="[5, 10]"
            :page-size="query.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="query.total"
        >
        </el-pagination>
    </div>
</template>

<script>
import PostItem from 'components/PostItem';

import { getPosts, searchPosts } from 'network/post';

export default {
    name: 'Home',
    data() {
        return {
            postlist: [],
            query: {
                limit: 10,
                page: 1,
                total: 0,
            },
            type: 'home',
        };
    },
    methods: {
        //获取所有 帖子
        async getPostlist() {
            const { data, success } = await getPosts(this.query);
            if (!success) return this.$message.error('获取失败');
            console.log(data);
            this.postlist = data.posts;
            this.query.total = data.total;
        },
        handleSizeChange(size) {
            this.query.limit = size;
            this.type === 'home' ? this.getPostlist() : this.searchReq();
        },
        handleCurrentChange(page) {
            this.query.page = page;
            this.type === 'home' ? this.getPostlist() : this.searchReq();
        },
        //根据关键字搜索
        async searchReq() {
            this.type = 'search';
            const res = await searchPosts(
                this.$store.state.keyword,
                this.query
            );
            console.log(res);
            if (!res.success) return this.$message.error('搜索失败');
            this.postlist = res.data.posts;
            this.query.total = res.data.total;
        },
    },
    created() {
        this.getPostlist();
    },
    components: { PostItem },
};
</script>

<style lang="less" scoped>
.home {
    width: 70vw;
    margin: 0px auto;
    .posts {
        margin-bottom: 20px;
    }
}
</style>
