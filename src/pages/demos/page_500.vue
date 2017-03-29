<template>
  <section class="page-middle page-404">
    <p class="number danger">500</p>
    <p class="h3">HTTP is wrong!</p>
  </section>
</template>

<script>
export default {
  name: 'page_error'
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
