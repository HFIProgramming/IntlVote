<template>
  <label class="mdui-radio">
    <input type="radio" v-bind="[{name:'question'+question_id},{value:option.id}]"
           @click="emitState(option.id, $event)"/>
    <i class="mdui-radio-icon"></i>
    {{ option.content }}
  </label>
</template>

<script>

export default {
  props: ['question_id', 'option'],
  name: 'vote-option',
  methods: {
    emitState: function (value, event) {
      var state = null
      if (event.target.checked) {
        state = 'add'
      } else {
        state = 'remove'
      }
      this.$bus.$emit('change-option', {state: state, question_id: this.question_id, option_id: this.option.id})
    }
  }
}
</script>
