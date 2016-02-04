<style lang="stylus">
@import "../main.styl"
.section-content
    padding 0
    margin 0
    > *
        margin 0 20px
    hr
        margin 0
        border-style inset none
        border-color rgba(0, 0, 0, 0.5) #000000  rgba(255, 255, 255, 0.5)
    code
        display inline-block
        background semi
        padding 0 2px
        margin 0 2px
    p
        margin 0
        padding 10px 20px
        font-size 16px
        text-align justify
        p > code
            display inline-block
            background none
            padding 0
            margin 0
    li > p
        padding 0
    ul, ol
        padding-left 20px
    ul
        list-style-type square
    li
        padding 2px 0
    pre
        margin 0
        background semi
        padding 5px 20px
        font-size 16px
        margin 5px 0
    table
        width 100%
        background semi
        margin 5px 0
        border-collapse collapse
        thead th
            background semi
            &:first-of-type
                padding-left 20px
            &:last-of-type
                padding-right 20px
        tbody
            border-right 40px solid transparent
            border-left 40px solid transparent
    blockquote
        position relative
        padding 20px 0
        margin 5px 0 !important
        > *
            margin 0 20px
        > p
            margin 0
        &:before
            position absolute
            content "\22"
            color black
            opacity .3
            font-size 50px
            line-height 20px
            pointer-events: none;
        &:after
            position absolute
            content " "
            left 0
            width 100%
            top 0
            bottom 0
            background semi
            pointer-events: none;
    h1,
    h2
        border-bottom solid semi
    for i in 1 2 3 4 5 6
        h{i}
            background semi
            padding 0 20px
            width 100%
            box-sizing border-box
            margin 10px 0
            font-size (32 - (i*2))px
    hr
        margin-left 0
        margin-right 0
    a
        display inline-block
        text-decoration none
        background transparent
        color #1C59E6
        transition all ease .3s
        &:hover
            color #90D500
            background #64460A
        &:active
            color #FFAA00
            background black
            transition all ease .1s

.section-keywords
    float left
    :first-child
        padding-left 20px
    .button
        display inline-block
        height 24px
        font-size 16px
</style>

<template>
<div class="section-content" v-html='content | marked'></div>
</template>

<script>
import marked from 'marked'
import $ from 'jquery'
export default {
    name: "ContentRenderer",
    props: ["content"],
    data: () => ({
        ready: false
    }),
    watch: {
        content() {
            if (this.ready) this.$nextTick(this.extend)
        }
    },
    filters: {
        marked: marked
    },
    methods: {
        extend() {
            console.log('change');
            const content = $(this.$el);
            const content_left = content.offset().left;
            const content_width = content.width();
            $('hr,pre', this.$el).each(function () {
                const el = $(this);
                const offset_left = content_left - el.offset().left;
                el.css('margin-left', ~~offset_left + 'px');
                const offset_right = el.outerWidth() - content_width;
                el.css('margin-right', offset_right + 'px');
            });
        }
    },
    created() {
        if (!this.ready)
            this.content = this.content ? this.content : '加载中';
        this.ready = true;
    },
    compiled() {
        this.$nextTick(this.extend);
    }
}
</script>
