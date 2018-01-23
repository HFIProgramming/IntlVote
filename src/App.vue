<template>
  <div id="app">
    <div class="mdui-toolbar mdui-color-theme">
      <button @click="goBack()" class="mdui-btn mdui-btn-icon"><i class="mdui-icon material-icons">arrow_back</i></button>
      <span class="mdui-typo-title">Vote System</span>
      <div class="mdui-toolbar-spacer"></div>
    </div>
    <transition>
    <router-view/>
    </transition>
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
    }
  }
}
</script>

<style>

</style>
