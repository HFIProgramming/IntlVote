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
  props: ['question_id', 'option', 'locked'],
  name: 'vote-multiple-option',
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
