<style lang="stylus">
@import "../main.styl"

html,
body
    margin 0
    padding 0

body
    background-image url(/static/res/image.jpg)
    display block

.button
    display inline
    text-align center
    background rgba(223, 163, 54, 1)
    border-radius 3px
    user-select none
    cursor pointer

.category-button
    background #FFEA78
    padding 5px
    margin 0px 3px

.fade-transition
    transition opacity .3s ease

.fade-enter, .fade-leave
    opacity 0


.padding-space
    height 160px
    display block

.blurred
    display block
    background-image url(/static/res/image-blur.jpg)
    transition box-shadow .3s ease
    &:hover
        transition box-shadow .3s ease
        box-shadow inset 0 0 100px rgba(255, 255, 255, 0.5)

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
        top 0%
        box-shadow 0px 5px 10px rgba(0, 0, 0, 0.5)
        z-index -2
        transition all .3s ease
    &:hover
        &::before
            transition all .3s ease
            box-shadow 0px 7.5px 15px rgba(0, 0, 0, 0.7)

.shadow-top
    box-shadow 0px 5px 10px rgba(0, 0, 0, 0.5)

.blurred-trans
    position relative
    display block
    background-image url(/static/res/image.jpg)

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
    &:hover
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

.blurred,
.blurred-trans,
body
    background-size 100% auto
    background-attachment fixed
    background-repeat no-repeat
    background-position 50% 50%

.border-radius,
.shadow.border-radius:before
    border-radius 3px

#topbar-back
    position fixed
    width 100%
    height 50px
    top 0px
    box-shadow 0px 5px 10px rgba(0, 0, 0, 0.5)
    &.fixed-header
        z-index 1

#topbar
    position fixed
    width 100%
    height 50px
    top 0px
    background rgba(255, 255, 255, 0.90)
    background linear-gradient(top, #FFF, rgba(255, 255, 255, 0.90) 50%, rgba(255, 255, 255, 0.5))
    opacity 0
    transition all .7s ease
    z-index 5

#topbar-content
    position fixed
    width 100%
    height 50px
    z-index 10
    top 0px
    cursor context-menu
    box-sizing content-box
    div
        &.button
            text-decoration none
            height 20px
            line-height 50px
            padding 5px
            margin-left 5px

#username-top
    line-height 50px

.box
    display block
    position absolute

.header-contaniner
    text-align center
    display flex
    align-items center
    & > nav
        text-align center
        flex 1
        color black
        opacity 0
        font-weight bolder
        text-rendering optimizeLegibility
        font-size large
        transition opacity .7s ease

.container
    display flex
    flex-direction column
    flex-wrap wrap
    margin 0 calc(20% - 100px)
    margin-bottom 100px
    transition all .7s ease
    & > div
        flex 1
        & > section
            display block
            min-height 20px

.container > nav,
.container > div > section
    margin 20px

.flex-1
    flex 1 1 300px

.flex-2
    flex 2 1 600px

.flex-3
    flex 4 1 800px

#abs-nav
    height 50px
    line-height 50px

#normal-nav
    transition opacity .7s ease
    height 50px
    margin-top 20px
    margin-bottom 0px
    margin-left calc(20% - 80px)
    margin-right calc(20% - 80px)
    font-weight bolder
    line-height 50px
    text-align center
    opacity 1
    z-index 1
    &.nav-hide
        transition all .7s ease
        margin 0px
        height 0px
        margin-bottom 70px
        opacity 0
        font-size large
        color transparent
        &:before
            box-shadow none

.nav-show
    transition all .7s ease
    opacity 1 !important

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
        background transparent
        outline none
        border none
        font 16px Arial, Helvetica, sans-serif
        height 45px
        padding 0 10px
        width calc(100% - 20px)
        z-index 5
        box-shadow inset 0 5px 10px rgba(0, 0, 0, 0.5)

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
        border-radius 0px
    #logo
        padding-top 50px
        padding-bottom 35px
        mask-position 0px 50px
        width 50%
        mask-size 100% auto
        margin-left auto
        margin-right auto
    .padding-space
        display none
    #logo>img:first-child
    #logo>img:last-child
        width 100%
        height auto

@media (max-width: 799px)
    .container
        margin 10px
    #normal-nav
        margin-left 30px
        margin-right 30px

@media (min-aspect-ratio: 17/8)
    #main
        top 0px
    #title
        width 100%

</style>
<template>
    <div id="main">
        <div id="topbar-content">
            <div class="box" style="right: 10px;z-index: 2;">
                <div class="space"></div>
                <template v-if="!user && lrstate == 0">
                    <div class="button" @click="toLogin()">登陆</div>
                    <div class="button" @click="toRegister()">加入Blog.js</div>
                </template>
                <template v-else>
                    <div id="username-top" v-if="user">
                        欢迎回来{{user.name}}
                        <div class="button top-button" @click="logout()">登出</div>
                        <div class="button top-button" @click="toCMD()" v-if="user.superuser">进入控制台</div>
                    </div>
                    <div v-else>
                        <div class="button" @click="closePanel()">关闭</div>
                    </div>
                </template>
            </div>
            <div class="header-contaniner">
                <nav id="abs-nav" :class="{ 'nav-show': fix }" @click="goTop()">
                    <template v-if="navType == 0">
                        {{navText}}
                    </template>
                    <template v-else>
                        <div class="button category-button" v-for="item in navData">{{item}}</div>
                    </template>
                </nav>
            </div>
        </div>
        <div id="topbar" :class="{ 'fixed-header': fix }"></div>
        <div id="topbar-back" class="blurred" :class="{ 'fixed-header': fix }"></div>
        <div class="blurred shadow border-radius center" id="title" @click="goHome()">
            <div class="panel" v-if="!user && lrstate == 1" transition="panel-anim">
                <input class="border-radius blurred-trans"
                    type="email"
                    name="email"
                    placeholder="Email"
                    v-model="loginform.email"
                    id="login-first" />
                <input class="border-radius blurred-trans"
                    type="password"
                    name="password"
                    placeholder="Password"
                    v-model="loginform.password" />
                <div class="button" @click="login">登陆</div>
                <div class="button" @click="closePanel()">关闭</div>
            </div>
            <div class="panel" v-if="!user && lrstate == 2" transition="panel-anim">
                <input class="border-radius blurred-trans"
                    type="text" name="name"
                    placeholder="Username"
                    v-model="regform.name"
                    id="register-first" />
                <input class="border-radius blurred-trans"
                    type="email"
                    name="email"
                    placeholder="Email"
                    v-model="regform.email" />
                <input class="border-radius blurred-trans"
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    v-model="regform.phone" />
                <input class="border-radius blurred-trans"
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
        <nav id="normal-nav" class="blurred shadow border-radius" :class="{ 'nav-hide': fix }">
            <template v-if="navType == 0">
                {{navText}}
            </template>
            <template v-else>
                <div class="button category-button" v-for="item in navData">{{item}}</div>
            </template>
        </nav>
        <div class="container">
            <router-view
                :user="user"
                class="view"
                transition="fade"
                transition-mode="out-in">
            </router-view>
        </div>
        <footer class="blurred shadow" style="z-index:20">
            本项目开源：http://github.com/CodeHz/blog.js
        </footer>
    </div>
</template>
<script>
import Vue from 'vue'
import config from '../config'
export default {
    name: 'App',
    data() {
        return {
            user: null,
            fix: false,
            lrstate: 0,
            navType: 1,
            navText: "TE ST",
            navData: [],
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
        updateTitle({title, type}) {
            this.navText = title;
            this.navType = type;
            if (type == 1) this.refresh();
        }
    },
    methods: {
        refresh() {
            this.$http.get('category').then(({data}) => this.navData = data.body.map(value => value.name));
        },
        login() {
            this.$http.post('login', this.loginform).then(({data}) => this.token = data.body.token);
            this.closePanel();
            this.refresh();
            this.$broadcast('needUpdate');
        },
        register() {
            this.$http.post('register', this.regform).then(({data}) => this.token = data.body.token);
            this.closePanel();
            this.refresh();
            this.$broadcast('needUpdate');
        },
        logout() {
            this.token = undefined;
            this.user = null;
            this.refresh();
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
            if (!this.token) return;
            this.$http.get('me').then(({data}) => this.user = data.body, ({status}) => status == 401 ? err() : 0);
            this.refresh();
        },
        toCMD() {
            this.$router.go('/control');
        }
    },
    ready() {
        console.log('UA: ', navigator.userAgent);
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            document.getElementById("logo").className = document.getElementById("logo").className.replace
                ( /(?:^|\s)blurred-trans(?!\S)/g , '' );
        }
        if (/MSIE/i.test(navigator.userAgent) || /EDGE/i.test(navigator.userAgent)) {
            var sheet = document.createElement('style');
            sheet.innerHTML = ".blurred {background: rgba(255, 255, 255, 0.5) !important;}\n" + 
                ".blurred-trans {background: transparent !important;}";
            document.body.appendChild(sheet);
        }
        if (/Android/i.test(navigator.userAgent)) {
            var sheet = document.createElement('style');
            sheet.innerHTML = ".blurred {background: rgba(255, 255, 255, 0.5) !important;}\n" +
                ".blurred-trans {background: transparent !important;}\n" +
                "body {background: none !important}\n" +
                ".container,.container > nav,.container > div > section {" +
                "margin: 0px !important; border-radius: 0px !important;}";
            document.body.appendChild(sheet);
        }
    },
    created() {
        let mainEl = document.getElementById("main");
        let h = document.getElementById("normal-nav");
        function getDistance() {
            h = h ? h : document.getElementById("normal-nav");
            var topDist = h.offsetTop;
            return topDist;
        }

        window.onscroll = (e) => {
            mainEl = mainEl ? mainEl : document.getElementById("main");
            var distance = getDistance() - window.pageYOffset + parseInt(window.getComputedStyle(mainEl, null).top) - 50;
            this.fix = distance < 0;
        }
        this.refresh();
        this.getUser();
        
    }
}
</script>