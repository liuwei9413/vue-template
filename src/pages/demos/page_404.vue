<template>
  <section class="page-middle page-404">
    <p class="number danger">404</p>
    <p class="h3">Sorry！Page not found！</p>
  </section>
</template>

<script>
export default {
  name: 'page_not_found'
}
</script>

<style lang="css" scoped>
.page-middle {
  width: 400px;
  position: relative;
  display: inline-block;
  top: 10%;
  left: 50%;
  margin: 10% 0 0 -200px;
  text-align: center;
}

p.number {
  font-size: 130px;
}

p.number.danger {
  color: #E94D58;
}

p.h3 {
  font-size: 20px;
}
</style>
