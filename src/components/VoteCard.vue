<template>
  <form @submit.prevent="submit">
    <template v-for="question in questions">
      <div class="mdui-card">

        <!-- 卡片的标题和副标题 -->
        <div class="mdui-card-primary">
          <div class="mdui-card-primary-title">{{ body }}</div>
          <div class="mdui-card-primary-subtitle">{{ support }}</div>
        </div>

        <!-- 卡片的内容 -->
        <div class="mdui-card-content">
          <label v-for="selection in question.options" class="mdui-radio">
            <input type="radio" v-bind:value="selection.id" v-model="selectedSelection"/>
            <i class="mdui-radio-icon">{{ selection.content }}</i>
          </label>
        </div>
      </div>
    </template>
    <div class="mdui-card">
      <div class="mdui-card-content">
        <button class="mdui-btn mdui-ripple" @click="submit_result()" v-bind:disabled="submit"><input type="submit"
                                                                                                      value="提交">
        </button>
      </div>
    </div>
  </form>
</template>

<script>
  import mdui from 'mdui'

  export default {
    props: ['questions', 'url'],
    computed: {
      post_data: function () {
        var json = null
        this.submit = true
        mdui.snackbar({
          message: '正在提交数据……'
        });
        mdui.JQ.ajax({
          method: 'POST',
          url: this.url,
          data: JSON.stringify({selected: this.selectedSelection}),
          success: function (data) {
            json = data
          },
        });
        return json
      },
      body: function () {
        return this.question.body
      },
      support: function () {
        return this.question.support
      },
      selection: function () {
        return this.question.selections
      }
    },
    data() {
      return {
        submit: false,
        selectedSelection: []
      }
    },
    methods: {
      submit_result: function () {
        var result = JSON.parse(this.post_data())
        if (result !== null && result.status === 'success') {
          mdui.snackbar({
            message: '提交成功！正在返回首页',
            buttonText: '现在返回',
            onClose: function () {
              this.$route.go(-1)
            }
          });
        } else {
          submit = false
          mdui.snackbar({
            message: '提交数据时出现问题，请重试！'
          });
        }
      }
    }
  }
</script>
