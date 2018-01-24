<template>
  <form @submit.prevent="submit">
    <template v-for="question in questions">
    <vote-question v-bind:question="question"></vote-question>
    </template>
    <div class="mdui-card mdui-m-t-5 mdui-col-xs-12">
      <div class="mdui-card-content mdui-m-b-5">
        <button class="mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent mdui-col-xs-12"
                @click="submit_result()" v-bind:disabled="submit">提交
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import VoteQuestion from './vote/VoteQuestion.vue'

export default {
  name: 'vote-card',
  props: ['questions', 'url'],
  computed: {},
  components: {
    VoteQuestion
  },
  data () {
    return {
      submit: false,
      selectedSelection: [],
      json: null,
      err: null
    }
  },
  mounted: function () {
    this.$bus.$on('change-option', (pack) => {
      if (pack.state === 'add') {
        this.selectedSelection.push(pack.option_id)
      } else if (pack.state === 'remove') {
        this.selectedSelection = this.selectedSelection.filter(item => item !== pack.option_id)
      }
    })
  },
  watch: {
    json: function (n, o) {
      if (n !== null) {
        if (this.err !== null) {
          this.submit = false
          this.$mdui.snackbar({
            message: this.err
          })
        } else if (n.status === '200') {
          this.$mdui.snackbar({
            message: '提交成功！正在返回……',
            buttonText: '现在返回',
            onClose: function () {
              this.$route.go(-1)
            },
            timeout: 2000
          })
        } else {
          this.submit = false
          this.$mdui.snackbar({
            message: '提交数据时出现问题，请检查后重试！(存在问题：' + n.message + ')'
          })
        }
      }
    }
  },
  methods: {
    submit_result: function () {
      this.submit = true
      this.$mdui.snackbar({
        message: '正在提交数据……',
        timeout: 1000
      })
      this.$mdui.JQ.ajax({
        method: 'POST',
        url: this.url,
        data: JSON.stringify({selected: this.selectedSelection}),
        success: (data) => {
          this.json = JSON.parse(data)
        },
        error: (data) => {
          this.err = '服务器请求出错！请稍后再试'
        }
      })
    }
  }
}
</script>
