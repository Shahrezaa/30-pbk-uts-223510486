<template>
  <div class="slot-container">
    <slot>Pilih menu untuk melihat fitur.</slot>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.slot-container {
  padding: 20px;
  border-radius: 10px;
  background-color: rgba(255, 0, 0, 0.1);
  border: 2px solid rgba(255, 0, 0, 0.5);
  text-align: center;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.7);
}
</style>
