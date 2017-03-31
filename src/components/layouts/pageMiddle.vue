<template>
  <section class="mp-center">
    <div class="mp-center-container"
         :style="theStyle">
      <slot name="content"></slot>
    </div>
  </section>
</template>
<script>
export default {
  name: 'page-middle',
  props: {
    height: String,
    width: String
  },
  computed: {
    theStyle() {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
  mounted() {
    this.$el.parentElement.style.height = '100%'
  },
  beforeDestroy() {
    this.$el.parentElement.style.height = ''
  }
}
</script>
<style >
.mp-center {
  width: 100%;
  height: 100%;
  position: relative;
}

.mp-center-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
}
</style>
