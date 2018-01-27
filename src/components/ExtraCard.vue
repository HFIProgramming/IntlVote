<template>
  <div class="mdui-card">
    <div class="mdui-card-media">
      <img v-bind:src="extra.picture"/>
      <div class="mdui-card-media-covered mdui-card-media-covered-gradient">
        <div class="mdui-card-primary">
          <div class="mdui-card-primary-title">
            {{ extra.title }}
          </div>
          <div class="mdui-card-primary-subtitle">{{ extra.subtitle }}</div>
        </div>
      </div>
    </div>
    <div class="mdui-card-content">{{ extra.content }}</div>
    <div class="mdui-card-actions">
      <button v-if="extra.left_link !== undefined" class="mdui-btn mdui-ripple"><a v-bind:href="extra.left_link">{{ extra.left_button }}</a></button>
      <button v-if="extra.right_link !== undefined" class="mdui-btn mdui-ripple"><a v-bind:href="extra.right_link">{{ extra.right_button }}</a></button>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['extra'],
    name: 'extra-card',
    computed: {
      picture: function () {
        if (this.extra.picture !== undefined) return this.pic
        return 'https://static.hfi.me/images/vote/card.jpg'
      },
    },
    methods: {
    }
  }
</script>
