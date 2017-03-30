<template>
  <div class="mp-section-title">
    <p class="mp-s-title">{{title || 'Title'}}<span class="mp-s-subtitle">{{subTitle || 'Subtitle'}}</span></p>
  </div>
</template>
<script>
export default {
  name: 'mp-s-title',
  props: {
    title: String,
    subTitle: String
  }
}
</script>
<style>
.mp-section-title {
  padding: 15px 0;
  overflow: hidden;
}

.mp-section-title .mp-s-title {
  color: #282C39;
  font-size: 20px;
}

.mp-section-title .mp-s-subtitle {
  color: #A0A4B5;
  font-size: 14px;
  margin-left: 14px;
}
</style>
