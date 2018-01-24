<template>
  <div class="mdui-card mdui-m-t-5 mdui-col-xs-12">

    <!-- 卡片的标题和副标题 -->
    <div class="mdui-card-primary">
      <div class="mdui-card-primary-title">{{ question.content }}</div>
      <div class="mdui-card-primary-subtitle">这个问题您最多可以选择<mark>{{ question.range }}</mark>个选项</div>
    </div>

    <!-- 卡片的内容 -->
    <div class="mdui-card-content">
      <div class="mdui-typo-caption">{{ question.explanation }}</div>
      <div class="mdui-container">
        <div v-for="option in options" class="mdui-col-4">
          <vote-option v-if="type === 'radio'"
                       v-bind="{question_id: question_id, option: option}"></vote-option>
          <vote-multiple-option v-else-if="type === 'checkbox'"
                                v-bind="{question_id: question_id, option: option, locked: locked}"></vote-multiple-option>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import VoteOption from './VoteOption.vue'
import VoteMultipleOption from './VoteMultipleOption.vue'

export default {
  name: 'vote-question',
  props: ['question'],
  components: {
    VoteOption,
    VoteMultipleOption
  },
  mounted: function () {
    this.$bus.$on('change-option', (pack) => {
      if (pack.question_id === this.question.id) { // myself
        if (pack.state === 'add') {
          this.selected_id.push(pack.option_id)
        } else if (pack.state === 'remove') {
          this.selected_id = this.selected_id.filter(item => item !== pack.option_id)
        }
      }
    })
  },
  data () {
    return {
      selected_id: []
    }
  },
  computed: {
    type: function () {
      return this.question.range === '1' ? 'radio' : 'checkbox'
    },
    question_id: function () {
      return this.question.id
    },
    selectedNumber: function () {
      return this.selected_id.length
    },
    options: function () {
      return this.question.options
    },
    locked: function () {
      return this.question.range <= this.selectedNumber
    }
  }
}
</script>
