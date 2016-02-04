<style lang="stylus">
@import "../main.styl"
.aside-search
    padding-bottom 10px
    transform translateX(100%)
    transition all .7s ease
    &.finish
        transform translateX(0%)
    > :first-child
        margin-top 0
        padding-top 20px
    > input
        display inline-block
        padding 0
        margin 0
        border 0
        height 24px
        background semi
        padding-left 20px
        width calc(100% - 100px)
        &:focus
            outline: none !important;
    > span
        display inline-block
        float right
        text-align right
        width 60px
        height 24px
        padding 0
        margin 0
        padding-right 20px
</style>

<template>
    <div class="aside-search blurred shadow border-radius" :class="{finish: finish}">
        <label class="ui-label">站内搜索</label>
        <input v-model="search" placeholder="搜索">
        <span title="右键快速搜索" class="button" @click="doSearch">搜索</span>
    </div>
</template>

<script>
export default {
    name: 'SearchPanel',
    data: () => ({
        search: "",
        finish: false
    }),
    props: ['user'],
    ready() {
        this.$nextTick(() => this.finish = true);
    },
    methods: {
        doSearch() {
            this.$router.go({ name: 'search', params: { searchOption: 'simple' } , query: { data: this.search } })
        }
    }
}
</script>