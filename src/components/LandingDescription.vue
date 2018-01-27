<template>
  <div class="mdui-col-md-6 mdui-col-offset-md-3 mdui-col-xs-12">
    <div class="mdui-card">

      <!-- 卡片的标题和副标题 -->
      <div class="mdui-card-media">
        <img v-bind:src="pic"/>
        <div class="mdui-card-media-covered">
          <div class="mdui-card-primary">
            <div class="mdui-card-primary-title">{{ title }}</div>
            <div class="mdui-card-primary-subtitle">{{ subtitle }}</div>
          </div>
        </div>
      </div>

      <!-- 卡片的内容 -->
      <div class="mdui-card-content">{{ description }}</div>

    </div>
  </div>
</template>

<script>
export default {
  props: {'title': String, 'subtitle': String, 'description': String, 'pic': {
      type: String,
      default: 'https://static.hfi.me/images/vote/card.jpg'
    }
  },
  name: 'landing-description',
}
</script>
