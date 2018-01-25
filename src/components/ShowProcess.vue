<template>
  <div class="mdui-dialog" id="process">
    <div class="mdui-dialog-title">正在载入数据……</div>
    <div class="mdui-dialog-content">
      <div class="mdui-progress">
        <div class="mdui-progress-indeterminate"></div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'show-process',
  mounted: function () {
    this.create_dialog()
    this.dialog.open()
  },
  data() {
    return {
      dialog: null,
    }
  },
  beforeDestroy: function () {
    this.dialog.close()
    this.$mdui.JQ.unlockScreen()
  },
  methods:{
    create_dialog: function () {
      this.dialog = new this.$mdui.Dialog('#process', {
        history: false,
        modal: true,
        destroyOnClosed: true
      })
    }
  }
}

</script>
