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
    this.show_process.open()
  },
  beforeDestroy: function () {
    this.show_process.close()
  },
  destroy: function () {
    this.$mdui.mutation()
  },
  computed: {
    show_process: function () {
      return new this.$mdui.Dialog('#process', {
        history: false,
        modal: true,
        destroyOnClosed: true
      })
    }
  }
}

</script>
