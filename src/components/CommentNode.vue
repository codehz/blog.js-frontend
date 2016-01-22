<style lang="stylus">
.comment-node
    padding-left 25px
    padding-top 10px
    .comment-switch
        position absolute
        margin-top 0px
        margin-left -20px
        font-family monospace
        cursor pointer
    input[type="checkbox"]
        position absolute
        margin-top 5px
        margin-left -20px
        font-family monospace
        cursor pointer
    .comment-author
        display: inline
        font-size small
        opacity 0.5
    .comment-time
        display: inline
        font-size small
        opacity 0.5
    .comment-replay-button, .comment-remove-button
        opacity 0
        background rgba(0, 0, 0, 0.1)
        margin-left 20px
        font-size small
        padding 1px 5px
        transition opacity .5s ease
    .comment-remove-button
        margin-left 5px
    .comment-reply
        margin-bottom 20px
        > input
            background rgba(0, 0, 0, 0.1)
            border none
            width 100%
            box-sizing border-box
            padding 3px 5px
            outline none !important
            margin 5px 0px
        .button
            font-size small
            margin-left 5px
            background rgba(0, 0, 0, 0.1)
            padding 1px 5px
            float right
    .comment-content:hover
        .comment-replay-button, .comment-remove-button
            opacity 1
</style>

<template>
    <div class="comment-nodes">
        <div class="comment-node" v-for="comment in comments_filtered">
            <div class="comment-switch"
                title="{{!!hide[$index] ? '显示回复' : '隐藏回复'}}"
                @click="hide.$set($index, hide[$index] ? false : true)">
                {{hide[$index] ? '[+]' : '[-]'}}
            </div>
            <div class="comment-author" title="{{comment.user.email}}">{{comment.user.name}}</div>
            <div class="comment-time" title="{{comment.created_at}}">{{comment.created_at | fromNow}}</div>
            <div class="comment-content">
                <input type="checkbox" v-model="comment.hide" v-if="superuser" @change="toSwitchPublic(comment)"></input>
                <span>{{comment.content}}</span>
                <span class="comment-replay-button button"
                    @click="reply = reply == $index ? -1 : $index"
                    placeholder="请输入回复内容">
                    {{reply == $index ? '关闭' : '回复'}}
                </span>
                <span class="comment-remove-button button"
                    @click="toRemove(comment)"
                    v-if="superuser || (user && comment.user.id == user.id)">
                    删除
                </span>
            </div>
            <comment-node :comments="comments"
                :current-comment="comment.id"
                v-show="!hide[$index]"
                :superuser="superuser"
                :user="user">
            </comment-node>
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