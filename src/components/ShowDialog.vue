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
  import mdui from 'mdui'

  export default {
    props: ['message'],
    name: 'show-dialog',
    mounted: function () {
      this.show_dialog.open()
    },
    computed: {
      show_dialog: function () {
        return new mdui.Dialog('#dialog', {
          history: false,
          modal: false,
          destroyOnClosed: true,
        });
      }
    },
    methods: {
      goBack: function () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      }
    }
  }

</script>

