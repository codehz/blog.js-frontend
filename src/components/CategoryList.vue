<style lang="stylus">
.aside-category
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
        line-height 40px
        padding 5px 10px
        padding-left 20px
</style>

<template>
    <div class="aside-category blurred shadow border-radius" :class="{finish: finish}">
        <label class="ui-label">主题</label>
        <span v-for="item in categories" class="button" @click="go(item)">{{item}}</span>
    </div>
</template>

<script>
export default {
    name: 'CategoryList',
    data: () => ({
        categories: [],
        finish: false
    }),
    methods: {
        refresh() {
            this.$http.get('category').then(({data}) => this.categories = data.body.map(value => value.name));
        },
        go(data) {
            this.$router.go({ name: 'search', params: { 'searchOption': 'category' }, query: { data } });
        }
    },
    watch: {
        categories() {
            this.$nextTick(() => this.finish = true);
        }
    },
    created() {
        this.$nextTick(this.refresh);
    },
}
</script>