<template>
  <div id="app">
    <div class="mdui-toolbar mdui-color-theme">
      <button @click="goBack()" class="mdui-btn mdui-btn-icon" mdui-tooltip="{content: '返回'}"><i
        class="mdui-icon material-icons">arrow_back</i></button>
      <router-link :to="{name: 'Index'}"><span class="mdui-typo-title">Vote System</span></router-link>
      <div class="mdui-toolbar-spacer"></div>
      <button @click="goForth()" class="mdui-btn mdui-btn-icon mdui-float-right" mdui-tooltip="{content: '前进'}"><i
        class="mdui-icon material-icons">arrow_forward</i></button>
    </div>
    <div class="mdui-container">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
          </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件，比如 Edit！ -->
        </router-view>
    </div>
    <div class="mdui-bottom-nav mdui-color-theme mdui-m-t-5">
      <div class="mdui-container">
        <div class="mdui-typo mdui-typo-caption mdui-text-center mdui-m-t-2">
          Made with ❤️
        </div>
        <div class="mdui-typo-caption-opacity mdui-text-center">
          Powered by HFIProgramming | 华附（国际部）编程社
        </div>
      </div>
    </div>
    <top-button></top-button>
  </div>
</template>

<script>
import TopButton from './components/TopButton.vue'

export default {
  name: 'App',
  components: {
    TopButton,
  },
  methods: {
    goBack: function () {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
    goForth: function () {
      this.$router.go(1)
    }
  }
}
</script>

<style>

</style>
