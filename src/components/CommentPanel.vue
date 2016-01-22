<style lang="stylus">
.article-comment-section
    margin-top 20px
    padding 20px
    textarea
        resize none
        width 100%
        height 100px
        background none
        border none
        margin 10px 0
        padding 0px
        &:focus
            outline: none !important;
    .button
        padding 3px 10px
        margin-left 15px
        float right
    .clear-float
        clear: both
</style>

<template>
    <section>
        <comment-list :user="user" :article-id="articleId">
        </comment-list>
        <section class="blurred shadow flex-1 border-radius article-comment-section">
            <textarea :placeholder="user ? '您的评论:' : '您需要注册或登陆才能发表评论'" :disabled='!user' @keyup="autogrow($event)" v-model="content" :style="contentStyle"></textarea>
            <div class="button" @click="submit()">提交</div>
            <div class="button" @click="clear()">清空</div>
            <div class="clear-float"></div>
        </section>
    </section>
</template>

<script>
import CommentList from './CommentList.vue';
export default {
    name: 'CommentPanel',
    components: {
        CommentList
    },
    props: {
        user: null,
        articleId: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        content: "",
        contentStyle: {
            height: '100px'
        }
    }),
    methods: {
        autogrow({target: textarea}) {
            let adjustedHeight = textarea.clientHeight;
            adjustedHeight = Math.max(textarea.scrollHeight,adjustedHeight);
            if (adjustedHeight > textarea.clientHeight) this.contentStyle.height = ~~(adjustedHeight + 100) + 'px';
        },
        submit() {
            this.$http.post('article/' + this.articleId + '/comment', { content: this.content }).then(() => {
                this.content = '';
                this.$broadcast('needUpdate');
                this.$dispatch('needUpdate');
            });
        },
        clear() {
            this.content = ''; 
            this.contentStyle.height = '100px';
        }
    },
    created() {
        
    }
}
</script>