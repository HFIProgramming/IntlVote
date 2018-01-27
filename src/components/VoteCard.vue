<template>
  <form @submit.prevent="submit_result()">
    <template v-for="question in questions">
      <vote-question v-bind="{question: question, has_selected: has_selected}"></vote-question>
    </template>
    <div class="mdui-card mdui-m-t-5 mdui-col-xs-12">
      <div class="mdui-card-content mdui-m-b-1">
        <button class="mdui-btn mdui-ripple mdui-btn-raised mdui-color-theme-accent mdui-btn-block"
                v-bind:disabled="submit">提交
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import VoteQuestion from './vote/VoteQuestion.vue'

export default {
  name: 'vote-card',
  props: {
    questions: null,
    url: {
      type: String,
      required: true
    },
    end_word: {
      type: String,
      default: '感谢您投出宝贵的一票！'
    },
    has_selected: {
      type: null,
      default: function () {return []},
    }
  },
  computed: {
    allQuestionSelected: function () {
      return this.selectedQuestionNum === this.questions.length
    },
    submit: function () {
      if (this.manuallyLockSubmit) {
        return true
      }
      return !this.allQuestionSelected
    }
  },
  components: {
    VoteQuestion
  },
  data () {
    return {
      selectedSelection: [],
      selectedQuestion: {},
      manuallyLockSubmit: false,
      manuallyConfirmSelection: false,
      selectedQuestionNum: 0,
      json: null,
      err: null
    }
  },
  mounted: function () {
    this.$bus.$on('change-option', (pack) => {
      if (pack.state === 'add') {
        this.selectedSelection.push(pack.option_id)
      } else if (pack.state === 'remove') {
        this.selectedSelection.splice(this.selectedSelection.indexOf(pack.option_id), 1)
      }
    })
    this.$bus.$on('question-status', (pack) => {
      this.selectedQuestion[pack.question_id] = pack.state
      this.selectedQuestionNum += pack.status
    })
  },
  watch: {
    json: function (n, o) {
      if (n !== null) {
        if (this.err !== null) {
          this.manuallyLockSubmit = false
          this.$mdui.snackbar({
            message: this.err
          })
        } else if (n.status === '200') {
          this.$mdui.alert(this.end_word, () => {
            this.$mdui.snackbar({
              message: '提交成功！正在返回……',
              buttonText: '现在返回',
              onClick: () => {
                this.$router.go(-1)
              },
              onClose: () => {
                this.$router.go(-1)
              },
              timeout: 2000
            })
          }, {modal: true, confirmText: '我知道了'})
        } else {
          this.manuallyLockSubmit = false
          this.$mdui.snackbar({
            message: '提交数据时出现问题，请检查后重试！(存在问题：' + n.message + ')'
          })
        }
      }
    },
    selectedSelection: function (n,o){
        this.$mdui.JQ.ajax({
          method: 'POST',
          url: this.url+'/cache',
          data: JSON.stringify({selected: this.selectedSelection}),
        })
    }
  },
  methods: {
    submit_result: function () {
      if (this.confirmSelection()) {
        this.manuallyLockSubmit = true
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
      } else {
        this.create_warning()
      }
    },
    create_warning: function () {
      this.$mdui.confirm('部分问题可以选择多个选项，但是您可以选择放弃部分投票机会只给你希望选择的选项投票。点击OK确认你的决定', '您还有可用的选项！',
        () => {
          this.manuallyConfirmSelection = true
          this.$mdui.snackbar({
            message: '请点击提交按钮提交投票'
          })
        },
        () => {
          this.manuallyConfirmSelection = false
        }
      )
    },
    confirmSelection: function () {
      if (this.manuallyConfirmSelection) {
        return true
      }
      let status = true
      Object.keys(this.selectedQuestion).forEach((key) => {
        // do something with obj[key]
        if (this.selectedQuestion[key] !== 'fully-selected') {
          status = false
        }
      })
      return status
    }
  }
}
</script>
