<style lang="stylus">
.search-view
    margin-top 20px
    .section-title
        > label
           padding-top 20px
        > span
            position absulate
            margin-right 20px
            margin-top -40px
            user-select none
            cursor pointer
            float right
</style>

<template>
    <div>
        <div class="search-view" v-for='single in result' v-if="single.enable">
            <div class="section-title blurred shadow border-radius" v-if="multi">
                <label class="ui-label">{{$key|toName}}</label>
                <span v-if="$key != 'advantage'" @click="more($key, single.query[$key])">更多</span>
            </div>
            <item-renderer :current-articles="single.data" :border='true'></item-renderer>
        </div>
    </div>
</template>

<script>
import async from 'async'
import ItemRenderer from './ItemRenderer.vue'
const empty_template = () => ({enable: false, ready: false, query: [], data: []});
const query_template = query => ({enable: true, ready: false, query, data: []});
class SearchTask {
    constructor() {
        this.enable = false;
        this.ready = false;
        this._query = [];
        this.data = [];
    }

    get query() {
        return this._query;
    }

    set query(value) {
        this.enable = true;
        this._query = value;
    }
}
export default {
    name: 'SearchView',
    data: () => ({
        query: [],
        multi: false,
        result: {
            user: new SearchTask(),
            title: new SearchTask(),
            content: new SearchTask(),
            keywords: new SearchTask(),
            category: new SearchTask(),
            advantage: new SearchTask()
        }
    }),
    props: {
        user: null,
        data_ready: null
    },
    events: {
        needUpdate() {
            this.$nextTick(this.refresh);
        }
    },
    components: {
        ItemRenderer
    },
    filters: {
        toName(key) {
            return {
                title: '标题',
                content: '内容',
                category: '类别',
                keywords: '关键词',
                advantage: '高级',
            }[key];
        }
    },
    route: {
        data({ to }) {
            switch (to.params.searchOption) {
                case 'simple':
                    this.result.title.query = {title: to.query.data};
                    this.result.content.query = {content: to.query.data};
                    this.multi = true;
                    this.$dispatch('updateTitle', { paths: [{ text: '简易搜索', url: '' }, { text: to.query.data, url: '' }] });
                    break;
                case 'title':
                    this.result.title.query = {title: to.query.data};
                    this.$dispatch('updateTitle', { paths: [{ text: '标题搜索', url: '' }, { text: to.query.data, url: '' }] });
                    break;
                case 'content':
                    this.result.content.query = {content: to.query.data};
                    this.$dispatch('updateTitle', { paths: [{ text: '内容搜索', url: '' }, { text: to.query.data, url: '' }] });
                    break;
                case 'category':
                    this.result.category.query = {category: to.query.data};
                    this.$dispatch('updateTitle', { paths: [{ text: '类别搜索', url: '' }, { text: to.query.data, url: '' }] });
                    break;
                case 'keywords':
                    console.log('keywords', to.query.keywords);
                    this.result.keywords.query = {keywords: to.query.keywords};
                    this.$dispatch('updateTitle', { paths: [{ text: '关键词搜索', url: '' }, { text: to.query.keywords.join(','), url: '' }] });
                    break;
                case 'advantage':
                    this.result.advantage.query = to.query; 
                    this.$dispatch('updateTitle', { paths: [{ text: '高级搜索', url: '' }, { text: to.query.data, url: '' }] });
                    break;
            }
            if (this.data_ready) this.$nextTick(this.refresh);
        },
        canReuse() {
            return false;
        }
    },
    methods: {
        refresh() {
            console.log('refresh');
            async.filter(Object.values(this.result), (single, callback) => callback(single.enable), result => {
                console.log('refresh', result);
                async.each(result, (single, callback) => {
                    console.log('refresh', single.query);
                    this.$http.get((this.user ? 'article' : 'public/article'), {}, { params: single.query }).then(({ data: { body } }) => {
                        single.data = body
                    })
                })
            })
        },
        more(key, data) {
            this.$router.go({ name: 'search', params: { 'searchOption': key }, query: { data } });
        }
    }
}
</script>