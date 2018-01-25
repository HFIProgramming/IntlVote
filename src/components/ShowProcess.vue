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
    this.create_process()
    this.process.open()
  },
  data() {
    return {
      process: null,
    }
  },
  beforeDestroy: function () {
    this.process.close()
    this.$mdui.JQ.unlockScreen()
  },
  methods:{
    create_process: function () {
      this.process = new this.$mdui.Dialog('#process', {
        history: false,
        modal: true,
        destroyOnClosed: true
      })
    }
  }
}

</script>
