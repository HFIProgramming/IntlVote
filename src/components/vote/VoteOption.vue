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
  props: ['question_id', 'option', 'has_selected'],
  name: 'vote-option',
  mounted: function () {
    if (this.has_selected.indexOf(this.option.id) !== -1) {
      this.is_selected = true
      this.startEmit('add')
    }
  },
  methods: {
    emitState: function (value, event) {
      let state = null
      if (event.target.checked) {
        state = 'add'
      } else {
        state = 'remove'
      }
      this.startEmit(state)
    },
    startEmit: function (state) {
      this.$bus.$emit('change-option', {state: state, question_id: this.question_id, option_id: this.option.id})
    }
  }
}
</script>
