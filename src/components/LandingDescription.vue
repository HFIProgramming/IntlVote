<template>
  <div class="mdui-col-md-6 mdui-col-offset-md-3 mdui-col-xs-12">
    <div class="mdui-card">

      <!-- 卡片的标题和副标题 -->
      <div class="mdui-card-media">
        <img v-bind:src="picture"/>
        <div class="mdui-card-media-covered">
          <div class="mdui-card-primary">
            <div class="mdui-card-primary-title">{{ title }}</div>
            <div class="mdui-card-primary-subtitle">{{ subtitle }}</div>
          </div>
        </div>
      </div>

      <!-- 卡片的内容 -->
      <div class="mdui-card-content" v-html="description"></div>

    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'subtitle', 'description', 'pic'],
  name: 'landing-description',
  computed: {
    has_pic: function () {
      return this.pic !== undefined
    },
    picture: function () {
      if (!this.has_pic) return 'https://static.hfi.me/images/vote/card.jpg'
      return this.pic
    }
  }
}
</script>
