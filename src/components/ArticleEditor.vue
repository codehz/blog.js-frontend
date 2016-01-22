<style lang="stylus">
.article-edit-section
    position relative
    padding-bottom 60px
    padding 20px
    input[type="text"], textarea
        width 100%
        box-sizing border-box
        background rgba(0, 0, 0, 0.05)
        border none
        margin 10px 0
        padding 5px
        &:focus
            outline: none !important;
    input
        &.section-title
            font-size large
        &.section-category
            height 25px
            width calc(100%  - 105px)
            margin-right 0
    select
        box-sizing border-box
        height 25px
        width 100px
        outline: none !important;
        background rgba(0, 0, 0, 0.05)
        border none
    textarea
        resize none
        overflow hidden
    .button
        padding 3px 10px
        margin-left 15px
        float right
    .clear-float
        clear: both
    label
        user-select none

    .section-preview
        margin 0px 20px

    .onoffswitch
        position relative
        width 64px
        height 34px
        user-select none
        float right
    
    .onoffswitch-checkbox
        display none
    
    .onoffswitch-label
        display block
        overflow hidden
        cursor pointer
    
    .onoffswitch-inner
        display block
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
        border-radius 3px
    
    .onoffswitch-inner::before
        content "草稿"
        padding-left 8px
        background-color #EEEEEE
        color #999999
    
    .onoffswitch-inner::after
        content "发布"
        padding-right 8px
        background-color #DFA336
        color #FFFFFF
        text-align right
    
    .onoffswitch-switch
        display block
        width 6px
        margin 6px
        background #FFFFFF
        position absolute
        top 2px
        bottom 10px
        right 40px
        border 2px solid #FFFFFF
        border-radius 0px
        transition all 0.3s ease-in 0s
    
    .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-inner
        margin-left 0
    
    .onoffswitch-checkbox:checked + .onoffswitch-label .onoffswitch-switch
        right 0px
</style>
<template>
    <section class="flex-column border-radius-container" >
        <section class="blurred shadow flex-1 border-radius article-edit-section">
            <input type="text" class="section-title" placeholder="标题" v-model="article.title"></input>
            <textarea placeholder="简介" @keyup="autogrow($event, 0)" v-model="article.preview" :style="contentStyle[0]"></textarea>
            <textarea placeholder="内容" @keyup="autogrow($event, 1)" v-model="article.content" :style="contentStyle[1]"></textarea>
            <select v-model="article.category">
                <option selected :value="article.category">自定义</option>
                <option v-for="category in categorys" :value="category">{{category}}</option>
            </select>
            <input type="text" class="section-category" placeholder="主题" v-model="article.category"></input>
            <keyword-selector :keywords.sync="article.keywords"></keyword-selector>
            <div class="button" @click="submit()">提交</div>
            <div class="button" @click="clear()">清空</div>
            <div class="onoffswitch">
                <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="draft" v-model="article.draft"></input>
                <label class="onoffswitch-label" for="draft">
                    <span class="onoffswitch-inner"></span>
                    <span class="onoffswitch-switch"></span>
                </label>
            </div>
            <div class="clear-float"></div>
        </section>
    </section>
</template>
<script>
import config from '../config'
import CommentPanel from './CommentPanel.vue'
import KeywordSelector from './KeywordSelector.vue'
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
            this.$dispatch('updateTitle', { title: '编辑文章', type: 0});
        },
        
        activate() {
        }
    },
    props: {
        user: null
    },
    components: {
        KeywordSelector
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
                this.navType = 0;
                this.navText = '编辑 ' + this.article.title;
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