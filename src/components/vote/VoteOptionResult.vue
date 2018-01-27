<template>
  <div class="mdui-col-4">
    <li v-bind:class="'mdui-list-item mdui-ripple ' + emphasize">
      <div class="mdui-list-item-content">
        <div class="mdui-list-item-title">{{ option.content }}</div>
        <div class="mdui-list-item-text">
          <div class="mdui-col">
            <div class="mdui-chip">
              <span v-bind="{class:'mdui-chip-icon '+ color}">{{ location }}</span>
              <span class="mdui-chip-title">当前排名: {{ location }}</span>
            </div>
            <div class="mdui-col-xs-12">
              {{ option.count }} 人投给这个选项，占总投票的 {{ option.percent }}%
            </div>
            <div v-if="option.is_chosen === '1'" class="mdui-chip">
              <span class="mdui-chip-icon mdui-color-yellow"><i class="mdui-icon material-icons">check</i></span>
              <span class="mdui-chip-title">我的选择</span>
            </div>
            <div class="mdui-progress mdui-col-xs-12">
              <div class="mdui-progress-determinate" v-bind:style="'width: '+option.percent+'%;'"></div>
            </div>
          </div>
        </div>
      </div>
    </li>
  </div>
</template>

<script>

export default {
  props: ['option'],
  name: 'vote-option-result',
  computed: {
    location: function () {
      return this.option.index
    },
    emphasize: function () {
      return this.location === 1 ? 'mdui-list-item-active' : ''
    },
    color: function () {
      switch (this.location) {
        case 1:
          return 'mdui-color-red'
        case 2:
          return 'mdui-color-teal'
        case 3:
          return 'mdui-color-indigo'
        default:
          return ''
      }
    }
  },
  methods: {}
}
</script>
