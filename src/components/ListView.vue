<style lang="stylus">
.list-section
    position relative
    padding-bottom 50px

    .section-time
        position absolute
        left 20px
        top 20px

    .section-author
        position absolute
        right 20px
        top 20px

    .section-title
        text-align center
        padding 10px
        padding-bottom 10px
        font-size x-large
        transition box-shadow .3s ease
        @media (max-width: 1023px), (max-height: 550px)
            padding-top 40px

    .section-preview
        padding 16px

    .section-category
        position absolute
        bottom 20px
        left 14px

    .section-keywords
        position absolute
        bottom 20px
        right 14px
        & > div
            &.button
                margin 5px
                padding 3px
                background #FFEA78
</style>
<template>
    <div class="flex-column border-radius-container" >
        <section class="blurred shadow flex-1 border-radius list-section" 
            v-for="article in currentArticles" 
            @click="goArticle(article.id)">
            
            <div class="section-time">{{article.created_at | fromNow}}</div>
            <div class="section-author">{{article.user.name}}</div>
            <div class="section-title">{{article.title + (article.draft ? "[草稿]" : "")}}</div>
            <div class="section-preview">{{article.preview}}</div>
            <div class="section-category label-arrow label-arrow-right">{{article.category}}</div>
            <div class="section-keywords">
                <div class="button" v-for="keyword in article.keywords">{{keyword}}</div>
            </div>
        </section>
    </div>
</template>
<script>
import config from '../config'
export default {
    name: 'ListView',
    data: () => ({
        currentArticles: []
    }),
    props: {
        user: null
    },
    route: {
        activate() {
            this.$dispatch('updateTitle', { type: 1 });
            this.refresh();
            this.$nextTick(() => window.scrollTo(0, document.getElementById("normal-nav").offsetTop + 200));
        }
    },
    created() {
        this.refresh();
    },
    methods: {
        goArticle(articleId) {
            this.$router.go({name: 'article', params: { articleId }});
        },
        refresh() {
            this.$http.get(this.user ? 'article' : 'public/article').then(({data: {body}}) => this.currentArticles = body);
        }
    }
}
</script>