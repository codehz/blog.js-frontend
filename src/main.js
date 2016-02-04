import Vue from 'vue'
import Router from 'vue-router'
import config from './config'
import { domain, fromNow, limit } from './filters'
import App from './components/App.vue'
import ListView from './components/ListView.vue'
import ControlView from './components/ControlView.vue'
import ControlIndexView from './components/ControlIndexView.vue'
import ArticleEditor from './components/ArticleEditor.vue'
import ArticleView from './components/ArticleView.vue'
import SearchView from './components/SearchView.vue'
import marked from 'marked'
marked.setOptions({ headerPrefix: 'content-'});

// install router
Vue.use(Router);
// install vue resource
Vue.use(require('vue-resource'));

// config vue-resource
Vue.http.options.root = config.base_url;
Vue.http.headers.common['Content-Type'] = 'application/json';
if (localStorage.getItem("token") != 'undefined')
    Vue.http.headers.common['Authorization'] = localStorage.getItem("token");

// register filters globally
Vue.filter('fromNow', fromNow);
Vue.filter('domain', domain);
Vue.filter('limit', limit);

Vue.config.debug = true

// routing
var router = new Router();

router.map({
    '/': {
        name: 'root',
        component: ListView
    },
    '/article/:articleId': {
        name: 'article',
        component: ArticleView
    },
    '/control': {
        name: 'control',
        component: ControlView,
        subRoutes: {
            '/': {
                component: ControlIndexView
            },
            '/article/:articleId': {
                name: 'editArticle',
                component: ArticleEditor
            }
        }
    },
    '/search/:searchOption': {
        name: 'search',
        component: SearchView
    }
});

router.redirect({
    '*': '/'
});

router.start(App, '#app')
