<style lang="stylus">
.keyword-selector-control
    margin-bottom 10px
    .control-container
        > *
            
            margin 5px 0px
        img
            width 8px
            height 8px
            margin-bottom 2px
            cursor pointer
</style>

<template>
    <div class="keyword-selector-control">
        <input type="text" v-model="text" placeholder="关键词" @keyup.enter='submit'></input>
        <span class="control-container">
            <span v-for="keyword in keywords" class="label-arrow label-arrow-right">
                <img src="/static/res/close.png" @click="keywords.$remove(keyword)"></img>
                {{keyword}}
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