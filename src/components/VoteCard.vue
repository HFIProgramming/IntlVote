<template>
  <form @submit.prevent="submit">
    <div v-for="question in questions" class="mdui-card mdui-m-t-5 mdui-col-xs-12 mdui-col-md-6">

      <!-- 卡片的标题和副标题 -->
      <div class="mdui-card-primary">
        <div class="mdui-card-primary-title">{{ question.content }}</div>
        <div class="mdui-card-primary-subtitle">{{ question.explanation }}</div>
      </div>

      <!-- 卡片的内容 -->
      <div class="mdui-card-content">
        <div class="mdui-container">
          <div v-for="selection in question.options" class="mdui-col-4">
            <label class="mdui-radio">
              <input type="radio" v-bind:value="selection.id" v-model="selectedSelection"/>
              <i class="mdui-radio-icon"></i>
              {{ selection.content }}
            </label>
          </div>
        </div>
      </div>
    </div>
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
  import mdui from 'mdui'

  export default {
    props: ['questions', 'url'],
    computed: {},
    data () {
      return {
        submit: true,
        selectedSelection: [],
        json: null
      }
    },
    watch: {
      json: function (n, o) {
        if (n !== null) {
          if (n.status === 200) {
            mdui.snackbar({
              message: '提交成功！正在返回……',
              buttonText: '现在返回',
              onClose: function () {
                this.$route.go(-1)
              },
              timeout: 2000,
            })
          } else {
            this.submit = false
            mdui.snackbar({
              message: '提交数据时出现问题，请重试！(存在问题：' + n.message + ')'
            })
          }
        }
      }
    },
    methods: {
      submit_result: function () {
        var result = null
        this.submit = true
        mdui.snackbar({
          message: '正在提交数据……',
          timeout: 1000,
        })
        mdui.JQ.ajax({
          method: 'POST',
          url: this.url,
          data: JSON.stringify({selected: this.selectedSelection}),
          success: (data) => {
            this.json = JSON.parse(data)
          },
        })
      }
    }
  }
</script>

