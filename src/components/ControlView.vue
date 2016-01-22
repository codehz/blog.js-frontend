<style lang="stylus">
.control-section
    padding 20px
    .section-title
        font-size large
</style>

<template>
    <div>
        <router-view>
        </router-view>
    </div>
</template>

<script>
export default {
    name: 'ControlView',
    route: {
        activate() {
            this.refresh();
        }
    },
    props: {
    },
    methods: {
        refresh() {
            this.$dispatch('updateTitle', { title: '控制面板', type: 0 });
        }
    },
    events: {
        postArticle() {
            this.$router.go({ name: 'editArticle', params: { articleId: 'create' } });
        }
    }
}
</script>