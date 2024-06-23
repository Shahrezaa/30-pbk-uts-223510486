<template>
  <div class="slot-container">
    <slot
      ><p>Selamat Datang</p>
      <br />Pilih menu-menu pada navbar untuk melihat fitur yang tersedia.</slot
    >
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.slot-container {
  font-family: Arial, sans-serif;
  margin: 3em auto;
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(249, 249, 249, 0.404);
  backdrop-filter: blur(4px);
  border: 2px solid rgba(255, 0, 0, 0.5);
  text-align: center;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
}
</style>
