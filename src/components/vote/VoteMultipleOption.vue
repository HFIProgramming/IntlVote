<template>
  <label class="mdui-checkbox">
    <input type="checkbox" v-bind="[{value:option.id}, {disabled:getLocked}]" @click="emitState(option.id, $event)"
           v-model="is_selected"/>
    <i class="mdui-checkbox-icon"></i>
    {{ option.content }}
  </label>
</template>

<script>

export default {
  props: ['question_id', 'option', 'locked', 'has_selected'],
  name: 'vote-multiple-option',
  mounted: function () {
    if (this.has_selected.indexOf(this.option.id) !== -1) {
      this.is_selected = true
      this.startEmit('add')
    }
  },
  computed: {
    getLocked: function () {
      if (this.is_selected === false && this.locked === true) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {is_selected: false}
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
