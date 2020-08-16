<template>
    <el-card class="post_item">
        <img
            :src="'http://localhost:8080/public/img/avatar/' + info.avatar"
            alt=""
            class="avatar"
        />
        <div class="content">
            <p class="title">
                <router-link :to="'/postdetail/' + info._id">{{
                    info.title
                }}</router-link>
            </p>
            <p class="info">
                <span>{{ info.see_count }}次浏览</span>
                <span>{{ info.comment_count }}个回复</span>
                <span>{{ formedTime }}</span>
                <span>posted by {{ info.email }}</span>
            </p>
        </div>
    </el-card>
</template>

<script>
import {formatDate} from 'commonjs/utils'
export default {
    name: 'PostItem',
    props: {
        info: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed:{
        formedTime(){
            return formatDate(this.info.created_time,'yyyy-MM-dd hh:mm:ss')
        }
    }
};
</script>

<style lang="less" scoped>
.post_item {
    /deep/ .el-card__body {
        display: flex;
        align-items: center;
    }
    img.avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    margin-top: 10px;
    .content {
        margin-left: 40px;
        .title {
            font-size: 15px;
            a {
                color: #23527c;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        }
        .info {
            font-size: 12px;
            width: 400px;
            display: flex;
            justify-content: space-between;
        }
    }
}
</style>
