<template>
    <div class="file_input">
        <el-button v-bind="$attrs" @click="btnClick">{{ text }}</el-button>
        <input
            type="file"
            ref="fileChoose"
            @change="fileChange"
            v-show="false"
        />
    </div>
</template>

<script>
export default {
    name: 'FileInput',
    props: {
        imgSrc: '',
    },
    data() {
        return {
            state: 'unchoose', //表示当前的状态  unchoose /unsubmit
            file: null,
        };
    },
    computed: {
        text() {
            if (this.state === 'unchoose') return '选择图片';
            else return '上传';
        },
    },
    methods: {
        btnClick() {
            if (this.state === 'unchoose') {
                this.$refs.fileChoose.click();
                this.state = 'unsubmit';
            } else {

                // 使用formData 包装， 浏览器自动使用 form-data  的 Content-type
                const formData = new FormData();
                formData.append('avatar', this.file);
                this.$emit('upload', formData);
            }
        },
        fileChange() {
            this.file = this.$refs.fileChoose.files[0];
            //获取 到 base64 的图片
            const fileReader = new FileReader();
            fileReader.readAsDataURL(this.file);
            fileReader.onload = () => {
                this.$emit('update:imgSrc', fileReader.result); //更新props
                // console.log(this.imgSrc);
            };
        },
    },
};
</script>

<style></style>
