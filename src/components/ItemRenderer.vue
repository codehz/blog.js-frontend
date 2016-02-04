<style lang="stylus">
@import "../main.styl"

.list-render
    position relative
    margin-top 20px

    .section-time
        position absolute
        left 20px
        top 20px
        font-size 12px

    .section-author
        position absolute
        right 20px
        top 20px
        font-size 12px

    .section-title
        padding 10px 20px
        padding-top 40px
        background semi
        font-size x-large
        transition box-shadow .3s ease

    .section-preview
        padding 5px 20px
        text-align justify

    .section-container
        background semi
        padding-top 5px
        padding-bottom 20px
        :last-child
            clear both

    .section-category
        float right
        padding-right 20px
        display inline-block
        height 24px
</style>
<template>
    <div>
        <section class="list-render" :class="{ blurred: border, shadow: border, 'border-radius': border }"
            v-for="article in currentArticles"
            @click="goArticle(article.id)">
            
            <div class="section-time">{{article.created_at | fromNow}}</div>
            <div class="section-author">{{article.user.name}}</div>
            <div class="section-title">{{article.title + (article.draft ? "[草稿]" : "")}}</div>
            <div class="section-preview">{{article.preview}}</div>
            <div class="section-container">
                <div class="section-category button" @click.stop='searchCategory(article.category)'>{{article.category}}</div>
                <div class="section-keywords">
                    <div class="button" v-for="keyword in article.keywords" @click.stop='searchKeyword(keyword)'>{{keyword}}</div>
                </div>
                <div></div>
            </div>
        </section>
    </div>
</template>
<script>
import config from '../config'
export default {
    name: 'ItemRenderer',
    props: {
        currentArticles: [],
        border: true
    },
    methods: {
        goArticle(articleId) {
            this.$router.go({name: 'article', params: { articleId }});
        },
        searchCategory(data) {
            this.$router.go({ name: 'search', params: { 'searchOption': 'category' }, query: { data } });
        },
        searchKeyword(key) {
            this.$router.go({ name: 'search', params: { 'searchOption': 'keywords' }, query: { keywords: [key] } });
        }
    }
}
</script>