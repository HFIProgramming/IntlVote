<template>
  <div class="mdui-dialog" id="dialog">
    <div class="mdui-dialog-title">出现了一个问题</div>
    <div class="mdui-dialog-content">
      {{ message }}
    </div>
    <div class="mdui-dialog-actions">
      <button @click="goBack()" class="mdui-btn mdui-ripple">确定</button>
    </div>
  </div>
</template>

<script>

export default {
  props: ['message'],
  name: 'show-dialog',
  mounted: function () {
    this.create_dialog()
    this.dialog.open()
  },
  data () {
    return {
      dialog: null
    }
  },
  methods: {
    create_dialog: function () {
      this.dialog = new this.$mdui.Dialog('#dialog', {
        destroyOnClosed: true,
        history: false,
        modal: true
      })
    },
    goBack: function () {
      this.dialog.close()
      this.$mdui.JQ.unlockScreen()
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}

</script>
