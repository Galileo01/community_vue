<template>
    <div class="post_detail">
        <section class="post">
            <h2>{{ baseinfo.title }}</h2>
            <div class="html" v-html="compiledHtml"></div>
        </section>
        <el-divider></el-divider>
        <section class="comments">
            <h3>所有评论</h3>
            <div class="comments-wapper">
                <CommentItem
                    v-for="(item, index) in comments"
                    :key="index"
                    :item="item"
                ></CommentItem>
            </div>
        </section>
        <el-divider></el-divider>
        <section class="make_comment">
            <h3>添加评论</h3>
            <el-input
                type="textarea"
                :autosize="{ minRows: 3 }"
                v-model="my_comment"
            ></el-input>
            <el-button type="primary" size="small" @click="_addComment"
                >提交评论</el-button
            >
        </section>
    </div>
</template>

<script>
import marked from 'marked';
import { getPosts, addSeeCount } from 'network/post';
import { getByPost_id, addComment } from 'network/comment';
import CommentItem from 'components/CommentItem';
export default {
    name: 'PostDetail',
    props: {
        post_id: String,
    },
    data() {
        return {
            baseinfo: {},
            comments: [],
            compiledHtml: '', //md 文档转换的 html 格式
            my_comment: '',
        };
    },
    methods: {
        async getBaseInfo() {
            const res = await getPosts({
                _id: this.post_id,
            });
            if (!res.success) return this.$message.error('数据获取失败');
            this.baseinfo = res.data.posts[0];
            this.compiledHtml = marked(this.baseinfo.content);
        },
        async getComments() {
            const res = await getByPost_id(this.post_id);
            if (!res.success) return this.$message.error('数据获取失败');
            this.comments = res.data;
        },
        async _addComment() {
            const res = await addComment(this.post_id, this.my_comment);
            console.log(res);
            if (!res.success) return this.$message.error('添加失败');
            this.getComments();
            this.my_comment = '';
        },
        async _addSeeCount() {
            const res = await addSeeCount(this.post_id);
            console.log(res);
        },
    },
    created() {
        this.getBaseInfo();
        this.getComments();
        this._addSeeCount();
    },
    components: {
        CommentItem,
    },
};
</script>

<style lang="less" scoped>
.post_detail {
    width: 70vw;
    margin: 0 auto;

    .comments {
        margin-top: 20px;
    }
    .make_comment {
        margin-top: 20px;
        .el-button {
            margin-top: 20px;
        }
    }
}
</style>
