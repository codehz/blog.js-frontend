<style lang="stylus">
@import "../main.styl"
.comment-node
    padding 5px 0
    margin 5px 0
    background semi
    .comment-switch
        position absolute
        display block
        left 5px
        margin-top 10px
        width 10px
        height 10px
        font-family monospace
        user-select none
        font-size 10px
        cursor pointer
    input[type="checkbox"]
        position absolute
        margin-top 5px
        margin-left -15px
        font-family monospace
        cursor pointer
    .comment-author
        display: inline
        margin-left 20px
        font-size 12px
        opacity 0.5
    .comment-time
        display: inline
        font-size 12px
        opacity 0.5
    .button-bar
        display inline
        margin-left 15px
        opacity 0
        transition opacity .5s ease
    .button-bar > .button
        background rgba(0, 0, 0, 0.1)
        margin-left 5px
        font-size 12px
        padding 1px 5px
    .comment-reply
        margin-bottom 25px
        > input
            background rgba(0, 0, 0, 0.1)
            border none
            width 100%
            box-sizing border-box
            padding 3px 20px
            outline none !important
            margin 5px 0px
        .button
            font-size small
            margin-left 5px
            background rgba(0, 0, 0, 0.1)
            padding 1px 5px
            float right
    .comment-content
        padding 0 20px
        text-align justify
        font-size 14px
        &:hover
            .button-bar
                opacity 1
    .comment-more
        display block
        margin-top 5px
        padding 0 20px
        font-size 8px
        user-select none
        cursor pointer
        background semi
</style>

<template>
    <div class="comment-nodes">
        <div class="comment-node" v-for="comment in comments_filtered">
            <div class="comment-author" title="{{comment.user.email}}">{{comment.user.name}}</div>
            <div class="comment-time" title="{{comment.created_at}}">{{comment.created_at | fromNow}}</div>
            <div class="comment-content">
                <input type="checkbox" v-model="comment.hide" v-if="superuser" @change="toSwitchPublic(comment)"></input>
                <span>{{comment.content}}</span>
                <div class="button-bar">
                    <span class="button"
                        @click="toRemove(comment)"
                        v-if="superuser || (user && comment.user.id == user.id)">
                        删除
                    </span>
                    <span class="button"
                        @click="reply = reply == $index ? -1 : $index"
                        placeholder="请输入回复内容">
                        {{reply == $index ? '关闭' : '回复'}}
                    </span>
                    <span class="button" @click="hide.$set($index, !hide[$index])" v-if="reply != $index">
                        {{!hide[$index] && reply != $index ? '隐藏回复' : '显示回复'}}
                    </span>
                </div>
            </div>
            <comment-node :comments="comments"
                :current-comment="comment.id"
                v-show="!hide[$index] && reply != $index"
                :superuser="superuser"
                :user="user">
            </comment-node>
            <div class="comment-more" v-if="hide[$index] || reply == $index" @click="hide.$set($index, false), reply = -1">···</div>
            <div class="comment-reply" v-if="reply == $index">
                <input type="text" v-model="reply_content[$index]"
                    @keyup.enter='toReply(comment, reply_content[$index])'>
                </input>
                <span class="button" @click="toReply(comment, reply_content[$index])">回复</span>
                <span class="button" @click="reply = -1">关闭</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommentNode',
    data: () => ({
        hide: [],
        reply: -1,
        reply_content: []
    }),
    computed: {
        comments_filtered: {
            get(){
                if (!this.comments) return this.comments;
                if (!this.currentComment) return this.comments.filter(comment => typeof comment.ref_id == 'undefined');
                return this.comments.filter(comment => comment.ref_id == this.currentComment);
            }
        },
    },
    methods: {
        toReply(target, content) {
            this.$dispatch('replyComment', {target, content});
            this.reply = -1;
            content = '';
        },
        toSwitchPublic(target) {
            this.$dispatch('switchPublic', {target});
        },
        toRemove(target) {
            this.$dispatch('removeComment', {target});
        },
        enter(event) {
            console.log(event);
        }
    },
    props: {
        user: null,
        superuser: null,
        comments: {
            type: Array,
            required: true
        },
        currentComment: String
    },
    created() {
        
    }
}
</script>