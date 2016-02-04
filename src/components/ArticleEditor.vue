<style lang="stylus">
@import "../main.styl"
.article-edit-section
    position relative
    margin-top 20px
    padding 0
    input[type="text"], textarea
        width 100%
        box-sizing border-box
        background semi
        border none
        margin 0
        padding 5px 20px
        transition all ease 2s
        &:focus
            outline: none !important;
    input
        &.section-title
            padding-top 20px
            font-size large
            text-align center
        &.section-category
            height 25px
            float right
            width calc(100%  - 110px)
            margin-right 0
            margin-bottom 0
            padding 0 5px
    select
        box-sizing border-box
        height 25px
        width 100px
        padding-left 20px
        outline: none !important;
        background semi
        border none
    textarea
        resize none
        overflow hidden
        font-family inherit
    .button
        padding 3px 10px
        height 20px
        font-size 14px
        float right
    .clear-float
        clear: both
    label
        user-select none

    .onoffswitch
        position relative
        width 64px
        height 24px
        user-select none
        padding 0
        float right
    
    .onoffswitch-checkbox
        display none
    
    .onoffswitch-label
        display block
        overflow hidden
        cursor pointer
        box-shadow 0 1.5px 0 half
    
    .onoffswitch-inner
        display block
        padding 0
        width 200%
        margin-left -100%
        transition margin 0.3s ease-in 0s
    
    .onoffswitch-inner::before,
    .onoffswitch-inner::after
        display block
        float left
        width 50%
        height 26px
        padding 0
        line-height 24px
        font-size 13px
        color white
        box-sizing border-box
    
    .onoffswitch-inner::before
        content "草稿"
        padding-left 8px
        padding-top 1px
        font-size 14px
        background-color #EEEEEE
        color #999999
    
    .onoffswitch-inner::after
        content "发布"
        padding-right 8px
        padding-top 1px
        font-size 14px
        background-color main-color
        color white
        text-align right
    
    .onoffswitch-switch
        display block
        width 10px
        margin 6px
        background #FFFFFF
        position absolute
        top 2px
        bottom 0
        right 40px
        transition all 0.3s ease-in 0s
    
    .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner
        margin-left 0
    
    .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch
        right 0
        background #999999

    .section-content
        padding 10px 0
.article-preview-section
    margin-top 20px
    padding-bottom 20px
</style>
<template>
    <section class="flex-column border-radius-container" >
        <section class="blurred shadow flex-1 border-radius article-edit-section">
            <input type="text" class="section-title" placeholder="标题" v-model="article.title"></input>
            <label class="ui-label">简介</label>
            <textarea
                placeholder="简介"
                @focus="autogrow($event, 0)"
                @keyup="autogrow($event, 0)"
                v-model="article.preview"
                :style="contentStyle[0]">
            </textarea>
            <label class="ui-label">内容</label>
            <textarea
                placeholder="内容"
                @focus="autogrow($event, 1)"
                @keyup="autogrow($event, 1)"
                v-model="article.content"
                :style="contentStyle[1]">
            </textarea>
            <label class="ui-label">分类</label>
            <select v-model="article.category">
                <option v-for="category in categorys" :value="category">{{category}}</option>
                <option selected :value="article.category">自定义</option>
            </select>
            <input type="text" class="section-category" placeholder="主题" v-model="article.category"></input>
            <label class="ui-label">关键词</label>
            <keyword-selector :keywords.sync="article.keywords"></keyword-selector>
            <div class="bottom-bar">
                <div class="button" @click="submit()">提交</div>
                <div class="button" @click="clear()">清空</div>
                <div class="onoffswitch">
                    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="draft" v-model="article.draft"></input>
                    <label class="onoffswitch-label" for="draft">
                        <span class="onoffswitch-inner"></span>
                        <span class="onoffswitch-switch"></span>
                    </label>
                </div>
                <div></div>
            </div>
        </section>
        <section class="blurred shadow flex-1 border-radius article-preview-section">
            <label class="ui-label">预览</label>
            <content-renderer :content.sync='article.content'></content-renderer>
        </section>
    </section>
</template>
<script>
import config from '../config'
import CommentPanel from './CommentPanel.vue'
import KeywordSelector from './KeywordSelector.vue'
import ContentRenderer from './ContentRenderer.vue'
export default {
    name: 'ArticleEditor',
    data: () => ({
        article: {},
        articleId: -1,
        categorys: [],
        contentStyle: [{
            height: '100px'
        }, {
            height: '300px'
        }]
    }),
    route: {
        data({ to }) {
            if (to.params.articleId != 'create') {
                this.articleId = +to.params.articleId;
                this.refresh();
            }
            this.$dispatch('updateTitle', { paths: [{text: '管理', url: '/control'}, {text: '编辑文章', url: '/control/article/' + to.params.articleId}] });
        },
        
        activate() {
        }
    },
    props: {
        user: null
    },
    components: {
        KeywordSelector,
        ContentRenderer
    },
    methods: {
        autogrow({target: textarea}, index) {
            let adjustedHeight = textarea.clientHeight;
            adjustedHeight = Math.max(textarea.scrollHeight,adjustedHeight);
            if (adjustedHeight > textarea.clientHeight) this.contentStyle[index].height = ~~(adjustedHeight + 200) + 'px';
        },
        refresh() {
            if (this.articleId == -1) return;
            this.$http.get('article/' + this.articleId).then(({data}) => {
                this.article = data.body;
                this.$dispatch('updateTitle', { paths: [{text: '管理', url: '/control'}, {text: '编辑:' + this.article.title, url: '/control/article/' + this.articleId}] });
                this.$nextTick(() => window.scrollTo(0, document.getElementById("normal-nav").offsetTop + 200));
            });
        },
        clear() {
            this.article.content = '';
            this.contentStyle.height = '300px';
        },
        submit() {
            if (this.articleId == -1)
                this.$http.post('article', this.article).then(({data}) => {
                    this.$router.go('/');
                });
            else
                this.$http.put('article/' + this.articleId, this.article).then(({data}) => {
                    this.$router.go({name: 'article', params: { articleId: this.articleId }});
                });
        }
    },
    created() {
        this.$http.get('category').then(({data}) => this.categorys = data.body.map(value => value.name));
    }
}
</script>