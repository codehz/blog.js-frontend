<style lang="stylus">
.article-comment-section
    margin 20px 0
    textarea
        resize none
        padding 0 20px
        width 100%
        height 100px
        background none
        border none
        resize none
        overflow hidden
        font-family inherit
        transition all ease .7s
        &:focus
            outline: none !important;
    .button
        float right
</style>

<template>
    <section>
        <comment-list :user="user" :article-id="articleId">
        </comment-list>
        <section class="blurred shadow flex-1 border-radius article-comment-section">
            <label class="ui-label">评论</label>
            <textarea :placeholder="user ? '您的评论:' : '您需要注册或登陆才能发表评论'" :disabled='!user' @keyup="autogrow($event)" v-model="content" :style="contentStyle"></textarea>
            <div class="bottom-bar">
                <div class="button" @click="submit()">提交</div>
                <div class="button" @click="clear()">清空</div>
                <div></div>
            </div>
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
            if (this.content.length < 5)
                return this.$dispatch('popup', '评论长度过短');
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