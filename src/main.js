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

// install router
Vue.use(Router);
// install vue resource
Vue.use(require('vue-resource'));

if(!window.localStorage && /MSIE/.test(navigator.userAgent)){ 
    if(!window.UserData) { 
        window.UserData = function(file_name) { 
            if(!file_name) file_name="user_data_default"; 
            var dom = document.createElement('input'); 
            dom.type = "hidden"; 
            dom.addBehavior ("#default#userData"); 
            document.body.appendChild(dom); 
            dom.save(file_name); 
            this.file_name = file_name; 
            this.dom = dom; 
            return this; 
        };

        window.UserData.prototype = { 
            setItem:function(k, v) 
            { 
                this.dom.setAttribute(k,v); 
                this.dom.save(this.file_name); 
            }, 
            getItem:function(k){ 
                this.dom.load(this.file_name); 
                return this.dom.getAttribute(k); 
            }, 
            removeItem:function(k){ 
                this.dom.removeAttribute(k); 
                this.dom.save(this.file_name); 
            },

            clear:function() { 
               this.dom.load(this.file_name); 
               var now = new Date(); 
               now = new Date(now.getTime()-1); 
               this.dom.expires = now.toUTCString(); 
               this.dom.save(this.file_name); 
            }
        };
    } 
    window.localStorage= new window.UserData("local_storage"); 
}


// config vue-resource
Vue.http.options.root = config.base_url;
Vue.http.headers.common['Content-Type'] = 'application/json';
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
        component: ListView
    },
    '/article/:articleId': {
        name: 'article',
        component: ArticleView
    },
    '/control': {
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
    }
});

router.redirect({
    '*': '/'
});

router.start(App, '#app')
