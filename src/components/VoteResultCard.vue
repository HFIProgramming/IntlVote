<template>
  <div class="mdui-card mdui-m-t-5 mdui-m-b-5 mdui-col-xs-12">

    <!-- 卡片的标题和副标题 -->
    <div class="mdui-card-primary">
      <div class="mdui-card-primary-title">{{ question.content }}</div>
      <div class="mdui-card-primary-subtitle">这个问题您最多可以选择
        <mark>{{ question.range }}</mark>
        个选项
      </div>
    </div>

    <!-- 卡片的内容 -->
    <div class="mdui-card-content">
      <div class="mdui-typo-caption">{{ question.explanation }}</div>
      <div class="mdui-container">
        <ul class="mdui-list">
          <div v-for="option in question.options" class="mdui-col-4">
            <vote-option-result v-bind="{option: option}"></vote-option-result>
          </div>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
import VoteOptionResult from './vote/VoteOptionResult.vue'

export default {
  name: 'vote-result-card',
  props: ['question'],
  components: {
    VoteOptionResult
  },
  created: function () {
    this.question.options.sort(function (a, b) {
      return b.count - a.count
    }).forEach((item, index) => {
      item.index = index + 1
    })
  },
  computed: {}
}
</script>
