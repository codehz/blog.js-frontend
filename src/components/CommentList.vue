<style lang="stylus">
.article-comment-list-section
    padding-bottom 10px
    .tip
        padding 0 20px
</style>

<template>
    <section class="blurred shadow flex-1 border-radius article-comment-list-section">
        <label class="ui-label">评论列表</label>
        <div v-if="comments.length != 0">
            <comment-node :comments="comments" :superuser="user && user.superuser" :user="user">
            </comment-node>
        </div>
        <div class="tip" v-else>还没有评论呢</div>
    </section>
</template>

<script>
import CommentNode from './CommentNode.vue'
export default {
    name: 'CommentList',
    data: () => ({
        comments: []
    }),
    components: {
        CommentNode
    },
    props: {
        user: null,
        articleId: {
            type: Number,
            required: true
        }
    },
    methods: {
        refresh() {
            this.$http.get((this.user ? 'article/' : 'public/article/') + this.articleId + '/comment')
                .then(({data: {body}}) => this.comments = body);
        }
    },
    events: {
        replyComment({target, content}) {
            this.$http.post('article/' + this.articleId + '/comment/' + target.id, { content }).then(() => {
                this.refresh();
            });
        },
        switchPublic({target}) {
            this.$http.put('article/' + this.articleId + '/comment/' + target.id, target)
                .then(() => this.refresh());
        },
        removeComment({target}) {
            this.$http.delete('article/' + this.articleId + '/comment/' + target.id, target)
                .then(() => this.refresh());
        },
        needUpdate() {
            this.refresh();
        }
    },
    created() {
        this.refresh();
    }
}
</script>
