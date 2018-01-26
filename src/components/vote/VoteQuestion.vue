<template>
  <div class="mdui-card mdui-m-t-5 mdui-col-xs-12">

    <!-- 卡片的标题和副标题 -->
    <div class="mdui-card-primary">
      <div class="mdui-card-primary-title">{{ question.content }}</div>
      <div class="mdui-card-primary-subtitle">这个问题您
        <mark>最多可以选择{{ question.range }}个选项</mark>
      </div>
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
          this.selected_id.splice(this.selected_id.indexOf(pack.option_id), 1)
        }
      }
    })
  },
  data () {
    return {
      selected_id: []
    }
  },
  watch: {
    selectionStatus: function (n, o) {
      let s
      if (n === 'not-selected') {
        s = -1
      } else if (o === 'fully-selected' || o === 'partly-selected') {
        s = 0
      } else {
        s = 1
      }
      if (n === o) {
        s = 0
      }
      this.$bus.$emit('question-status', {state: n, question_id: this.question_id, status: s})
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
    },
    selectionStatus: function () {
      if (this.selected_id.length === parseInt(this.question.range)) {
        return 'fully-selected'
      } else if (this.selected_id.length === 0) {
        return 'not-selected'
      } else {
        return 'partly-selected'
      }
    }
  }
}
</script>
