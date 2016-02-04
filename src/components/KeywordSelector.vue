<style lang="stylus">
@import "../main.styl"
.keyword-selector-control
    margin-bottom 10px
    margin-left 0
    padding 0
    input[type="text"]
        margin-bottom 10px
    .control-container
        img
            margin-bottom 2px
            margin-left 2px
            width 8px
            height 8px
            cursor pointer
        .single
            background main-color
            font-size 14px
            padding 5px 7px
            box-shadow 0 1.5px 0 half
            color white
            &:first-child
                padding-left 20px
</style>

<template>
    <div class="keyword-selector-control">
        <input type="text" v-model="text" placeholder="添加关键词" @keyup.enter='submit'></input>
        <span class="control-container">
            <span v-for="keyword in keywords" class="single">
                {{keyword}}
                <img src="/static/res/close.png" @click="keywords.$remove(keyword)"></img>
            </span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'KeywordSelector',
    props: {
        keywords: []
    },
    data: () => ({
        text: '',
    }),
    methods: {
        submit() {
            if (!this.keywords) this.keywords = [];
            this.text = this.text.trim()
            if (this.text == '') return;
            if (this.keywords.indexOf(this.text) == -1)
                this.keywords.push(this.text);
            this.text = '';
        }
    }
}
</script>