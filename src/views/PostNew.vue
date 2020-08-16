<template>
    <div class="post_new">
        <el-row>
            <el-col :span="2"><span class="head">选择分类:</span></el-col>
            <el-col :span="3"
                ><el-select
                    v-model="input.category"
                    size="medium"
                    placeholder="选择分类"
                >
                    <el-option label="分享" :value="0"></el-option>
                    <el-option label="问答" :value="1"></el-option>
                    <el-option label="招聘" :value="2"></el-option>
                    <el-option label="测试" :value="3"></el-option> </el-select
            ></el-col>
            <el-col :span="14" :offset="1"
                ><el-input
                    size="medium"
                    v-model="input.title"
                    placeholder="请输入帖子的标题"
                >
                    <span slot="prepend">标题</span>
                </el-input></el-col
            >
        </el-row>
        <section class="md-wapper">
            <div class="input">
                <el-input
                    type="textarea"
                    class="textarea"
                    v-model="input.content"
                ></el-input>
            </div>
            <div class="show" v-html="compiledHtml"></div>
        </section>
        <div class="bottom">
            <el-button type="primary" size="medium" @click="submitNew"
                >提交</el-button
            >
        </div>
        <MKdialog :visible.sync="visible" :showFooter="false" width="30%"
            >创建成功,  {{ second }}s  后进入帖子详情页</MKdialog
        >
    </div>
</template>

<script>
import marked from 'marked';
import { createPost } from 'network/post';
import MKdialog from 'components/MKDialog';
export default {
    name: 'PostNew',
    data() {
        return {
            input: {
                category: 0,
                title: '',
                content: '**在此处编辑内容**',
            },
            visible: false,
            second: 3,
            timer: null,
        };
    },
    computed: {
        compiledHtml() {
            return marked(this.input.content);
        },
    },
    methods: {
        //提交 创建的  帖子
        async submitNew() {
            if (!this.input.title || !this.input.content)
                return this.$message.warning('请填写标题或内容');
            const res = await createPost(this.input);
            console.log(res);
            if (!res.success) return this.$message.error('创建失败');
         //   创建成功 跳转到 详情页

            this.visible = true;
            this.timer = setInterval(() => {
                this.second--;
                if (this.second === 0) {
                    this.visible = false;
                    clearInterval(this.timer);
                    this.timer = null;
                    this.$router.push('/postdetail/' + res.data);
                }
            }, 1000);
        },
    },
    components: {
        MKdialog,
    },
};
</script>

<style scoped lang="less">
.post_new {
    width: 90vw;
    margin: 0px auto;
    .head {
        font-size: 14px;
    }
    .md-wapper {
        margin-top: 20px;
        display: flex;
        .input {
            width: 48%;
            /deep/ textarea {
                min-height: calc(100vh - 150px) !important;

                display: block;
                border: none;
                border-right: 1px solid #ccc;
                resize: none;
                outline: none;
                background-color: #f6f6f6;
                font-size: 14px;
                font-family: 'Monaco', courier, monospace;
                padding: 20px;
            }
        }
        .show {
            width: 48%;
            margin-left: 4%;
        }
    }
    .bottom {
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }
}
</style>
