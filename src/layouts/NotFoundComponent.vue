<template>
  <div class="mdui-container">
    <div class="mdui-card mdui-m-t-5 mdui-col-xs-12">
      <div class="mdui-container mdui-m-t-5 mdui-m-b-5">
      <div class="mdui-typo-display-3 mdui-text-center">您请求的页面不存在！</div>
      <div class="mdui-typo-display-2-opacity mdui-text-center">The page you requested does not exist!</div>

      <button class="mdui-btn mdui-btn-raised mdui-color-theme-accent mdui-ripple mdui-col-xs-12 mdui-m-t-5" @click="goHome()">返回首页 | Back to HomePage</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoFound',
  methods: {
    goHome: function () {
      this.$router.push('/')
    }
  }
}
</script>
