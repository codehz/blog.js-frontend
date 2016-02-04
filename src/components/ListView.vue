<template>
    <div><item-renderer :current-articles="currentArticles" :border="true"></item-renderer></div>
</template>
<script>
import config from '../config'
import ItemRenderer from './ItemRenderer.vue'
export default {
    name: 'ListView',
    data: () => ({
        currentArticles: []
    }),
    props: {
        user: null,
        data_ready: null
    },
    route: {
        data({to}) {
            this.$dispatch('updateTitle', { paths: [] });
            if (this.data_ready) this.refresh();
        }
    },
    events: {
        needUpdate() {
            this.$nextTick(this.refresh);
        }
    },
    components: {
        ItemRenderer
    },
    methods: {
        goArticle(articleId) {
            this.$router.go({ name: 'article', params: { articleId } });
        },
        refresh() {
            this.$http.get(this.user ? 'article' : 'public/article').then(({ data: { body } }) => this.currentArticles = body);
        }
    }
}
</script>