<style lang="stylus">
@import "../main.styl"
.article-parent
    position relative
    margin 0
    margin-top 20px
    padding 0
    width 100%
    article
        padding-top 20px

    .section-time
    .section-author
    .section-modify
    .section-remove
        float right
    .section-time
    .section-author
        margin-left 20px
    .section-time
        margin-right 20px
    .section-container
        background semi
        padding-top 5px
        padding-bottom 20px
        :last-child
            clear both

</style>
<template>
    <div class="article-parent">
        <article class="blurred shadow border-radius" v-if="article">
            <content-renderer :content='article.content'></content-renderer>
            <div class="section-container">
                <div class="section-time">{{article.created_at | fromNow}}</div>
                <div class="section-author">{{article.user.name}}</div>
                <div class="section-modify button" @click="toEdit()" v-if="user && user.superuser">修改</div>
                <div class="section-remove button" @click="toRemove()" v-if="user && user.superuser">删除</div>
                <div class="section-keywords">
                    <div class="button" v-for="keyword in article.keywords">{{keyword}}</div>
                </div>
                <div></div>
            </div>
        </article>
        <section v-if="article">
            <comment-panel :user="user" :article-id="articleId">
            </comment-panel>
        </section>
    </div>
</template>
<script>
import config from '../config'
import $ from 'jquery'
import CommentPanel from './CommentPanel.vue'
import ContentRenderer from './ContentRenderer.vue'
export default {
    name: 'ArticleView',
    data: () => ({
        article: null,
        articleId: -1
    }),
    components: {
        CommentPanel,
        ContentRenderer
    },
    route: {
        data({ to }) {
            this.articleId = +to.params.articleId;
            this.navType = 0;
            this.$nextTick(() => window.scrollTo(0, $("#normal-nav").offset().top + 1));
            if (this.data_ready) this.$nextTick(this.refresh);
        }
    },
    props: {
        user: null,
        data_ready: null
    },
    events: {
        needUpdate() {
            this.$nextTick(this.refresh);
        }
    },
    methods: {
        refresh() {
            console.log(this.user);
            this.$http.get((this.user ? 'article/' : 'public/article/') + this.articleId).then(({data}) => {
                this.article = data.body;
                this.$dispatch('updateTitle', { paths: [{text: this.article.title, url: '/article/' + this.articleId}] });
            });
        },
        toEdit() {
            this.$router.go({ name: 'editArticle', params: { articleId: this.articleId } });
        },
        toRemove() {
            this.$http.delete('article/' + this.articleId).then(({data}) => {
                this.$router.go('/');
            });
        }
    }
}
</script>