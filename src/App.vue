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
      <transition name="fade">
        <router-view/>
      </transition>
    </div>
    <div class="mdui-bottom-nav mdui-color-theme mdui-m-t-5">
      <div class="mdui-container">
        <div class="mdui-typo mdui-typo-caption mdui-text-center mdui-m-t-2">
          编程社出品
        </div>
        <div class="mdui-typo-caption-opacity mdui-text-center">
          Powered by HFIProgramming
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
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
