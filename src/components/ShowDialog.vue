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
    this.show_dialog.open()
  },
  computed: {
    show_dialog: function () {
      return new this.$mdui.Dialog('#dialog', {
        history: false,
        modal: true
      })
    }
  },
  methods: {
    goBack: function () {
      this.show_dialog.close()
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    }
  }
}

</script>
