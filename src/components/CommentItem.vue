<template>
    <el-card class="comment_item">
        <section class="header">
            <div class="left">
                <span class="email">{{ item.email }}</span>
                <span class="time">{{ formedTime }}</span>
            </div>
            <div class="right">
                <div>
                    <span class="iconfont icon-cai" @click="stampClick"></span>
                    <span>{{ item.stamp_count }}</span>
                </div>
                <div>
                    <span class="iconfont icon-zan1" @click="starClick"></span>
                    <span>{{ item.star_count }}</span>
                </div>
            </div>
        </section>
        <section class="content">
            {{ item.content }}
        </section>
    </el-card>
</template>

<script>
import { formatDate } from 'commonjs/utils';
import { oprateComment } from 'network/comment';
export default {
    name: 'CommentItem',
    props: {
        item: Object,
    },
    computed: {
        formedTime() {
            return formatDate(this.item.created_time, 'yyyy-MM-dd hh:mm:ss');
        },
    },
    methods: {
        //点赞
        async starClick() {
            const res = await oprateComment('star', this.item._id);
            console.log(res);
            if (!res.success) return this.$message.error('操作失败');
            this.$message.success('操作成功');
            this.item.star_count++;
        },
        //踩
        async stampClick() {
            const res = await oprateComment('stamp', this.item._id);
            console.log(res);
            if (!res.success) return this.$message.error('操作失败');
            this.$message.success('操作成功');
            this.item.stamp_count++;
        },
    },
};
</script>

<style lang="less" scoped>
.comment_item {
    margin-top: 20px;

    .header {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        background-color: #f4f4f4;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
        .email {
            font-weight: 700;
        }
        .time {
            font-size: 12px;
            margin-left: 10px;
        }
        .right {
            margin-right: 30px;
            display: flex;
            div {
                margin: 0 5px;
            }
            .icon-zan1 {
                color: #67c23a;
            }
            .icon-cai {
                color: #f56c6c;
            }
        }
    }
    .content {
        margin-top: 20px;
    }
}
</style>
