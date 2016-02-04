<style lang="stylus">
@import "../main.styl"

html,
body
    margin 0
    padding 0

body
    background-image url(/static/res/image.jpg)
    background x-back
    display block

.button
    position relative
    top 0
    display inline
    text-align center
    background main-color
    box-shadow 0 1.5px 0 half, 0 0px 0 semi
    user-select none
    cursor pointer
    color white
    font-size 16px
    padding 0 5px
    transition all ease .1s
    &:active
        top 1.2px
        box-shadow 0 0.3px 0 half, 0 -1.2px 0 semi
    &.psuedo-button
        background seco-color

.category-button
    background main-color
    padding 5px
    margin 0

.fade-transition
    transition all .3s ease

.fade-enter
.fade-leave
    transform translate3D(0, -100%, 0)
    opacity 0

.padding-space
    height 160px
    transition height .7s ease
    display block

.blurred
    display block
    background-image url(/static/res/image-blur.jpg)
    background x-back-blur

.center
    margin-left auto
    margin-right auto

.shadow
    position relative
    &::before
        content ""
        position absolute
        display block
        bottom 0px
        left 0px
        width 100%
        top 0
        box-shadow 0px 3px 0px rgba(0, 0, 0, 0.5)
        z-index -2
        transition all .3s ease
    &:hover
        &::before
            transition all .3s ease
            box-shadow 0px 3px 0px rgba(0, 0, 0, 0.7)

.shadow-top
    box-shadow 0px 5px 0px rgba(0, 0, 0, 0.5)

.blurred-trans
    position relative
    display block
    background-image url(/static/res/image.jpg)
    background x-back

#logo
    position relative
    padding-top 100px
    padding-bottom 70px
    display block
    margin-left auto
    margin-right auto
    display block
    width 550px
    height auto
    mask-image url(/static/res/text.svg)
    mask-size 550px auto
    mask-repeat no-repeat
    mask-position 0px 100px
    z-index 1
    & > img
        &:first-child
            position relative
            width 550px
            height auto
        &:last-child
            transition all .7s ease
            position absolute
            left 0
            width 550px
            height auto
            opacity 0

#title
    width 800px
    transition all .7s ease
    &::before
        box-shadow 0px 5px 0px rgba(0, 0, 0, 0.5)
    &:hover
        &::before
            box-shadow 0px 5px 0px rgba(0, 0, 0, 0.7)
        & > #logo
            & > img
                &:last-child
                    transition all .7s ease
                    opacity 1

#main
    position relative
    margin-top 0px
    top 200px
    transition all .7s ease

.hide
    display none

.nav-list
    > a
        text-decoration none
        &:last-child
            background seco-color

.blurred,
.blurred-trans,
body
    background-size 100% auto
    background-attachment fixed
    background-repeat no-repeat
    background-position 50% 50%

#topbar
    position fixed
    width 100%
    height 50px
    top 0px
    opacity 1
    transition all .7s ease
    z-index 2
    transform translateZ(0)
    &.fixed-header
    &:hover
        + #topbar-content
        ~ #topbar-back
            margin-top 0px

#topbar-content
    position fixed
    width 100%
    height 50px
    margin-top -50px
    z-index 5
    top 0px
    cursor context-menu
    box-sizing content-box
    opacity 1
    transition margin-top .2s ease
    transform translateZ(0)
    &.fixed-header
    &:hover
        margin-top 0px
        + #topbar-back
            margin-top 0px
        .right-box
            margin-right 0
        &:hover
            .left-box
                margin-left 0
            ~ #normal-nav.hide-nav
                opacity 0
                margin-left 0
                margin-right 0
                .nav-list :first-child
                    padding-left 120px
    div
        &.button
            text-decoration none
            height 20px
            line-height 50px
            padding 5px
            box-shadow 0px 3px 0px half
            &:active
                top 2px
                box-shadow 0px 1px 0px half, 0 -2px 0 semi

#topbar-back
    position fixed
    width 100%
    height 50px
    margin-top -50px
    top 0px
    box-shadow 0px 5px 0px half
    transition margin-top .2s ease
    z-index 0
    transform translateZ(0)

.right-box
    position absolute
    right 0
    margin-right -50%
    transition margin-right .2s ease

.left-box
    width 100%
    margin-left -50%
    transition margin-left .2s ease

#username-top
    line-height 50px
    font-size 0
    :last-child
        padding-right 20px !important

#normal-top
    :last-child
        padding-right 20px !important

nav
    font-weight bolder
    text-align left

#abs-nav
    height 50px
    line-height 50px
    flex 1
    color black
    opacity 0
    text-rendering optimizeLegibility
    transition all .7s ease
    transform translateZ(0)
    .nav-list
        :first-child
            padding-left 120px
            margin 0

#normal-nav
    transition all .7s ease
    height 50px
    margin-top 20px
    margin-bottom 0px
    margin-left 100px
    margin-right 100px
    line-height 50px
    transform translateZ(0)
    .nav-text > .button
        padding 5px
        padding-left 20px
    .nav-list
        :first-child
            padding-left 20px
            transition all .7s ease
            margin 0

.nav-show
    transition all .7s ease
    opacity 1 !important

.container
    display inline-block
    margin-left 100px
    margin-right 100px
    margin-bottom 100px
    width calc(100% - 200px)
    transition all .7s ease
    .article-view
        width calc(100% - 420px)
        float left
        padding-bottom 3px;
        overflow hidden
    .aside-view
        display inline-block
        margin-top 20px
        margin-left 20px
        padding-bottom 10px
        width 400px
        float right
        overflow hidden

footer
    min-height 50px
    transition all .7s ease
    padding 50px

.panel
    display flex
    flex-direction row
    flex-wrap wrap
    padding-left 20px
    padding-right 20px
    padding-top 20px
    box-sizing border-box
    height auto
    overflow hidden
    & > *
        display block
        flex 1 2 200px
        padding 10px
        margin 5px !important
    div
        flex 1 1 50px
    input
        outline none
        border none
        font 16px Arial, Helvetica, sans-serif
        height 45px
        padding 0 10px
        width calc(100% - 20px)
        z-index 5
        box-shadow inset 0 3px 0px rgba(0, 0, 0, 0.5)

.panel-anim-transition
    transition all .1s ease

.panel-anim-enter, .panel-anim-leave
    overflow hidden
    height 0px
    padding-top 0px
    padding-bottom 0px
    opacity 0

.label-arrow
    position relative
    display inline-block
    margin-right 16px !important
    padding 0px 8px 0px 6px
    background main-color
    &.label-arrow-right
        border-top-right-radius 0
        border-bottom-right-radius 0
        margin-right 10px
        &::after
            display block
            left 100%
            top 50%
            border solid transparent
            content " "
            height 0
            width 0
            position absolute
            border-left-color @background
            border-width 10px
            margin-top -10px

::-webkit-input-placeholder
    color #956104

:-moz-placeholder
    color #956104
    opacity 1

::-moz-placeholder
    color #956104
    opacity 1

:-ms-input-placeholder
    color #956104

:placeholder-shown
    color #956104

#login_panel
    display grid
    display grid

@media (max-aspect-ratio: 3/2)
    .blurred,
    .blurred-trans,
    body
        background-size auto 100%

@media (max-height: 700px)
    #main
        top 100px

@media (min-width: 2048px)
    #main
        top 400px

@media (min-width: 1920px)
    #main
        top 300px
    #title
        width 40%

@media (max-width: 1023px), (max-height: 550px)
    #main
        top 0px
    #title
        width 100%
        padding-top 50px
    #abs-nav .nav-list :first-child
        padding-left 20px
        margin 0
    #normal-nav
        margin 0
        width 100%
    .container
        margin 0
        width 100%
    #logo
        padding-top 50px
        padding-bottom 35px
        mask-position 0px 50px
        width 50%
        mask-size 100% auto
        margin-left auto
        margin-right auto
    .padding-space
        height 0
    #logo>img:first-child
    #logo>img:last-child
        width 100%
        height auto

@media (max-width: 959px)
    .container
        .article-view
            width 100%
        .aside-view
            width 100%
            float none
            margin-left 0

@media (min-aspect-ratio: 17/8)
    #main
        top 0px
    #title
        width 100%
    .padding-space
        height 0

code
    font-family monospace

.ui-label
    background semi
    display block
    font-size large
    padding 5px 20px
    margin 10px 0
    margin-top 10px

.bottom-bar
    margin 0
    padding 0
    padding-top 5px
    padding-bottom 20px
    background semi
    :first-child
        padding-right 20px
    :last-child
        clear both
[v-cloak]
    display none
</style>
<template>
    <div id="main">
        <div id="topbar" :class="{ 'fixed-header': !fix }"></div>
        <div id="topbar-content" :class="{ 'fixed-header': !fix }">
            <div class="right-box" style="z-index: 2;">
                <div class="space"></div>
                <div id="normal-top" v-if="!user && lrstate == 0">
                    <div class="button" @click="toLogin()">登陆</div><div class="button" @click="toRegister()">加入Blog.js</div>
                </div>
                <template v-else>
                    <div id="username-top" v-if="user">
                        <div class="psuedo-button button top-button">欢迎回来{{user.name}}</div>
                        <div class="button top-button" @click="logout()">登出</div>
                        <div class="button top-button" @click="toCMD()" v-if="user.superuser">进入控制台</div>
                    </div>
                    <div v-else>
                        <div class="button" @click="closePanel()">关闭</div>
                    </div>
                </template>
            </div>
            <div class="left-box">
                <nav id="abs-nav" :class="{ 'nav-show': fix }">
                    <div class="nav-list" v-else>
                        <a class="button category-button" v-for="item in navData" @click="onNavPress($index, item.url)">{{item.text}}</a>
                    </div>
                </nav>
            </div>
        </div>
        <div id="topbar-back" class="blurred" :class="{ 'fixed-header': !fix }"></div>
        <div class="blurred shadow center" id="title" @click="goHome()">
            <div class="panel" v-if="!user && lrstate == 1" transition="panel-anim">
                <input class="blurred-trans"
                    type="email"
                    name="email"
                    placeholder="Email"
                    v-model="loginform.email"
                    id="login-first" />
                <input class="blurred-trans"
                    type="password"
                    name="password"
                    placeholder="Password"
                    v-model="loginform.password" />
                <div class="button" @click="login">登陆</div>
                <div class="button" @click="closePanel()">关闭</div>
            </div>
            <div class="panel" v-if="!user && lrstate == 2" transition="panel-anim">
                <input class="blurred-trans"
                    type="text" name="name"
                    placeholder="Username"
                    v-model="regform.name"
                    id="register-first" />
                <input class="blurred-trans"
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    v-model="regform.phone" />
                <input class="blurred-trans"
                    type="email"
                    name="email"
                    placeholder="Email"
                    v-model="regform.email" />
                <input class="blurred-trans"
                    type="password"
                    name="password"
                    placeholder="Password"
                    v-model="regform.password" />
                <div class="button" @click="register">加入Blog.js</div>
                <div class="button" @click="closePanel()">关闭</div>
            </div>
            <div class="blurred-trans" id="logo" :class="{ 'fixed-header': fix }">
                <img src="/static/res/shadow.png" /><img src="/static/res/shadow.png" />
            </div>
        </div>
        <div class="padding-space">
        </div>
        <nav id="normal-nav" class="blurred shadow" :class="{ 'hide-nav': fix }">
            <div class="nav-list" v-else>
                <a class="button category-button" v-for="item in navData" @click="onNavPress($index, item.url)">{{item.text}}</a>
            </div>
        </nav>
        <div class="container" v-cloak>
            <div class="article-view">
                <router-view
                    :user="user"
                    :data_ready="data_ready"
                    class="view"
                    transition="fade"
                    transition-mode="out-in">
                </router-view>
            </div>
            <aside class="aside-view">
                <search-panel></search-panel>
                <category-list></category-list>
                <keyword-list :user="user"></keyword-list>
            </aside>
        </div>
        <footer id="footer-fix" class="blurred" style="z-index:20">
            本项目开源：http://github.com/CodeHz/blog.js
        </footer>
    </div>
</template>
<script>
import Vue from 'vue'
import config from '../config'
import debounce from 'debounce'
import SearchPanel from './SearchPanel.vue'
import CategoryList from './CategoryList.vue'
import KeywordList from './KeywordList.vue'
const baseData = {text: 'Blog.js', url: '/'};
export default {
    name: 'App',
    data() {
        return {
            user: null,
            mobile: false,
            fix: false,
            lrstate: 0,
            navData: [{text: 'Blog.js', url: '/'}],
            data_loaded: false,
            data_ready: false,
            loginform: {
                email: "",
                password: ""
            },
            regform: {
                name: "",
                phone: "",
                email: "",
                password: ""
            },
        }
    },
    computed: {
        token: {
            set: function (value) {
                Vue.http.headers.common['Authorization'] = value;
                localStorage.setItem('token', value);
                if (value)
                    this.getUser(() => this.token = undefined)

            },
            get: function() {
                return this.$http.headers.common['Authorization']
            }
        }
    },
    events: {
        updateTitle({paths}) {
            if (paths) this.navData = [baseData,...paths];
        }
    },
    methods: {
        login() {
            this.$http.post('login', this.loginform).then(({data}) => this.token = data.body.token);
            this.closePanel();
            this.$broadcast('needUpdate');
        },
        register() {
            this.$http.post('register', this.regform).then(({data}) => this.token = data.body.token);
            this.closePanel();
            this.$broadcast('needUpdate');
        },
        logout() {
            this.token = undefined;
            this.user = null;
            this.$broadcast('needUpdate');
        },
        toLogin() {
            this.lrstate = 1;
            this.$nextTick(() => {
                document.getElementById("login-first").focus();
            });
        },
        toRegister() {
            this.lrstate = 2;
            this.$nextTick(() => {
                document.getElementById("register-first").focus();
            });
        },
        closePanel() {
            this.lrstate = 0;
        },
        goHome() {
            if (this.lrstate <= 0) this.$router.go('/');
        },
        goTop() {
            this.$nextTick(() => window.scrollTo(0, 0));
        },
        getUser(err) {
            if (!this.token) {
                this.data_ready = true;
                return;
            }
            this.$http.get('me').then(({data}) => {
                this.user = data.body;
                this.data_ready = true;
            }, ({status}) => {
                this.data_ready = true;
            });
        },
        onNavPress(index, url) {
            if (index == 0) {
                window.history.back();
            } else {
                this.$router.go(url);
            }
        },
        toCMD() {
            this.$router.go('/control');
        }
    },
    components: {
        SearchPanel, CategoryList, KeywordList
    },
    watch: {
        data_ready(value) {
            if (value && this.data_loaded) {
                this.$broadcast('needUpdate');
            }
        }
    },
    ready() {
        console.log('UA: ', navigator.userAgent);
        // if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        //     document.getElementById("logo").className = document.getElementById("logo").className.replace
        //         ( /(?:^|\s)blurred-trans(?!\S)/g , '' );
        // }
        // if (/MSIE/i.test(navigator.userAgent) || /EDGE/i.test(navigator.userAgent)) {
        //     var sheet = document.createE lement('style');
        //     sheet.innerHTML = ".blurred {background: rgba(255, 255, 255, 0.5) !important;}\n" +
        //         ".blurred-trans {background: transparent !important;}\n" +
        //         "#logo > img {background: url(/static/res/text.png);background-size: 100% 100%; opacity: 0.2 }";
        //     document.body.appendChild(sheet);
        // }
        // if (/Android/i.test(navigator.userAgent)) {
        //     var sheet = document.createElement('style');
        //     sheet.innerHTML = "#title{display: none}\n" +
        //         ".blurred {background: rgba(255, 255, 255, 1) !important;}\n" +
        //         ".blurred-trans {background: transparent !important;}\n" +
        //         "body {background: none !important}" +
        //     document.body.appendChild(sheet);
        //     this.mobile = true;
        // }
        let mainEl = document.getElementById("main");
        let h = document.getElementById("normal-nav");
        function getDistance(el) {
            var topDist = el.offsetTop;
            return topDist;
        }

        if (!this.mobile)
            window.onscroll = debounce((e) => {
                var distance = getDistance(h) - window.pageYOffset + parseInt(window.getComputedStyle(mainEl, null).top) - 50;
                this.fix = distance < 0;
            }, 100);
        if (this.data_ready && !this.data_loaded) {
            this.$broadcast('needUpdate');
        }
        this.$nextTick(() => this.data_loaded = true);
    },
    created() {
         this.getUser();
    }
}
</script>
