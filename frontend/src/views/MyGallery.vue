<template>
  <main>
    <section>
    <h2>Галерея</h2>
    </section>
    <section>
      <img src="@/assets/images/photo_1.jpg" alt="photo_1">
      <img src="@/assets/images/photo_2.jpg" alt="photo_2">
      <img src="@/assets/images/photo_3.jpg" alt="photo_3">
      <img src="@/assets/images/photo_4.jpg" alt="photo_4">
      <img src="@/assets/images/photo_5.jpg" alt="photo_5">
      <img src="@/assets/images/photo_6.jpg" alt="photo_6">
      <img src="@/assets/images/photo_7.jpg" alt="photo_7">
    </section>
  </main>
</template>
  
<script>
  export default {
    methods: {
      goToAbout() {
        this.$router.push('/about'); // Программный переход на страницу
      }
    }
  }
</script>

<style scoped>
main {
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  align-items: center;
  h2 {
    width: 100%;
    text-align: center;
    overflow: hidden;  
  }
  h2:before, h2:after {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    height: 1px;
    background: #000;
    border: solid #f2e8fc;
    border-width: 0 1em;
  }
  h2:before {
    margin-left: -100%;
  }
  h2:after {
    margin-right: -100%;
  }
}
section {
  display: flex;
  flex-wrap: wrap;
}
img {
  max-width: 31%;
  object-fit: contain;
  margin: 1%;
}
</style>