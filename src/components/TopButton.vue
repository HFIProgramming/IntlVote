<template>
  <transition>
    <button @click="backToTop" v-bind:class="'mdui-fab mdui-fab-fixed mdui-ripple mdui-color-red '+ button" mdui-tooltip="{content: '返回顶部'}">
      <i class="mdui-icon material-icons">arrow_upward</i>
    </button>
  </transition>
</template>

<script>
// https://github.com/caiofsouza/vue-backtotop
export default {
  name: 'TopButton',
  props: {
    visibleOffset: {
      type: [String, Number],
      default: 50
    }
  },
  data () {
    return {
      visible: false
    }
  },
  computed: {
    button: function () {
      return this.visible ? '' : 'mdui-fab-hide'
    }
  },
  /**
     * Catch window scroll event
     * @return {void}
     */
  created () {
    let catchScroll = () => {
      this.visible = (window.pageYOffset > parseInt(this.visibleOffset))
    }

    window.smoothscroll = () => {
      let currentScroll = document.documentElement.scrollTop || document.body.scrollTop
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll)
        window.scrollTo(0, Math.floor(currentScroll - (currentScroll / 5)))
      }
    }

    window.onscroll = catchScroll
  },
  methods: {
    /**
       * The function who make the magics
       * @return {void}
       */
    backToTop () {
      window.smoothscroll()
    }
  }
}
</script>
