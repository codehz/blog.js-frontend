<style lang="stylus">
.control-index-section
    padding 20px
    .button
        padding 3px 5px
        margin-right 5px
</style>

<template>
    <section class="blurred shadow flex-1 border-radius control-index-section">
        <div class="button" @click="onPress('postArticle')">发表文章</div>
    </section>
</template>

<script>
export default {
    name: 'ControlIndexView',
    methods: {
        onPress(target) {
            this.$dispatch(target);
        }
    }
}
</script>