<style lang="stylus">
.article-section
    position relative
    padding-bottom 60px
    
    .section-time,
    .section-modify,
    .section-remove,
    .section-author
        margin 20px
        margin-bottom 20px
        float right

    .section-modify
    .section-remove,
        user-select none
        cursor pointer

    .section-keywords
        clear both
        position absolute
        bottom 20px
        left 12px
        & > div
            &.button
                margin 5px
                padding 3px
                background #FFEA78

    .section-content
        padding-top 20px
        margin 0px 20px
</style>
<template>
    <div class="flex-column border-radius-container" >
        <section class="blurred shadow flex-1 border-radius article-section" v-if="article">
            <div class="section-content" v-html='article.content | marked'></div>
            <div class="section-time">{{article.created_at | fromNow}}</div>
            <div class="section-author">{{article.user.name}}</div>
            <div class="section-modify" @click="toEdit()" v-if="user && user.superuser">修改</div>
            <div class="section-remove" @click="toRemove()" v-if="user && user.superuser">删除</div>
            <div class="section-keywords">
                <div class="button" v-for="keyword in article.keywords">{{keyword}}</div>
            </div>
        </section>
        <section v-if="article">
            <comment-panel :user="user" :article-id="articleId">
            </comment-panel>
        </section>
    </div>
</template>
<script>
import config from '../config'
import CommentPanel from './CommentPanel.vue'
import marked from 'marked'
export default {
    name: 'ArticleView',
    data: () => ({
        article: null,
        articleId: -1
    }),
    components: {
        CommentPanel
    },
    route: {
        data({ to }) {
            this.articleId = +to.params.articleId;
            this.refresh();
        },
        
        activate() {
            this.navType = 0;
            this.$nextTick(() => window.scrollTo(0, document.getElementById("normal-nav").offsetTop + 200));
        }
    },
    props: {
        user: null
    },
    events: {
        needUpdate() {
            this.refresh();
        }
    },
    filters: {
        marked: marked
    },
    methods: {
        refresh() {
            this.$http.get((this.user ? 'article/' : 'public/article/') + this.articleId). then(({data}) => {
                this.article = data.body;
                this.$dispatch('updateTitle', { title: this.article.title, type: 0 });
                this.$broadcast('needUpdate');
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