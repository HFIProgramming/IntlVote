<template>

  <div class="mdui-card">

    <!-- 卡片的标题和副标题 -->
    <div class="mdui-card-primary">
      <div class="mdui-card-primary-title">{{ title }}</div>
      <div class="mdui-card-primary-subtitle">{{ subtitle }}</div>
    </div>

    <!-- 卡片的内容 -->
    <div class="mdui-card-content">{{ intro }}</div>

  </div>

</template>

<script>
export default {
  props: ['title', 'subtitle', 'intro'],
  name: 'landing-description'
}
</script>
