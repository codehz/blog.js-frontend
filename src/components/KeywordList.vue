<style lang="stylus">
.aside-keyword
    margin-top 20px
    padding-bottom 10px
    transform translateX(100%)
    transition all .7s ease
    &.finish
        transform translateX(0%)
    > :first-child
        margin-top 0
        padding-top 20px
    > span
        display inline-block
        margin-top 5px
        padding 5px 10px
        padding-left 20px
</style>

<template>
    <div class="aside-keyword blurred shadow border-radius" :class="{finish: finish}">
        <label class="ui-label">关键词</label>
        <span v-for="item in keywords" class="button" @click="go($key)">{{ $key }}&nbsp;:&nbsp;{{ item }}</span>
    </div>
</template>

<script>
export default {
    name: 'KeywordList',
    data: () => ({
        keywords: {},
        finish: false
    }),
    props: ['user'],
    methods: {
        refresh() {
            this.$http.get(this.user ? 'keywords' : 'public/keywords').then(({data}) => this.keywords = data.body);
        },
        go(key) {
            this.$router.go({ name: 'search', params: { 'searchOption': 'keywords' }, query: { keywords: [key] } });
        }
    },
    watch: {
        keywords() {
            this.$nextTick(() => this.finish = true);
        }
    },
    events: {
        needUpdate() {
            this.$nextTick(this.refresh);
        }
    },
}
</script>
